import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hierarchy from './components/Hierarchy';
import NodeParents from './components/NodeParents';

const App= () => {

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <Header/>
                    <Hierarchy />
                    <NodeParents />
                    <Footer/>
                </div>
            </header>
        </div>
    );
};

export default App;
