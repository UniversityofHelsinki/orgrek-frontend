import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { hierarchyDate, showValidity } from '../actions/utilAction';
import { Col, Form, Row, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchNode } from '../actions/nodeAction';
import ChooseDate from './ChooseDate';
import UnitDropDown from './UnitDropDown';

const ListLink = styled.a`
  text-decoration: none;
  color: #337ab7;
`;

const NodeDetailsTable = (props) => {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;
    let units = ['koontiyksikko', 'tiedekunta', 'osasto'];
    {/* hierarchyFilters kantahaku tehty jo. Ota käyttöön tässä.*/}

        useEffect(() => {
        }, [props.edit]);

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

        const doEdit = (key) => {
            return key !== 'unique_id';//Yksilöivä tunniste should not be edited
        };

        const renderTableData = () => {
            return props.contentData ? (props.dataFilter ? props.dataFilter(props.contentData) : props.contentData).map((elem, index) => {
                if (props.type === 'key-value') {
                    return (<tr key={ index }>
                        <td>{ t(elem.key) }</td>
                        <td>
                            { props.edit && props.fullname === false && doEdit(elem.key) ?
                                <> {/* edit mode */ }
                                    { (elem.key === 'type') ? <>
                                            <UnitDropDown value={ t(elem.value) } units={ units }
                                                          onUnitChange={ (e) => props.onValueChange(e, elem) }/>
                                        </>
                                        : <Form.Control name='value' value={ t(elem.value) }
                                                        onChange={ (e) => props.onValueChange(e, elem) }/> }
                                </>
                                : t(elem.value) } {/* show mode */ }
                        </td>

                        { props.hasValidity ?
                            <td>
                                <>
                                    { props.edit && props.fullname === false && doEdit(elem.key) ?
                                        <Row> {/* edit mode */ }
                                            <Col md="auto">
                                                <ChooseDate field={ 'startDate' } elem={ elem }
                                                            onDateChange={ props.onDateChange }/>
                                            </Col>
                                            <Col md="auto">
                                                <ChooseDate field={ 'endDate' } elem={ elem }
                                                            onDateChange={ props.onDateChange }/>
                                            </Col>
                                        </Row>
                                        : t(showValidity(elem.startDate, elem.endDate, i18n, t)) } {/* show mode */ }
                                </>
                            </td> : <></> }
                    </tr>);
                }

                if (props.type === 'node-hierarchy') {
                    return (<React.Fragment key={ elem.id }>
                            <tr>
                                <td onClick={ () => props.onNodeSelection(elem) }>
                                    <ListLink href="#">
                                        { elem.fullName }
                                    </ListLink></td>
                                { elem.hierarchies.length > 0 &&
                                    <>
                                        <td>{ t(elem.hierarchies[0].hierarchy) }</td>
                                        { props.edit && props.fullname === false && doEdit(elem.key) ?
                                            <Row> {/* edit mode */ }
                                                <Col md="auto">
                                                    <ChooseDate field={ 'startDate' } elem={ elem.hierarchies[0] }
                                                                onDateChange={ props.onDateChange }/>
                                                </Col>
                                                <Col md="auto">
                                                    <ChooseDate field={ 'endDate' } elem={ elem.hierarchies[0] }
                                                                onDateChange={ props.onDateChange }/>
                                                </Col>
                                            </Row>: hierarchyDate(elem.hierarchies[0], i18n, t) }
                                    </>
                                }
                            </tr>
                            { elem.hierarchies.slice(1).map((hierarchy, i) =>
                                <tr key={ i }>
                                    <td></td>
                                    <td>{ t(hierarchy.hierarchy) }</td>
                                    <td>{ hierarchyDate(hierarchy, i18n, t) }</td>
                                </tr>
                            ) }
                        </React.Fragment>
                    );
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
                    {/*<>{props.edit ? <tfoot><Button size="sm" onClick= {(e) => props.addNewrow(e)}>{t('edit_mode_add_row_button')}</Button></tfoot> :  <></> }</>*/ }
                </Table>
            </>
        );
    }
    ;

    const mapStateToProps = state => ({
        edit: state.editModeReducer.edit
    });

    const mapDispatchToProps = (dispatch, ownProps) => ({
        onNodeSelection: (elem) => {
            dispatch(fetchNode(elem.uniqueId));
        }
    });


export default connect(mapStateToProps, mapDispatchToProps)(NodeDetailsTable);
