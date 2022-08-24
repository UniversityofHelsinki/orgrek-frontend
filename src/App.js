import React,  { useEffect } from 'react';
import { connect } from 'react-redux';
import Header from './components/Header';
import Hierarchy from './components/Hierarchy';
import NodeDetails from './components/NodeDetails';
import './App.css';
import { fetchUser } from './actions/userAction';
import { fetchSelectableHierarchies } from './actions/treeAction';
import { fetchNode } from './actions/nodeAction';
import LoginRedirect from './components/LoginRedirect';
import Footer from './components/Footer';
import { Container, Col, Row } from 'react-bootstrap';
import SkipNavLink from './components/SkipNavLink';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Texts from './components/Texts';
import HierarchyFilters from './components/HierarchyFilters';

const App= (props) => {

    useEffect(() => {
        props.onFetchUser();
    }, []);

    useEffect(() => {
        if (window.location.pathname === '/') {
            const parameters = new URLSearchParams(window.location.search);
            const hierarchies = parameters.get('hierarchies');
            if (hierarchies && props.selectableHierarchies?.length > 0) {
                const valid = hierarchies.split(',').every(hierarchy => props.selectableHierarchies.includes(hierarchy));
                if (valid) {
                    props.setHierarchies(hierarchies);
                } else {
                    props.setHierarchies(props.defaultHierarchy);
                }
            } else if (props.selectableHierarchies?.length > 0) {
                props.setHierarchies(props.defaultHierarchy);
            }
            const uid = parameters.get('uid');
            if (uid) {
                props.fetchNode(uid);
            }
        }
    }, [props.selectableHierarchies]);

    useEffect(() => {
        if (props.node && props.selectedHierarchy) {
            window.history.pushState({}, '', `?hierarchies=${props.selectedHierarchy}&uid=${props.node.uniqueId}`);
        } else if (props.selectedHierarchy) {
            window.history.pushState({}, '', `?hierarchies=${props.selectedHierarchy}`);
        }
    }, [props.node, props.selectedHierarchy]);

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
                                        <Col >{props.node && <NodeDetails />}</Col>
                                </> } />
                                <Route path="/texts" element={<Texts />} />
                                <Route path="/hierarchyfilters" element={<HierarchyFilters />} />
                            </Routes>
                        </BrowserRouter>
                        </Row>
                    </Container>
                    <Footer />
        </div>
    );
};

const mapStateToProps = state => ({
    selectableHierarchies: state.tree.selectableHierarchies,
    selectedHierarchy: state.tree.selectedHierarchy,
    defaultHierarchy: state.tree.defaultHierarchy,
    node: state.nrd.node
});

const mapDispatchToProps = dispatch => ({
    onFetchUser: () => dispatch(fetchUser()),
    fetchSelectableHierarchies: () => dispatch(fetchSelectableHierarchies()),
    fetchNode: (uniqueId) => dispatch(fetchNode(uniqueId)),
    setHierarchies: (hierarchies) => dispatch({
        type: 'SWITCH_HIERARCHY',
        payload: hierarchies
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
