import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hierarchy from './components/Hierarchy';
import NodeDetails from './components/NodeDetails';
import './App.css';

const App= () => {

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <Header/>
                    <Hierarchy />
                    <NodeDetails />
                    <Footer/>
                </div>
            </header>
        </div>
    );
};

export default App;
