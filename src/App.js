import React from "react";
import {connect} from 'react-redux';
import Header from "./components/Header";
import {fetchTree} from "./actions/treeAction";

const App= (props) => {

    React.useEffect(() => {
        props.onFetchTree();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <div className="site-header-demo-container">
                    <hy-site-header
                        logo-label="University of Helsinki"
                        logo-url="/"

                        data-site-header-labels='{
          "menu_labels": {"open":"Open mobile menu","close":"Close mobile menu panel","expand":"Expand submenu"},
          "search_labels":{},
          "language_labels":{"open":"Open language list","close":"Close language list"}}'

                        data-menu-language='[
          {"langCode":"fi","abbr":"fin","label":"Finnish","url":"/fi"},
          {"langCode":"en","abbr":"eng","label":"English","url":"/en","isActive":"true"},
          {"langCode":"sv","abbr":"swe","label":"Swedish","url":"/sv","isDisabled":"true"}
        ]'
                        data-menu-donate='[]'
                        data-desktop-links='[
        {"menuLinkId":"9a1297e0af8490e7d111de27a809a650",
         "isActive":"false",
         "label":"Organisaatiorekisteri",
         "labelExtra":"About us",
         "url":"https://helsinki.fi",
         "description":"",
         "shortcutsTitle":"Shortcuts",
         "closeButtonTitle":"Close",
         "shortcuts":[
          ],
         "items":[
         ]}


      ]'
                    >
                        <hy-menu slot="menu">
                            <hy-menu-level-container menu-level="1">
                            </hy-menu-level-container>
                        </hy-menu>
                    </hy-site-header>
                </div>
            </header>
        </div>
    );
}

const mapStateToProps = state => ({
    tree : state.tr.tree
});

const mapDispatchToProps = dispatch => ({
    onFetchTree: () => dispatch(fetchTree())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
