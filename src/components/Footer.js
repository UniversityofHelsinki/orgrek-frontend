import React from 'react';

const Footer = ( ) => {
    return (
        <div>
            <hr />
            <footer>
                <p className="hy-footer">
                    <span>© Helsingin yliopisto 2021</span>
                    <br />
                    <span id="version" style={{ color: 'grey', fontSize: 'small', fontStyle: 'italic' }}>Commit Hash: {process.env.REACT_APP_GIT_HASH}</span>
                </p>
            </footer>
        </div>
    );
};

export default Footer;
