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
                search-button-label="Search"
                data-site-header-labels='{
          "menu_labels": {"open":"Open mobile menu","close":"Close mobile menu panel","expand":"Expand submenu"},
          "search_labels":{"label":"Search","open":"Open search","close":"Close search"},
          "group_pages":{"university_main_menu":"University main menu"},
          "language_labels":{"open":"Open language list","close":"Close language list"}}'
                data-site-search-labels='{
        "search_description": "web pages, study options, people, research groups, etc…",
        "search_placeholder":"What do you want to find…",
        "search_label":"Search",
        "search_close_label":"Exit search",
        "search_tools_label":"Special Search tools"
      }'
                data-search-tools='[
        {"menuLinkId":"4a4242dd7b9a201ad57b943ac904ec39",
        "isExternal":false,
        "label":"People finder",
        "url":"/en/about-us/people",
        "description":""},
        {"menuLinkId":"334decac91a4531f495e88893b190519",
        "isExternal":"external",
        "label":"Degree finder",
        "url":"https://svenska.yle.fi",
        "description":""},
        {"menuLinkId":"60296b1a224d1f5c2a5e29fef4b716c3",
        "isExternal":false,
        "label":"Research groups",
        "url":"/en/tiedekunta/laaketieteellinen-tiedekunta/tutkimus/services-researchers",
        "description":""}
      ]'
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
