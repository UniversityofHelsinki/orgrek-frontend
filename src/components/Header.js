import React from 'react';
import { connect } from 'react-redux';
import "../index.css"

const Header = (props) => {
    return (
        <div>
            <hy-site-header
                is-group="true"
                site-label="University of Helsinki"
                site-url="https://www.helsinki.fi/en/"
                logo-label="Organisaatiorekisteri"
                logo-url="/"
                no-search="true"
                data-site-header-labels='{
          "menu_labels": {"open":"Open mobile menu","close":"Close mobile menu panel","expand":"Expand submenu"},
          "group_pages":{"university_main_menu":"University main menu"},
          "language_labels":{"open":"Open language list","close":"Close language list"}}'
                data-menu-language='[
          {"langCode":"fi","abbr":"fin","label":"Finnish","url":"/fi", "isActive":"true"},
          {"langCode":"en","abbr":"eng","label":"English","url":"/en"},
          {"langCode":"sv","abbr":"swe","label":"Swedish","url":"/sv"}
        ]'
                data-menu-donate='[]'
                data-main-menu-links='
      [
      {"menuLinkId":"9a1297e0af8490e7d111de27a809a650","isActive":"false","isExternal":false,"label":"About us","url":"https://www.helsinki.fi/en/about-us", "description":"","closeButtonTitle":"Close"}
      ]
      '
                data-desktop-links='
      [{"menuLinkId":"06ec39de0916925f3bcfa55000ae2382","isActive":"false","isExternal":false,"label":"Hierarkia","labelExtra":"Hierarkia","url":"/hierarkia","description":"","toggleOff":"true","shortcutsTitle":"Oikopolut","closeButtonTitle":"Sulje","shortcuts":[],"items":[]},
      {"menuLinkId":"51a0e8e460e0fd848ce39b3edec568ef","isActive":"false","isExternal":false,"label":"Haku","labelExtra":"Haku","url":"/haku","description":"","toggleOff":"true","shortcutsTitle":"Oikopolut","closeButtonTitle":"Sulje","shortcuts":[],"items":[]}]
      '
            >
                <hy-menu slot="menu" menu-button-breadcrumb-home="Etusivu">
                    <hy-menu-level-container menu-level="1" depth="1">
                        <hy-menu-item menu-link-id="1" url="/hierarkia" label="Hierarkia" menu-button-breadcrumb-main="Etusivu">
                        </hy-menu-item>
                        <hy-menu-item menu-link-id="2" url="/haku" label="Haku" menu-button-breadcrumb-main="Etusivu">
                        </hy-menu-item>
                    </hy-menu-level-container>
                </hy-menu>
            </hy-site-header>
        </div>
    );
};

const mapStateToProps = state => ({

});


export default connect(mapStateToProps, null)(Header);
