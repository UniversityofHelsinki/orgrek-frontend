import React from 'react';
import { connect } from 'react-redux';

const Tree = (props) => {
    return (
        <div>
            <pre>{JSON.stringify(props.tr.tree, null, 2) }</pre>
        </div>
    );
};

const mapStateToProps = state => ({
    tr : state.tr.tree
});


export default connect(mapStateToProps, null)(Tree);
