import React,  { useEffect } from 'react';
import { connect } from 'react-redux';
import Header from './components/Header';
import Hierarchy from './components/Hierarchy';
import NodeDetails from './components/NodeDetails';
import './App.css';
import { fetchUser } from './actions/userAction';
import LoginRedirect from './components/LoginRedirect';
import Footer from './components/Footer';

const App= (props) => {

    console.log(process.env);

    useEffect(() => {
        props.onFetchUser();
    }, []);

    const SHIBBOLETH_LOGIN = process.env.REACT_APP_ORGREK_LOGIN;

    return (
        <div className="App">
                <div>
                    <LoginRedirect loginUrl={SHIBBOLETH_LOGIN} />
                    <Header />
                    <Hierarchy />
                    <NodeDetails />
                    <Footer />
                </div>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    onFetchUser: () => dispatch(fetchUser())
});

export default connect(null, mapDispatchToProps)(App);
