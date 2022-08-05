import React from 'react';
import { connect } from 'react-redux';
import Branch from './Branch';
import { fetchTree } from '../actions/treeAction';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const ContainerDiv = styled.div`
  border: 1px solid lightgrey;
  border-radius: 5px;
  margin-top: 10px;
  background-color: #F6F6F6;
`;


const Tree = (props) => {
    const { t, i18n } = useTranslation();

    React.useEffect(() => {
        if (props.selectedHierarchy !== '') {
            props.onFetchTree(props.selectedHierarchy, props.selectedDay);
        }
        // eslint-disable-next-line
    }, [props.selectedHierarchy, props.selectedDay, i18n.language]);


    const language = i18n.language === 'ia' ? 'fi' : i18n.language;
    return (
        <ContainerDiv data-testid='tree'>
            {props.tree?.[language] && <Branch item={props.tree[language]} level={0} parent='' />}
        </ContainerDiv>
    );
};

const mapStateToProps = state => ({
    tree : state.tree.tree,
    selectedHierarchy: state.tree.selectedHierarchy,
    selectedDay : state.dr.selectedDay
});

const mapDispatchToProps = dispatch => ({
    onFetchTree: (selection, selectedDay) => dispatch(fetchTree(selection, selectedDay))
});

export default connect(mapStateToProps, mapDispatchToProps)(Tree);
