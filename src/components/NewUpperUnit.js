import { Col, Row } from 'react-bootstrap';
import OrganisationUnitSearch from './OrganisationUnitSearch';
import HierarchyDropDown from './HierarchyDropDown';
import React, { useState } from 'react';
import PickDate from './PickDate';
import Button from 'react-bootstrap/Button';
import { actionAddNewUpperUnit } from '../actions/newUpperUnitAction';
import { connect } from 'react-redux';

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

    const insertNewUpperUnit = async() => {
        await props.addNewUpperUnit(selectedParentOrganisationUnit, selectedHierarchy, startDate, endDate, props.node);
    };

    return (
      <div>
          {props.edit ?
              <Row>
                  <Col xs={6}>
                      <OrganisationUnitSearch onOrganisationUnitChange={organisationUnitSelection}/>
                  </Col>
                  <Col>
                      <HierarchyDropDown onHierarchyChange={hierarchySelection}/>
                  </Col>
                  <Col>
                      <PickDate startDate onDateChange={dateSelection}/>
                  </Col>
                  <Col>
                      <PickDate endDate onDateChange={dateSelection}/>
                  </Col>
                  <Col>
                      <Button variant="primary" onClick={insertNewUpperUnit}>Lisää</Button>
                  </Col>
              </Row>
          : ''}
      </div>
    );
};

const mapDispatchToProps = dispatch => ({
    addNewUpperUnit: (selectedParentOrganisationUnit, selectedHierarchy, startDate, endDate, node) => {
        dispatch(actionAddNewUpperUnit(selectedParentOrganisationUnit, selectedHierarchy, startDate, endDate, node));
    }
});
const mapStateToProps = state => ({
    edit : state.editModeReducer.edit,
    node: state.nrd.node
});

export default connect(mapStateToProps, mapDispatchToProps)(NewUpperUnit);
