import { Button, Col, Row } from 'react-bootstrap';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  switchComing,
  switchHistory,
  updateAttributes,
  updateNodeProperties,
  updateParentUnitProperties,
} from '../actions/nodeViewAction';
import { connect } from 'react-redux';
import NodeViewControl from './NodeViewControl';
import { editMode } from '../actions/editModeAction';
import { validateDates, validateValues } from './Validator';

import {
  fetchNode,
  fetchNodeAttributes,
  fetchNodeFavorableFullNames,
  fetchNodeFullNames,
  fetchNodePredecessors,
  fetchNodeSuccessors,
} from '../actions/nodeAction';
import {
  fetchNodeChildren,
  fetchNodeParents,
} from '../actions/hierarchyAction';
import Paper from '@mui/material/Paper';

const EditButtons = (props) => {
  const { t } = useTranslation();

  let err_happened = false;

  const toggleEdit = (newMode) => {
    if (!newMode) {
      if (props.setModified) {
        props.setModified({}); //initialize modified map, when cancel button presses. When response got after
        //save button pressed, modidied should be initialized.
      }
    }
    props.onEditChange(newMode);
  };

  const updateParentNode = (modifiedParents) => {
    return modifiedParents[0].hierarchies.forEach((parent) => {
      parent.parentNodeId = modifiedParents[0].id;
      parent.childNodeId = props.node.id;
    });
  };

  const saveModifiedAttributes = async () => {
    const modifiedArr = Object.values(props.modified);
    let filteredAttributesArray = modifiedArr.filter(
      (elem) => elem.validity === false
    );
    const filteredNodeWithProperties = modifiedArr.find(
      (elem) => elem.validity === true
    );
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

    let skipValidation = false;
    if (props.feedback_stored && props.feedback_stored.success === false) {
      skipValidation = true;
    }
    if (filteredAttributesArray && filteredAttributesArray.length > 0) {
      await props.updatingAttributes(
        props.node,
        filteredAttributesArray,
        skipValidation
      );
    }
    if (filteredNodeWithProperties) {
      await props.updateNodeProperties(props.node, filteredNodeWithProperties);
      await props.getNodeDetails(props.node);
    }
    const modifiedParents = Object.values(props.modifiedParents || []);
    await props.updatingAttributes(props.node, modifiedArr, skipValidation);
    if (
      modifiedParents &&
      modifiedParents[0] &&
      modifiedParents[0].hierarchies &&
      modifiedParents[0].hierarchies.length > 0
    ) {
      updateParentNode(modifiedParents);
      await props.updateParentUnits(modifiedParents[0].hierarchies);
    }
  };

  useEffect(() => {
    //sotkeekohan tää jotain ku joudutaan tallentamaan kaks kertaa, eka virheeseen ja sit menee läpi
  }, [props.edit]);

  useEffect(async () => {
    console.log('feedback:' + props.feedback);
    if (
      props.feedback &&
      props.feedback.success &&
      props.feedback.message !== 'insert_attributes_success'
    ) {
      toggleEdit(false);
      props.onSwitchComing(false); //switch off coming attributes
      props.onSwitchHistory(false);
      await props.fetchNodeDetails(
        props.node,
        props.selectedDay,
        props.showHistory,
        props.showComing,
        props.selectedHierarchy
      );
    }
  }, [props.feedback]);

  const readDetails = async () => {
    if (!err_happened) {
      //toggleEdit(false);
      //props.onSwitchComing(false);//switch off coming attributes
      //props.onSwitchHistory(false);
      await props.fetchNodeDetails(
        props.node,
        props.selectedDay,
        props.showHistory,
        props.showComing,
        props.selectedHierarchy
      );
    } else {
      toggleEdit(true);
      await props.fetchNodeDetails(
        props.node,
        props.selectedDay,
        props.showHistory,
        props.showComing,
        props.selectedHierarchy
      );
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        top: 0,
        position: 'sticky',
        zIndex: (theme) => theme.zIndex.appBar,
        pt: 1,
        pb: 1,
        pl: { xs: 1, md: 4 },
        pr: { xs: 1, md: 4 },
      }}
    >
      {props.edit ? (
        <Row>
          <Col md="auto">
            <Button
              size="sm"
              variant="warning"
              onClick={() => {
                props.initval();
                toggleEdit(false);
                props.onSwitchComing(false); //switch off coming attributes
                props.onSwitchHistory(false); //switch off history attributes
              }}
            >
              {t('edit_mode_cancel_button')}
            </Button>
          </Col>
          <Col md="auto">
            <Button
              size="sm"
              variant="success"
              onClick={async () => {
                await saveModifiedAttributes();
                await readDetails();
              }}
            >
              {t('edit_mode_save_button')}
            </Button>
          </Col>
          <Col md="auto">
            <NodeViewControl
              node={props.node}
              selectedDay={props.selectedDay}
              selectedHierarchy={props.selectedHierarchy}
            />
          </Col>
        </Row>
      ) : (
        <Row>
          <Col md="auto">
            <Button
              size="sm"
              onClick={() => {
                toggleEdit(true);
                props.onSwitchComing(true); //switch on coming attributes
                props.onSwitchHistory(true);
              }}
            >
              {t('edit_mode_edit_button')}
            </Button>
          </Col>
          <Col md="auto">
            <NodeViewControl
              node={props.node}
              selectedDay={props.selectedDay}
              selectedHierarchy={props.selectedHierarchy}
            />
          </Col>
        </Row>
      )}
      <Row>
        <Col md="auto">
          {props.feedback && (
            <span
              className={props.feedback.success ? 'successText' : 'warningText'}
            >
              {t(props.feedback.message)}
              <br />
              {props.feedback.success ||
                `${t('status_code')}: ${props.feedback.statusCode}`}
            </span>
          )}
        </Col>
      </Row>
    </Paper>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onSwitchHistory: (input) => {
    dispatch(switchHistory(input));
  },
  onSwitchComing: (input) => {
    dispatch(switchComing(input));
  },
  updatingAttributes: (node, attributes, skipValidation) => {
    dispatch(updateAttributes(node.uniqueId, attributes, skipValidation));
  },
  updateNodeProperties: (node, properties) => {
    dispatch(updateNodeProperties(node.uniqueId, properties));
  },
  getNodeDetails: (node) => {
    dispatch(fetchNode(node.uniqueId, false));
  },
  updateParentUnits: (properties) => {
    dispatch(updateParentUnitProperties(properties));
  },
  fetchNodeDetails: (
    node,
    selectedDay,
    showHistory,
    showComing,
    selectedHierarchy
  ) => {
    dispatch(fetchNodePredecessors(node.uniqueId, selectedDay));
    dispatch(fetchNodeSuccessors(node.uniqueId, selectedDay));
    dispatch(fetchNodeFavorableFullNames(node.uniqueId, selectedDay));
    if (!(showHistory || showComing)) {
      dispatch(
        fetchNodeAttributes(node.uniqueId, selectedDay, selectedHierarchy)
      );
      dispatch(fetchNodeParents(node.uniqueId, selectedDay));
      dispatch(fetchNodeChildren(node.uniqueId, selectedDay));
      dispatch(fetchNodeFullNames(node.uniqueId, selectedDay));
    }
  },
  onEditChange: (edit) => dispatch(editMode(edit)),
});

const mapStateToProps = (state) => ({
  edit: state.editModeReducer.edit,
  feedback: state.nrd.feedback,
  feedback_stored: state.nrd.feedback_stored,
  node: state.nrd.node,
  nodeAttributes: state.nrd.nodeAttributes,
  selectedDay: state.dr.selectedDay,
  selectedHierarchy: state.tree.selectedHierarchy,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditButtons);
