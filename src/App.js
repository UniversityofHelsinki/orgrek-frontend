import React,  { useEffect } from 'react';
import { connect } from 'react-redux';
import Header from './components/Header';
import Hierarchy from './components/Hierarchy';
import NodeDetails from './components/NodeDetails';
import './App.css';
import NodeParents from './components/NodeParents';
import NodeChildren from './components/NodeChildren';
import { fetchUser } from './actions/userAction';
import LoginRedirect from './components/LoginRedirect';

const App= (props) => {

    useEffect(() => {
        props.onFetchUser();
    }, []);

    const SHIBBOLETH_LOGIN = process.env.REACT_APP_ORGREK_LOGIN;

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <LoginRedirect loginUrl={SHIBBOLETH_LOGIN} />
                    <Header/>
                    <Hierarchy />
                    <NodeDetails />
                </div>
            </header>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    onFetchUser: () => dispatch(fetchUser())
});

export default connect(null, mapDispatchToProps)(App);
