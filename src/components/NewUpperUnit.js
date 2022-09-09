import { Col, Row } from 'react-bootstrap';
import OrganisationUnitSearch from './OrganisationUnitSearch';
import HierarchyDropDown from './HierarchyDropDown';
import React, { useState } from 'react';
import PickDate from './PickDate';
import Button from 'react-bootstrap/Button';

const NewUpperUnit = () => {

    const [selectedOrganisationUnit, setSelectedOrganisationUnit] = useState(null);
    const [selectedHierarchy, setSelectedHierarchy] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const organisationUnitSelection = (value) => {
        setSelectedOrganisationUnit (value);
    };

    const hierarchySelection = (value) => {
      setSelectedHierarchy(value);
    };

    const dateSelection = (value, startDate, endDate) => {
        startDate ? setStartDate(value) : null;
        endDate ? setEndDate(value) : null;
    };

    const insertNewUpperUnit = () => {
        console.log('selected organisation unit', selectedOrganisationUnit);
        console.log('selected hierarchy', selectedHierarchy);
        console.log('startDate', startDate);
        console.log('endDate', endDate);
    };

    return (
      <div>
          <Row>
              <Col xs={6}>
                  <OrganisationUnitSearch onOrganisationUnitChange={organisationUnitSelection}/>
              </Col>
              <Col>
                  <HierarchyDropDown onHierarchyChange={hierarchySelection}/>
              </Col>
              <Col>
                  <PickDate startDate onDateChange={dateSelection} />
              </Col>
              <Col>
                  <PickDate endDate onDateChange={dateSelection} />
              </Col>
              <Col>
                  <Button variant="primary" onClick={insertNewUpperUnit}>Lisää</Button>
              </Col>
          </Row>
      </div>
    );
};

export default NewUpperUnit;
