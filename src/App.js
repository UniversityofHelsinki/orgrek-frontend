import React from "react";
import {connect} from 'react-redux';
import Tree from "./components/tree";
import {fetchTree} from "./actions/treeAction";
import "@itcenteratunihelsinki/huds-lib/dist/fonts/fonts.css";
import "@itcenteratunihelsinki/huds-lib/dist/huds-lib/huds-lib.css";

const App= (props) => {

    React.useEffect(() => {
        props.onFetchTree();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <Tree/>
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
