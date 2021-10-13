import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hierarchy from "./components/Hierarchy";

const App= () => {

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <Header/>
                    <Hierarchy />
                    <Footer/>
                </div>
            </header>
        </div>
    );
}

export default App;
