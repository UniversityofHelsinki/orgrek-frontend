import { Col, Row } from 'react-bootstrap';
import OrganisationUnitSearch from './OrganisationUnitSearch';
import HierarchyDropDown from './HierarchyDropDown';
import React from 'react';
import PickDate from './PickDate';

const NewUpperUnit = () => {
    return (
      <div>
          <Row>
              <Col>
                  <OrganisationUnitSearch />
              </Col>
              <Col>
                  <HierarchyDropDown/>
              </Col>
              <Col>
                  <PickDate /> - <PickDate />
              </Col>
          </Row>
      </div>
    );
};

export default NewUpperUnit;
