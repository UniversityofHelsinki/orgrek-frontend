import { Button, Col, Row } from 'react-bootstrap';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { switchComing, switchHistory, updateAttributes, updateNodeProperties, updateParentUnitProperties } from '../actions/nodeViewAction';
import { connect } from 'react-redux';
import NodeViewControl from './NodeViewControl';
import { editMode } from '../actions/editModeAction';
import { validateDates, validateValues } from './Validator';

import {
    fetchNode,
    fetchNodeAttributes,
    fetchNodeFavorableFullNames, fetchNodeFullNames,
    fetchNodePredecessors,
    fetchNodeSuccessors
} from '../actions/nodeAction';
import { fetchNodeChildren, fetchNodeParents } from '../actions/hierarchyAction';

const EditButtons = (props) => {
    const { t, i18n } = useTranslation();
    let err_happened = false;

    const toggleEdit = (newMode) => {
        if (!newMode) {
            props.setModified({});//initialize modified map, when cancel button presses. When response got after
            //save button pressed, modidied should be initialized.
        }
        props.onEditChange(newMode);
    };

    const updateParentNode = (modifiedParents) => {
        return modifiedParents[0].hierarchies.forEach((parent) => {
            parent.parentNodeId = modifiedParents[0].id;
            parent.childNodeId = props.node.id;
        });
    };

    const saveModifiedAttributes = async()  => {
        const modifiedArr = Object.values(props.modified);
        let filteredAttributesArray = modifiedArr.filter(elem => elem.validity === false);
        const filteredNodeWithProperties = modifiedArr.find(elem => elem.validity === true);
        const errorDates = validateDates(filteredAttributesArray);
        const emptyValues = validateValues(filteredAttributesArray);
        if (errorDates) {
            err_happened = true;
            return;
        }
        if (emptyValues) {
            err_happened = true;
            return;
        }

        if (filteredAttributesArray && filteredAttributesArray.length > 0) {
            await props.updatingAttributes(props.node, filteredAttributesArray);
        }
        if (filteredNodeWithProperties) {
            await props.updateNodeProperties(props.node, filteredNodeWithProperties);
            await props.getNodeDetails(props.node);
        }
        const modifiedParents = Object.values(props.modifiedParents);
        await props.updatingAttributes(props.node, modifiedArr);
        if (modifiedParents && modifiedParents[0] && modifiedParents[0].hierarchies && modifiedParents[0].hierarchies.length > 0) {
            updateParentNode(modifiedParents);
            await props.updateParentUnits(modifiedParents[0].hierarchies);
        }
    };

    useEffect(() => {
    }, [props.edit]);

    useEffect(() => {
    }, [props.feedback]);

    const readDetails = () => {
        if (!err_happened) {
            toggleEdit(false);
            props.onSwitchComing(false);//switch off coming attributes
            props.onSwitchHistory(false);
            props.fetchNodeDetails(props.node, props.selectedDay, props.showHistory, props.showComing, props.selectedHierarchy);
        } else {
            toggleEdit(true);
            props.fetchNodeDetails(props.node, props.selectedDay, props.showHistory, props.showComing, props.selectedHierarchy);
        }
    };

    return (
        <div className="edit-buttons">
            {props.edit ? (
                <Row>
                    <Col md="auto">
                        <Button size="sm" variant="warning" onClick={() => {toggleEdit(false);
                            props.onSwitchComing(false);//switch off coming attributes
                            props.onSwitchHistory(false);}//switch off history attributes
                        }>
                            {t('edit_mode_cancel_button')}
                        </Button>
                    </Col>
                    <Col md="auto">
                        <Button size="sm" variant="success" onClick={async () => {
                            //toggleEdit(false);
                            await saveModifiedAttributes();
                            //props.onSwitchComing(false);//switch off coming attributes
                            //props.onSwitchHistory(false);
                            //props.fetchNodeDetails(props.node, props.selectedDay, props.showHistory, props.showComing, props.selectedHierarchy);
                            {readDetails();}
                        }}//switch off history attributes
                        >
                            {t('edit_mode_save_button')}
                        </Button>
                    </Col>
                    <Col md="auto">
                        <NodeViewControl node={props.node} selectedDay={props.selectedDay}  selectedHierarchy={props.selectedHierarchy} />
                    </Col>
                </Row>
            ) : (
                <Row>
                    <Col md="auto">
                        <Button size="sm" onClick={() => {toggleEdit(true);
                            props.onSwitchComing(true); //switch on coming attributes
                            props.onSwitchHistory(true);}//switch on history attributes
                        }>
                            {t('edit_mode_edit_button')}
                        </Button>
                    </Col>
                    <Col md="auto">
                        <NodeViewControl node={props.node} selectedDay={props.selectedDay}  selectedHierarchy={props.selectedHierarchy} />
                    </Col>
                </Row>)}
        <Col md="auto">
            {props.feedback && <span className={props.feedback.success ? 'successText' : 'warningText'}>{props.feedback.message}<br/>{props.feedback.success || `${t('status_code')}: ${props.feedback.statusCode}`}</span>}
        </Col>
        </div>
    );
};


const mapDispatchToProps = dispatch => ({
    onSwitchHistory: (input) => {
        dispatch(switchHistory(input));
    },
    onSwitchComing: (input) => {
        dispatch(switchComing(input));
    },
    updatingAttributes: (node, attributes) => {
        dispatch(updateAttributes(node.uniqueId, attributes));
    },
    updateNodeProperties: (node, properties) => {
        dispatch(updateNodeProperties(node.uniqueId, properties));
    },
    getNodeDetails: (node) => {
        dispatch(fetchNode(node.uniqueId, false));
    },
    updateParentUnits:(properties) => {
        dispatch(updateParentUnitProperties(properties));
    },
    fetchNodeDetails: (node, selectedDay, showHistory, showComing, selectedHierarchy) => {
        dispatch(fetchNodePredecessors(node.uniqueId, selectedDay));
        dispatch(fetchNodeSuccessors(node.uniqueId, selectedDay));
        dispatch(fetchNodeFavorableFullNames(node.uniqueId, selectedDay));
        if (!(showHistory || showComing)) {
            dispatch(fetchNodeAttributes(node.uniqueId, selectedDay, selectedHierarchy));
            dispatch(fetchNodeParents(node.uniqueId, selectedDay));
            dispatch(fetchNodeChildren(node.uniqueId, selectedDay));
            dispatch(fetchNodeFullNames(node.uniqueId, selectedDay));
        }
    },
    onEditChange: (edit) => dispatch(editMode(edit))
});


const mapStateToProps = state => ({
    edit : state.editModeReducer.edit,
    feedback: state.nrd.feedback
});

export default connect(mapStateToProps, mapDispatchToProps)(EditButtons);

