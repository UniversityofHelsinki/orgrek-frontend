import React from 'react';
import { connect } from 'react-redux';

const Tree = (props) => {
    return (
        <div>
            <pre>{JSON.stringify(props.tree, null, 2) }</pre>
        </div>
    );
};

const mapStateToProps = state => ({
    tree : state.tr.tree
});


export default connect(mapStateToProps, null)(Tree);
