import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { fetchUser } from './actions/userAction';
import { fetchSelectableHierarchies } from './actions/treeAction';
import { BrowserRouter } from 'react-router-dom';
import theme from './theme';
import { ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fi, sv, enIE } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import Routes from './pages/Routes';

const getDateFnsLocale = (language) => {
  switch (language) {
    case 'fi':
      return fi;
    case 'sv':
      return sv;
    default:
      return enIE;
  }
};

const App = (props) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    props.onFetchUser();
  }, []);

  useEffect(() => {
    if (window.location.pathname === '/') {
      const parameters = new URLSearchParams(window.location.search);
      const hierarchies = parameters.get('hierarchies');
      if (hierarchies && props.selectableHierarchies?.length > 0) {
        const valid = hierarchies
          .split(',')
          .every((hierarchy) =>
            props.selectableHierarchies.includes(hierarchy)
          );
        if (valid) {
          props.setHierarchies(hierarchies);
        } else {
          props.setHierarchies(props.defaultHierarchy);
        }
      } else if (props.selectableHierarchies?.length > 0) {
        props.setHierarchies(props.defaultHierarchy);
      }
    }
  }, [props.selectableHierarchies]);

  useEffect(() => {
    if (props.node && props.selectedHierarchy) {
      window.history.pushState(
        {},
        '',
        `?hierarchies=${props.selectedHierarchy}&uid=${props.node.uniqueId}`
      );
    } else if (props.selectedHierarchy) {
      window.history.pushState(
        {},
        '',
        `?hierarchies=${props.selectedHierarchy}`
      );
    }
  }, [props.node, props.selectedHierarchy]);

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={getDateFnsLocale(i18n.language)}
      >
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => ({
  selectableHierarchies: state.tree.selectableHierarchies,
  selectedHierarchy: state.tree.selectedHierarchy,
  defaultHierarchy: state.tree.defaultHierarchy,
  node: state.nrd.node,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchUser: () => dispatch(fetchUser()),
  fetchSelectableHierarchies: () => dispatch(fetchSelectableHierarchies()),
  setHierarchies: (hierarchies) =>
    dispatch({
      type: 'SWITCH_HIERARCHY',
      payload: hierarchies,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
