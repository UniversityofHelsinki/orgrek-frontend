import React from 'react';
import { connect } from 'react-redux';
import Branch from './Branch';
import { fetchTree } from '../actions/treeAction';
import { useTranslation } from 'react-i18next';

const Tree = (props) => {
    const { t, i18n } = useTranslation();

    React.useEffect(() => {
        if (props.selectedHierarchy !== '') {
            props.onFetchTree(props.selectedHierarchy, props.selectedDay);
        }
        // eslint-disable-next-line
    }, [props.selectedHierarchy, props.selectedDay, i18n.language]);

    return (
        <div data-testid='tree'>
            {props.tree && Object.values(props.tree).map((item) => {
                return <Branch key={item.id} item={item} level={0} parent='' />;})}
        </div>
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
