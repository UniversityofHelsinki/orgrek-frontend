import { Col, Form, Row } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import PickDate from './PickDate';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { fetchNode } from '../actions/nodeAction';
import { fetchTree } from '../actions/treeAction';
import { addNewAttributeAction } from '../actions/newAttributeAction';
import AttributeDropDown from './AttributeDropdown';
import UnitDropDown from './UnitDropDown';

const NewAttribute = (props) => {

    const initialState = {
        key: '',
        value: '',
        startDate: '',
        endDate: ''
    };

    const [
        { key, value, startDate, endDate },
        setState
    ] = useState(initialState);
    const clearState = () => {
        setState({ ...initialState });
    };

    const onValueChange = (event) => {
      setState(prevState => ({ ...prevState, value: event.target.value }));
    };

    const onKeyChange = (event) => {
        setState(prevState => ({ ...prevState, key: event.target.value }));
    };

    const dateSelection = (value, startDate, endDate) => {
        (startDate ?
            setState(prevState => ({ ...prevState, startDate: value }))
        : null);
        (endDate ?
            setState(prevState => ({ ...prevState, endDate: value }))
        : null);
        };


    const emptyAllStates = () => {
        clearState();
    };

    const insertNewAttribute = async() => {
        let attributeArr = [{ 'nodeId': props.node.id, 'key': key, 'value': value, 'startDate': startDate, 'endDate': endDate }];
        await props.actionAddNewAttribute(props.node.id, attributeArr);
        await props.fetchNodeAndTree(props.node, props.selectedHierarchy, props.selectedDay);
    };

    const isButtonDisabled = () => {
            return !key || !value;
    };

    useEffect(() => {
        emptyAllStates();
    }, [props.initvalues]);

    return (
        <div>
            {props.edit ?
                <Row>
                    <Col>
                        {props.unit ?
                            <UnitDropDown
                                onUnitChange={ (e) => {
                                    setState(prevState => ({ ...prevState, key: 'type' }));
                                    setState(prevState => ({ ...prevState, value: e.target.value }));
                                }
                                }/>
                        : props.availableAttributes ?
                            //<AttributeDropDown initializeval={initializeval} availableAttributes={props.availableAttributes}
                            <AttributeDropDown availableAttributes={props.availableAttributes}
                                onAttributeChange={ (value) => {
                                    setState(prevState => ({ ...prevState, key: value }));
                                }}/>
                        :
                            <Col>
                                <Form.Control onChange={ (e) => onKeyChange(e) }/>
                            </Col>
                        }
                    </Col>
                    {!props.unit ?
                    <Col>
                        <Form.Control value={value} onChange={ (e) => onValueChange(e) }/>
                    </Col> : ''}
                    <Col>
                        <PickDate startDate onDateChange={dateSelection} selectedStartDate={startDate}/>
                    </Col>
                    <Col>
                        <PickDate endDate onDateChange={dateSelection} selectedEndDate={endDate}/>
                    </Col>
                    <Col>
                        <Button disabled={isButtonDisabled()} variant="primary" onClick={insertNewAttribute}>Lisää</Button>
                    </Col>
                </Row>
                : ''}
        </div>
    );
};

const mapStateToProps = state => ({
    edit : state.editModeReducer.edit,
    node: state.nrd.node,
    selectedHierarchy: state.tree.selectedHierarchy,
    selectedDay : state.dr.selectedDay,
});

const mapDispatchToProps = (dispatch) => ({
    actionAddNewAttribute: (nodeId, attribute) => {
        dispatch(addNewAttributeAction(nodeId, attribute));
    },
    fetchNodeAndTree: (node, selection, date) => {
        dispatch(fetchNode(node.uniqueId, true));
        dispatch(fetchTree(selection, date));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewAttribute);
