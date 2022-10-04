import { Col, Row } from 'react-bootstrap';
import OrganisationUnitSearch from './OrganisationUnitSearch';
import HierarchyDropDown from './HierarchyDropDown';
import React, { useState, useEffect } from 'react';
import PickDate from './PickDate';
import Button from 'react-bootstrap/Button';
import { actionAddNewUpperUnit } from '../actions/newUpperUnitAction';
import { connect } from 'react-redux';
import { fetchNode } from '../actions/nodeAction';
import { fetchTree } from '../actions/treeAction';

const NewUpperUnit = (props) => {

    const [selectedParentOrganisationUnit, setSelectedParentOrganisationUnit] = useState(null);
    const [selectedHierarchy, setSelectedHierarchy] = useState('-');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const organisationUnitSelection = (value) => {
        setSelectedParentOrganisationUnit (value);
    };

    const hierarchySelection = (value) => {
      setSelectedHierarchy(value);
    };

    const dateSelection = (value, startDate, endDate) => {
        startDate ? setStartDate(value) : null;
        endDate ? setEndDate(value) : null;
    };

    const emptyUpperUnitState = () => {
        setSelectedHierarchy('-');
        isButtonDisabled();
    };

    const insertNewUpperUnit = async() => {
        await props.actionAddNewUpperUnit(selectedParentOrganisationUnit, selectedHierarchy, startDate, endDate, props.node);
        await props.fetchNodeAndTree(props.node, props.selectedHierarchy, props.selectedDay);
        emptyUpperUnitState();
    };

    const isButtonDisabled = () => {
        return !selectedParentOrganisationUnit || selectedHierarchy === '-';
    };

    const emptyAllStates = () => {
        setSelectedParentOrganisationUnit('');
        setSelectedHierarchy('-');
        setStartDate('');
        setEndDate('');
    };

    useEffect(() => {
        emptyAllStates();
    }, [props.initvalues]);

    return (
      <div>
          {props.edit ?
              <Row>
                  <Col xs={6}>
                      <OrganisationUnitSearch onOrganisationUnitChange={organisationUnitSelection} selectedParentOrganisationUnit={selectedParentOrganisationUnit}/>
                  </Col>
                  <Col>
                      <HierarchyDropDown onHierarchyChange={hierarchySelection} hierarchySelection={selectedHierarchy}/>
                  </Col>
                  <Col>
                      <PickDate startDate onDateChange={dateSelection} selectedStartDate={startDate}/>
                  </Col>
                  <Col>
                      <PickDate endDate onDateChange={dateSelection} selectedEndDate={endDate}/>
                  </Col>
                  <Col>
                      <Button disabled={isButtonDisabled()} variant="primary" onClick={insertNewUpperUnit}>Lisää</Button>
                  </Col>
              </Row>
          : ''}
      </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    actionAddNewUpperUnit: (selectedParentOrganisationUnit, selectedHierarchy, startDate, endDate, node) => {
        dispatch(actionAddNewUpperUnit(selectedParentOrganisationUnit, selectedHierarchy, startDate, endDate, node));
    },
    fetchNodeAndTree: (node, selection, date) => {
        dispatch(fetchNode(node.uniqueId, true));
        dispatch(fetchTree(selection, date));
    }
});
const mapStateToProps = state => ({
    edit : state.editModeReducer.edit,
    node: state.nrd.node,
    selectedHierarchy: state.tree.selectedHierarchy,
    selectedDay : state.dr.selectedDay,
});

export default connect(mapStateToProps, mapDispatchToProps)(NewUpperUnit);
