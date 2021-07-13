import React from 'react';
import { connect } from 'react-redux';

const Hello = (props) => {
    return (
        <div>
            <p>{props.hr.message}</p>

        </div>
    );
};

const mapStateToProps = state => ({
    hr : state.hr.message
});


export default connect(mapStateToProps, null)(Hello);
