import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Tree from './Tree';
import TreeSearch from './TreeSearch';
import SelectDate from './SelectDate';
import { fetchSelectableHierarchies } from '../actions/treeAction';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import MultiSelectHierarchies from './MultiSelectHierarchies';
import ReviewDate from './ReviewDate';

const Hierarchy = (props) => {
  useEffect(() => {
    props.fetchSelectableHierarchies();
  }, []);

  const { t, i18n } = useTranslation();
  return (
    <div className="left-side">
      <Container>
        <Row>
          <h3 id={'main-content'}>{t('units')}</h3>
          <Col>
            <MultiSelectHierarchies />
          </Col>
        </Row>
        <Row>
          <h4>{t('display_date')}</h4>
          <SelectDate />
          <ReviewDate />
        </Row>
        <Row>
          <h4>{t('search_by_name_or_code')}</h4>
          <TreeSearch />
        </Row>
        <Row>
          <Tree />
        </Row>
      </Container>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchSelectableHierarchies: () => dispatch(fetchSelectableHierarchies()),
});

export default connect(null, mapDispatchToProps)(Hierarchy);
