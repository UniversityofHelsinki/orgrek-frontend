import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import Header from './components/Header';
import Header2 from './components/Header2';
import Hierarchy from './components/Hierarchy';
import './App.css';
import { fetchUser, isAdmin } from './actions/userAction';
import { fetchSelectableHierarchies } from './actions/treeAction';
import { fetchNode } from './actions/nodeAction';
import LoginRedirect from './components/LoginRedirect';
import Footer from './components/Footer';
import { Container, Col, Row } from 'react-bootstrap';
import SkipNavLink from './components/SkipNavLink';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Texts from './components/Texts';
import HierarchyFilters from './components/HierarchyFilters';
import theme from './theme';
import { ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fi, sv, enIE } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import NodeDetails2 from './components/nodeDetails/NodeDetails2';
import NodeDetails from './components/NodeDetails';

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

  // Temporary solution until the old NodeDetails component is removed
  const editMode = useSelector((state) => state.editModeReducer.edit);

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
      const uid = parameters.get('uid');
      if (uid) {
        props.fetchNode(uid);
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

  const SHIBBOLETH_LOGIN = process.env.REACT_APP_ORGREK_LOGIN;

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={getDateFnsLocale(i18n.language)}
      >
        <div className="App">
          <LoginRedirect loginUrl={SHIBBOLETH_LOGIN} />
          <Header2 />
          <SkipNavLink id="main-content" />
          <Container fluid>
            <Row>
              <BrowserRouter>
                <Header />
                <Routes>
                  <Route
                    path="/"
                    element={
                      <>
                        <Col md={4} lg={4}>
                          <Hierarchy />
                        </Col>
                        <Col>
                          {!editMode && props.node && <NodeDetails2 />}
                          {editMode && props.node && <NodeDetails />}
                        </Col>
                      </>
                    }
                  />
                  {isAdmin(props.user) ? (
                    <Route path="/texts" element={<Texts />} />
                  ) : null}
                  {isAdmin(props.user) ? (
                    <Route
                      path="/hierarchyfilters"
                      element={<HierarchyFilters />}
                    />
                  ) : null}
                </Routes>
              </BrowserRouter>
            </Row>
          </Container>
          <Footer />
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => ({
  selectableHierarchies: state.tree.selectableHierarchies,
  selectedHierarchy: state.tree.selectedHierarchy,
  defaultHierarchy: state.tree.defaultHierarchy,
  node: state.nrd.node,
  user: state.ur.user,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchUser: () => dispatch(fetchUser()),
  fetchSelectableHierarchies: () => dispatch(fetchSelectableHierarchies()),
  fetchNode: (uniqueId) => dispatch(fetchNode(uniqueId)),
  setHierarchies: (hierarchies) =>
    dispatch({
      type: 'SWITCH_HIERARCHY',
      payload: hierarchies,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
