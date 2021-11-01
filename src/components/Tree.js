import React from 'react';
import { connect } from 'react-redux';
import Branch from './Branch';
import { fetchTree } from '../actions/treeAction';

const Tree = (props) => {

    React.useEffect(() => {
        if (props.selectedHierarchy !== '') {
            props.onFetchTree(props.selectedHierarchy);
        }
        // eslint-disable-next-line
    }, [props.selectedHierarchy]);

    return (
        <div data-testid='tree'>
            {Object.values(props.tree).map((item) => {
                return <Branch key={item.id} item={item} level={0} parent='' />;})}
        </div>
    );
};

const mapStateToProps = state => ({
    tree : state.tree.tree,
    selectedHierarchy: state.tree.selectedHierarchy
});

const mapDispatchToProps = dispatch => ({
    onFetchTree: (selection) => dispatch(fetchTree(selection))
});

export default connect(mapStateToProps, mapDispatchToProps)(Tree);
