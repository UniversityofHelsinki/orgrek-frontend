import React from 'react';
import { connect } from 'react-redux';

const Header = (props) => {
    return (
        <div>
            <hy-site-logo color="black" size="64" url="https://www.helsinki.fi" label="Helsingin yliopisto" />
            <hy-heading heading="h2">Organisaatiorekisteri</hy-heading>
            <div style={{position: "relative", width: 300, height: 30}}>
                <hy-menu-language is-mobile={false} labels='{"open":"Open", "close":"Close"}' data-menu-language='[
                    {"langCode":"fi","abbr":"fin","label":"Finnish","url":"/fi", "isActive":"true"},
                    {"langCode":"en","abbr":"eng","label":"English","url":"/en"},
                    {"langCode":"sv","abbr":"swe","label":"Swedish","url":"/sv"}]'
                />
            </div>
        </div>
    );
};

const mapStateToProps = state => ({

});


export default connect(mapStateToProps, null)(Header);
