import React from 'react';
import Dropdown from './Dropdown';
import Tree from './Tree';
import TreeSearch from './TreeSearch';
import SelectDate from './SelectDate';
import { Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Hierarchy = () => {
    const { t, i18n } = useTranslation();
    return (
        <Container>
            <Row>
                <h3>{t('units')}</h3>
                <Dropdown/>
                <h5>{t('search_by_name_or_code')}</h5>
                <TreeSearch />
                <h5>{t('display_date')}</h5>
                <SelectDate/>
            </Row>
            <Row>
                <Tree/>
            </Row>
        </Container>
    );
};

export default Hierarchy;
