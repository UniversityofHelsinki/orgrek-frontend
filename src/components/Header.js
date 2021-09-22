import React from 'react';
import { connect } from 'react-redux';

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
          "menu_labels": {"open":"Avaa mobiilimenu","close":"Sulje mobiilimenu","expand":"Avaa alavalikko","return":"Palaa edelliselle tasolle","home":"Etusivu","main":"P\u00e4\u00e4valikko","front_page":"Etusivu"},
          "group_pages":{"university_main_menu":"Yliopiston p\u00e4\u00e4valikko","university_home_page":"","university_front_page":"Etusivu"},
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
      [{"menuLinkId":"06ec39de0916925f3bcfa55000ae2382","isActive":"false","isExternal":false,"label":"Rakenne","labelExtra":"Rakenne","url":"/","description":"","toggleOff":"true","shortcutsTitle":"Oikopolut","closeButtonTitle":"Sulje","shortcuts":[],"items":[]}]
      '
            >
                <hy-menu slot="menu">
                    <hy-menu-level-container menu-level="1" depth="1">
                        <hy-menu-item menu-link-id="1" url="/" label="Rakenne">
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
