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
import { t } from 'i18next';
import { validateStartAndEndDates } from './Validator';

const NewUpperUnit = (props) => {

    const [selectedParentOrganisationUnit, setSelectedParentOrganisationUnit] = useState(null);
    const [selectedHierarchy, setSelectedHierarchy] = useState('-');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [err, setErr] = useState(null);

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
        const error = validateStartAndEndDates(startDate, endDate);
        if (error) {
            setErr(error);
            return;
        } else {
            setErr('');
        }
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
        setErr('');
    };

    useEffect(() => {
        emptyAllStates();
    }, [props.initvalues]);

    return (
      <div>
          {props.edit ?
              <Row>
                  <Col md="4">
                      <OrganisationUnitSearch onOrganisationUnitChange={organisationUnitSelection} selectedParentOrganisationUnit={selectedParentOrganisationUnit}/>
                  </Col>
                  <Col md="2">
                      <HierarchyDropDown onHierarchyChange={hierarchySelection} hierarchySelection={selectedHierarchy}/>
                  </Col>
                  <Col md="2">
                      <PickDate startDate onDateChange={dateSelection} selectedStartDate={startDate}/>
                  </Col>
                  <Col md="2">
                      <PickDate endDate onDateChange={dateSelection} selectedEndDate={endDate}/>
                  </Col>
                  <Col>
                      <Button disabled={isButtonDisabled()} variant="primary" onClick={insertNewUpperUnit}>Lisää</Button>
                  </Col>
                  <Col md="3" className="warningText">
                      { err ? t(err) : '' }
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
