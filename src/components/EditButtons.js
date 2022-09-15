import { Button, Col, Row } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { switchComing, switchHistory, updateAttributes } from '../actions/nodeViewAction';
import { connect } from 'react-redux';
import NodeViewControl from './NodeViewControl';
import { editMode } from '../actions/editModeAction';

const EditButtons = (props) => {
    const { t, i18n } = useTranslation();

    const toggleEdit = (newMode) => {
        if (!newMode) {
            props.setModified({});//initialize modified map, when cancel button presses. When response got after
            //save button pressed, modidied should be initialized.
        }
        props.onEditChange(newMode);
    };

    const saveModifiedAttributes = ()  => {
        const modifiedArr = Object.values(props.modified);
        //modifiedArr.map((mod,index) => console.log(index + ' = ' + mod + ' = ' + mod[index]));
        props.updatingAttributes(props.node, modifiedArr);
        //setAwaitingSaveFeedback(true);
    };

    useEffect(() => {
    }, [props.edit]);

    useEffect(() => {
    }, [props.feedback]);

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
                        <Button size="sm" variant="success" onClick={() => {toggleEdit(false);
                            {saveModifiedAttributes();}
                            props.onSwitchComing(false);//switch off coming attributes
                            props.onSwitchHistory(false);}}//switch off history attributes
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
            {props.feedback && <span className={props.feedback.success ? 'success' : 'error'}>{props.feedback.message}<br/>{props.feedback.success || `${t('status_code')}: ${props.feedback.statusCode}`}</span>}
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
    onEditChange: (edit) => dispatch(editMode(edit))
});


const mapStateToProps = state => ({
    edit : state.editModeReducer.edit,
    feedback: state.nrd.feedback
});

export default connect(mapStateToProps, mapDispatchToProps)(EditButtons);

