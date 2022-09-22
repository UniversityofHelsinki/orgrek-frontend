import { Col, Form, Row } from 'react-bootstrap';
import React, { useState } from 'react';
import PickDate from './PickDate';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { fetchNode } from '../actions/nodeAction';
import { fetchTree } from '../actions/treeAction';
import { editMode } from '../actions/editModeAction';
import { t } from 'i18next';
import { addNewAttributeAction } from '../actions/newAttributeAction';
import AttributeDropDown from './AttributeDropdown';
import UnitDropDown from './UnitDropDown';

const NewAttribute = (props) => {

    const [key, setKey] = useState(null);
    const [value, setValue] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const onValueChange = (event) => {
       setValue(event.target.value);
    };

    const onKeyChange = (event) => {
        setKey(event.target.value);
    };

    const dateSelection = (value, startDate, endDate) => {
        startDate ? setStartDate(value) : null;
        endDate ? setEndDate(value) : null;
    };

    const emptyUpperUnitState = () => {
        setKey(null);
        setValue(null);
        setStartDate(null);
        setEndDate(null);
    };

    const insertNewAttribute = async() => {
        let attributeArr = [{ 'nodeId': props.node.id, 'key': key, 'value': value, 'startDate': startDate, 'endDate': endDate }];
        await props.actionAddNewAttribute(props.node.id, attributeArr);
        await props.fetchNodeAndTree(props.node, props.selectedHierarchy, props.selectedDay);
        emptyUpperUnitState();
    };

    const isButtonDisabled = () => {
        return !key || !value;
    };

    return (
        <div>
            {props.edit ?
                <Row>
                    <Col>
                        {props.unit ?
                            <UnitDropDown
                                onUnitChange={ (e) => {
                                    setKey('type');
                                    setValue(e.target.value);
                                }
                                }/>
                        : props.availableAttributes ?
                            <AttributeDropDown availableAttributes={props.availableAttributes}
                                onAttributeChange={ (value) => {
                                    setKey(value);
                                }}/>
                        :
                            <Col>
                                <Form.Control name='key' onChange={ (e) => onKeyChange(e) }/>
                            </Col>
                        }
                    </Col>
                    {!props.unit ?
                    <Col>
                        <Form.Control name='value' onChange={ (e) => onValueChange(e) }/>
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

const mapDispatchToProps = (dispatch) => ({
    actionAddNewAttribute: (nodeId, attribute) => {
        dispatch(addNewAttributeAction(nodeId, attribute));
    },
    fetchNodeAndTree: (node, selection, date) => {
        dispatch(fetchNode(node.uniqueId, true));
        dispatch(fetchTree(selection, date));
        //dispatch(editMode(false));
    }
});
const mapStateToProps = state => ({
    edit : state.editModeReducer.edit,
    node: state.nrd.node,
    selectedHierarchy: state.tree.selectedHierarchy,
    selectedDay : state.dr.selectedDay,
});

export default connect(mapStateToProps, mapDispatchToProps)(NewAttribute);
