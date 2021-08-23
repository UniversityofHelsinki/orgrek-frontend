import React from 'react';
import { connect } from 'react-redux';

const Header = (props) => {
    return (
        <div>
            <hy-site-header
                logo-label="University of Helsinki"
                logo-url="/"
                search-button-label="Search"
                data-site-header-labels='{
          "menu_labels": {"open":"Open mobile menu","close":"Close mobile menu panel","expand":"Expand submenu"},
          "search_labels":{"label":"Search","open":"Open search","close":"Close search"},
          "language_labels":{"open":"Open language list","close":"Close language list"}}'
                data-menu-language='[
                {"langCode":"fi","abbr":"fin","label":"Finnish","url":"/fi"},
                {"langCode":"en","abbr":"eng","label":"English","url":"/en","isActive":"true"},
                {"langCode":"sv","abbr":"swe","label":"Swedish","url":"/sv","isDisabled":"true"}
                ]'>
            </hy-site-header>

        </div>
    );
};

const mapStateToProps = state => ({

});


export default connect(mapStateToProps, null)(Header);
