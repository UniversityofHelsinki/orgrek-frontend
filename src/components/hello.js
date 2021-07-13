import React from 'react';
import { connect } from 'react-redux';

const Hello = (props) => {
    return (
        <div>
            <h1>{props.hr.message}</h1>
        </div>
    );
};

const mapStateToProps = state => ({
    hr : state.hr.message
});


export default connect(mapStateToProps, null)(Hello);
