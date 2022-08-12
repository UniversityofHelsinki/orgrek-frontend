import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Dropdown from './Dropdown';
import Tree from './Tree';
import TreeSearch from './TreeSearch';
import SelectDate from './SelectDate';
import { fetchSelectableHierarchies } from '../actions/treeAction';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Hierarchy = (props) => {

    useEffect(() => {
        props.fetchSelectableHierarchies();
    }, []);

    const { t, i18n } = useTranslation();
    return (
        <Container>
            <Row>
                <h3 id={'main-content'}>{t('units')}</h3>
                <Col>
                    <Dropdown/>
                </Col>
            </Row>
            <Row>
                <h4>{t('display_date')}</h4>
                <SelectDate/>
            </Row>
            <Row>
                <h4>{t('search_by_name_or_code')}</h4>
                <TreeSearch />
            </Row>
            <Row>
                <Tree/>
            </Row>
        </Container>
    );
};

const mapDispatchToProps = dispatch => ({
    fetchSelectableHierarchies: () => dispatch(fetchSelectableHierarchies()),
});

export default connect(null, mapDispatchToProps)(Hierarchy);