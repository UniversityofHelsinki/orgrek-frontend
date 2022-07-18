import React,  { useEffect } from 'react';
import { connect } from 'react-redux';
import Header from './components/Header';
import Hierarchy from './components/Hierarchy';
import NodeDetails from './components/NodeDetails';
import './App.css';
import { fetchUser } from './actions/userAction';
import LoginRedirect from './components/LoginRedirect';
import Footer from './components/Footer';
import { Container, Col, Row } from 'react-bootstrap';
import SkipNavLink from './components/SkipNavLink';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Texts from './components/Texts';

const App= (props) => {

    useEffect(() => {
        props.onFetchUser();
    }, []);

    const SHIBBOLETH_LOGIN = process.env.REACT_APP_ORGREK_LOGIN;

    return (
        <div className="App">
                    <LoginRedirect loginUrl={SHIBBOLETH_LOGIN} />
                    <SkipNavLink id="main-content" />
                    <Container fluid>
                        <Row>
                        <BrowserRouter>
                            <Header />
                            <Routes>
                                <Route path="/" element={<>
                                        <Col md={4} lg={4}><Hierarchy /></Col>
                                        <Col ><NodeDetails /></Col>
                                </> } />
                                <Route path="/texts" element={<Texts />} />
                            </Routes>
                        </BrowserRouter>
                        </Row>
                    </Container>
                    <Footer />
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    onFetchUser: () => dispatch(fetchUser())
});

export default connect(null, mapDispatchToProps)(App);
