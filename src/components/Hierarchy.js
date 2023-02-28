import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Tree from './Tree';
import TreeSearch from './TreeSearch';
import ReviewDate from './ReviewDate';
import { fetchSelectableHierarchies } from '../actions/treeAction';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import HierarchySelection from './HierarchySelection';
import Box from '@mui/material/Box';

const Hierarchy = (props) => {
  useEffect(() => {
    props.fetchSelectableHierarchies();
  }, []);

  const { t } = useTranslation();
  return (
    <Box sx={{ pl: 1, pr: 1 }}>
      <Container>
        <Row>
          <h3 id={'main-content'}>
            <label htmlFor="hierarchy-selection" id="hierarchy-selection-label">
              {t('units')}
            </label>
          </h3>
          <Col>
            <HierarchySelection />
          </Col>
        </Row>
        <Row>
          <h4>{t('display_date')}</h4>
          <Col>
            <ReviewDate />
          </Col>
        </Row>
        <Row>
          <h4>{t('search_by_name_or_code')}</h4>
          <TreeSearch />
        </Row>
        <Row>
          <Tree sx={{ mt: 2 }} />
        </Row>
      </Container>
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchSelectableHierarchies: () => dispatch(fetchSelectableHierarchies()),
});

export default connect(null, mapDispatchToProps)(Hierarchy);
