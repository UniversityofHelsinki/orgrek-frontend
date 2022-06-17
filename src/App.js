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

const App= (props) => {

    useEffect(() => {
        props.onFetchUser();
    }, []);

    const SHIBBOLETH_LOGIN = process.env.REACT_APP_ORGREK_LOGIN;

    return (
        <div className="App">
                    <LoginRedirect loginUrl={SHIBBOLETH_LOGIN} />
                    <SkipNavLink id="main-content" />
                    <Header />
                    <Container fluid>
                        <Row>
                            <Col md={4} lg={4}><Hierarchy /></Col>
                            <Col ><NodeDetails /></Col>
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
