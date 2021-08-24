import React from 'react';
import { connect } from 'react-redux';

const Header = (props) => {
    return (
        <div>
           Helsingin yliopisto
        </div>
    );
};

const mapStateToProps = state => ({

});


export default connect(mapStateToProps, null)(Header);
