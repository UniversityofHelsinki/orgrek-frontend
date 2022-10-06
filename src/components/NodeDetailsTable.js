import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { hierarchyDate, showValidity } from '../actions/utilAction';
import { Col, Form, Row, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchNode } from '../actions/nodeAction';
import ChooseDate from './ChooseDate';
import UnitDropDown from './UnitDropDown';
import ChooseUpperUnitDate from './ChooseUpperUnitDate';

const ListLink = styled.a`
  text-decoration: none;
  color: #337ab7;
`;

const NodeDetailsTable = (props) => {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;

        useEffect(() => {
        }, [props.edit]);

        useEffect(() => {
        }, [props.node]);

        const renderTableHeader = () => {
            return (
                <tr key={ props.heading }>
                    { props.tableLabels ? props.tableLabels.map((label) => {
                        return <th key={ props.heading + label }>{ t(label) }</th>;
                    }) : <></>
                    }
                    { props.hasValidity && props.tableLabels.length !== 0 ?
                        <th key={ props.heading + 'valid' }>{ t('valid_dates') }</th> : <></> }
                </tr>
            );
        };

        const isEditMode = (elem) => {
            if (props.edit && props.fullname === false && doEdit(elem.key)) {
                return true;
            } else {
                return false;
            }
        };

        const doEdit = (key) => {
            return key !== 'unique_id';
        };

        const renderInputField = (elem) => {
            if (props.heading !== 'valid_dates') {
                return <Form.Control name='value' value={ t(elem.value) } onChange={ (e) => props.onValueChange(e, elem) }/>;
            }
        };

        const renderUnitDropDown = (elem) => {
            return <UnitDropDown valueunits={ t(elem.value) } onUnitChange={ (e) => props.onValueChange(e, elem) }/>;
        };

        const showHideElementBasedOnMode = (elem) => {
            if (props.heading === 'unit_type') {
                return renderUnitDropDown(elem);
            }
            if (props.heading !== 'valid_dates') {
                return renderInputField(elem);
            }
        };

        const renderDateComponent = (elem) => {
            return (
                <Row>
                    <Col md="4">
                        <ChooseDate validity={props.heading === 'valid_dates'}  field={'startDate'} elem={elem}
                                    onDateChange={props.onDateChange}/>
                    </Col>
                    <Col md="4">
                        <ChooseDate validity={props.heading === 'valid_dates'} field={'endDate'} elem={elem}
                                    onDateChange={props.onDateChange}/>
                    </Col>
                    <Col md="3" className="warningText">
                        { elem.err ? t(elem.err) : '' }
                    </Col>
                </Row>
            );
        };

        const renderAttributesTable = (elem, index) => {
            return (
                <tr key={ index }>
                    <td>{ t(elem.key) }</td>
                    <td>
                        { isEditMode(elem) ? showHideElementBasedOnMode(elem) : t(elem.value) }
                    </td>

                    { props.hasValidity ?
                        <td>
                            { isEditMode(elem) ? renderDateComponent(elem) : t(showValidity(elem.startDate, elem.endDate, i18n, t)) }
                        </td> : <></> }
                </tr>
            );
        };

        const renderUnit = (elem) => {
            return (
                <div onClick={ () => props.onNodeSelection(elem) }>
                    <ListLink href="#">
                        { elem.fullName }
                    </ListLink>
                </div>
            );
        };

        const renderUpperUnitDate = (elem, hierarchy) => {
            return (
                <Row>
                    <Col md="auto">
                        <ChooseUpperUnitDate field={ 'startDate' } elem={ elem } hierarchyElement={ hierarchy }
                                             onDateChange={ props.onDateChange }/>
                    </Col>
                    <Col md="auto">
                        <ChooseUpperUnitDate field={ 'endDate' } elem={ elem } hierarchyElement={ hierarchy }
                                             onDateChange={ props.onDateChange }/>
                    </Col>
                </Row>
            );
        };

        const isUpperUnit = () => props.heading === 'upper_units';

        const renderHierarchyTable = (elem) => {
            return (
                <React.Fragment key={ elem.id }>
                    { elem.hierarchies.map((hierarchy, i) =>
                        <tr key={ i }>
                            <td> { i === 0 ? renderUnit(elem) : '' }</td>
                            <td>{ t(hierarchy.hierarchy) }</td>
                            <td>{ isEditMode(true) && isUpperUnit() ? renderUpperUnitDate(elem, hierarchy) : hierarchyDate(hierarchy, i18n, t) }</td>
                        </tr>
                    ) }
                </React.Fragment>
            );
        };

        const renderTableData = () => {
            return props.contentData ? (props.dataFilter ? props.dataFilter(props.contentData) : props.contentData).map((elem, index) => {
                if (props.type === 'key-value') {
                    return renderAttributesTable(elem, index);
                }

                if (props.type === 'node-hierarchy') {
                    return renderHierarchyTable(elem);
                }

                if (props.type === 'name-validity') {
                    return (<tr key={ elem.id }>
                        <td onClick={ () => props.onNodeSelection(elem) }>
                            <ListLink href="#">
                                { elem.fullName }
                            </ListLink></td>
                        <td>{ showValidity(elem.startDate, elem.endDate, i18n, t) }</td>
                        <td>{ showValidity(elem.edgeStartDate, elem.edgeEndDate, i18n, t) }</td>
                    </tr>);
                }

            }) : null;
        };

        return (
            <>
                <h4>{ t(props.heading) }</h4>
                <Table id={ props.heading } size="sm" data-testid='node-details-table'>
                    <thead>
                    { renderTableHeader() }
                    </thead>
                    <tbody>
                    { renderTableData() }
                    </tbody>
                </Table>
            </>
        );
    }
;

const mapStateToProps = state => ({
    edit: state.editModeReducer.edit,
    node: state.nrd.node
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onNodeSelection: (elem) => {
        dispatch(fetchNode(elem.uniqueId));
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(NodeDetailsTable);
