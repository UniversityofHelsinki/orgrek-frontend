import { Col, Row } from 'react-bootstrap';
import OrganisationUnitSearch from './OrganisationUnitSearch';
import HierarchyDropDown from './HierarchyDropDown';
import React from 'react';

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
          </Row>
      </div>
    );
};

export default NewUpperUnit;
