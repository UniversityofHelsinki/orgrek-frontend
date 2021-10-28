import React from 'react';
import { connect } from 'react-redux';

const NodeParents = (props) => {
    console.log(props.parents);
    return (
        <div>
        </div>
    );
};

const mapStateToProps = state => ({
    parents : state.hr.parents
});

export default connect(mapStateToProps, null)(NodeParents);
