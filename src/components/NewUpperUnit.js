import { Col, Row } from 'react-bootstrap';
import OrganisationUnitSearch from './OrganisationUnitSearch';
import HierarchyDropDown from './HierarchyDropDown';
import React, { useState } from 'react';
import PickDate from './PickDate';
import Button from 'react-bootstrap/Button';
import { actionAddNewUpperUnit } from '../actions/newUpperUnitAction';
import { connect } from 'react-redux';
import { fetchNode } from '../actions/nodeAction';
import { fetchTree } from '../actions/treeAction';

const NewUpperUnit = (props) => {

    const [selectedParentOrganisationUnit, setSelectedParentOrganisationUnit] = useState(null);
    const [selectedHierarchy, setSelectedHierarchy] = useState(null);
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
        setSelectedParentOrganisationUnit(null);
        setSelectedHierarchy(null);
        setStartDate(null);
        setEndDate(null);
    };

    const insertNewUpperUnit = async() => {
        await actionAddNewUpperUnit(selectedParentOrganisationUnit, selectedHierarchy, startDate, endDate, props.node);
        await props.fetchNodeAndTree(props.node, props.selectedHierarchy, props.selectedDay);
        emptyUpperUnitState();
    };

    const isButtonDisabled = () => {
        return !selectedParentOrganisationUnit || !selectedHierarchy;
    };

    return (
      <div>
          {props.edit ?
              <Row>
                  <Col xs={6}>
                      <OrganisationUnitSearch onOrganisationUnitChange={organisationUnitSelection} selectedParentOrganisationUnit={selectedParentOrganisationUnit}/>
                  </Col>
                  <Col>
                      <HierarchyDropDown onHierarchyChange={hierarchySelection}/>
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
