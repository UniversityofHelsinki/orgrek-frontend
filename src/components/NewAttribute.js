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
import { validateDates } from './Validator';
import { t } from 'i18next';

const NewAttribute = (props) => {

    const initialState = {
        key: '',
        value: '',
        startDate: '',
        endDate: '',
        err: ''
    };

    const [
        { key, value, startDate, endDate, err },
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
        let attribute = { 'nodeId': props.node.id, 'key': key, 'value': value, 'startDate': startDate, 'endDate': endDate, 'err': '' };
        const errorDates = validateDates([attribute]);
        if (errorDates) {
            setState(prevState => ({ ...prevState, err: attribute.err }));
            return;
        }
        let skipValidation = false;
        if (props.feedback_stored && props.feedback_stored.success === false) {
            skipValidation =true;
        }
        await props.actionAddNewAttribute(props.node.id, attribute, skipValidation);
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
                    <Col md="2">
                        <PickDate startDate onDateChange={dateSelection} selectedStartDate={startDate}/>
                    </Col>
                    <Col md="2">
                        <PickDate endDate onDateChange={dateSelection} selectedEndDate={endDate}/>
                    </Col>
                    <Col>
                        <Button disabled={isButtonDisabled()} variant="primary" onClick={insertNewAttribute}>Lisää</Button>
                    </Col>
                    <Col md="3" className="warningText">
                        { err ? t(err) : '' }
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
    feedback_stored : state.nrd.feedback_stored,
});

const mapDispatchToProps = (dispatch) => ({
    actionAddNewAttribute: (nodeId, attribute, skipValidation) => {
        dispatch(addNewAttributeAction(nodeId, attribute, skipValidation));
    },
    fetchNodeAndTree: (node, selection, date) => {
        dispatch(fetchNode(node.uniqueId, true));
        dispatch(fetchTree(selection, date));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewAttribute);
