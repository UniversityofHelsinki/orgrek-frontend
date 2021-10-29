import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hierarchy from './components/Hierarchy';
import './App.css';
import NodeParents from './components/NodeParents';
import NodeChildren from './components/NodeChildren';

const App= () => {

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <Header/>
                    <Hierarchy />
                    <NodeParents />
                    <NodeChildren />
                    <Footer/>
                </div>
            </header>
        </div>
    );
};

export default App;
