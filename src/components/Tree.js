import React from 'react';
import { connect } from 'react-redux';
import Branch from './Branch';
import { fetchTree } from '../actions/treeAction';

const Tree = (props) => {

    React.useEffect(() => {
        props.onFetchTree(props.selectedHierarchy);
        // eslint-disable-next-line
    }, [props.selectedHierarchy]);

    return (
        <div>
            {Object.values(props.tree).map((item) => {
                console.log(item);
                return <Branch key={item.id} item={item} level={0} />;})}
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
