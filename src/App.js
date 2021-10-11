import React from 'react';
import { connect } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import Tree from './components/Tree';
import { fetchTree } from './actions/treeAction';

const App= (props) => {

    React.useEffect(() => {
        props.onFetchTree();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <Header/>
                    <Tree/>
                    <Footer/>
                </div>
            </header>
        </div>
    );
};

const mapStateToProps = state => ({
    tree : state.tr.tree
});

const mapDispatchToProps = dispatch => ({
    onFetchTree: () => dispatch(fetchTree())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
