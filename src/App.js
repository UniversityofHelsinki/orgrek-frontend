import React from "react";
import {connect} from 'react-redux';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tree from "./components/Tree";
import {fetchTree} from "./actions/treeAction";
import "./App.css"

const App= (props) => {

    React.useEffect(() => {
        props.onFetchTree();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="App">
            <Header/>
            <Tree/>
            <Footer/>
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
