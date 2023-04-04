import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { switchHistory, switchComing } from '../actions/nodeViewAction';
import {
  fetchNodeAttributesFuture,
  fetchNodeAttributesHistory,
  clearNodeFuture,
  clearNodeHistory,
  fetchNodeFullNamesHistory,
  fetchNodeFullNamesFuture,
  clearFullNamesFuture,
  clearFullNamesHistory,
  fetchNodeFullNames,
  fetchNodeFullNamesAll,
} from '../actions/nodeAction';
import {
  fetchNodeChildrenHistory,
  fetchNodeChildrenFuture,
  fetchNodeParentsHistory,
  fetchNodeParentsFuture,
  clearChildrenHistory,
  clearChildrenFuture,
  clearParentsFuture,
  clearParentsHistory,
  fetchNodeChildrenAll,
  fetchNodeParentsAll,
} from '../actions/hierarchyAction';

const NodeViewControl = (props) => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (props.showHistory && props.showComing) {
      props.fetchAll();
    } else if (props.showHistory) {
      props.fetchHistory(props.showComing);
    } else if (props.showComing) {
      props.fetchComing(props.showHistory);
    }
  }, [
    props.showHistory,
    props.showComing,
    props.node,
    props.selectedHierarchy,
  ]);
  return (
    <Form>
      <Row className="align-items-center">
        <Col sm="auto">
          <Form.Check
            inline
            checked={props.showHistory}
            type="switch"
            id="show_history_switch"
            label={t('show_history')}
            onChange={() => props.onSwitchHistory(!props.showHistory)}
          />
        </Col>
        <Col sm="auto">
          <label>
            {t('display_date')}{' '}
            {new Date(props.selectedDay).toLocaleDateString('fi-FI')}
          </label>
        </Col>
        <Col sm="auto">
          <Form.Check
            inline
            checked={props.showComing}
            type="switch"
            id="show_coming_switch"
            label={t('show_coming')}
            onChange={() => props.onSwitchComing(!props.showComing)}
          />
        </Col>
      </Row>
    </Form>
  );
};

const mapStateToProps = (state) => ({
  showHistory: state.nvrd.showHistory,
  showComing: state.nvrd.showComing,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSwitchHistory: (input) => {
    dispatch(switchHistory(input));
  },
  fetchAll: () => {
    dispatch(clearFullNamesFuture());
    dispatch(clearChildrenFuture());
    dispatch(clearParentsFuture());
    dispatch(clearNodeHistory());
    dispatch(clearNodeFuture());
    dispatch(
      fetchNodeFullNamesAll(ownProps.node.uniqueId, ownProps.selectedDay)
    );
    dispatch(
      fetchNodeParentsAll(
        ownProps.node.uniqueId,
        ownProps.selectedDay,
        ownProps.selectedHierarchy
      )
    );
    dispatch(
      fetchNodeChildrenAll(
        ownProps.node.uniqueId,
        ownProps.selectedDay,
        ownProps.selectedHierarchy
      )
    );
    dispatch(
      fetchNodeAttributesHistory(
        ownProps.node.uniqueId,
        ownProps.selectedDay,
        ownProps.selectedHierarchy
      )
    );
    dispatch(
      fetchNodeAttributesFuture(
        ownProps.node.uniqueId,
        ownProps.selectedDay,
        ownProps.selectedHierarchy
      )
    );
  },
  fetchAllDisplayNames: () => {
    dispatch(clearFullNamesFuture());
    dispatch(fetchNodeFullNames(ownProps.node.uniqueId));
  },
  fetchAllParents: () => {
    dispatch(clearParentsFuture());
    dispatch(
      fetchNodeParentsAll(
        ownProps.node.uniqueId,
        ownProps.selectedDay,
        ownProps.selectedHierarchy
      )
    );
  },
  fetchAllChildren: () => {
    dispatch(clearChildrenFuture());
    dispatch(
      fetchNodeChildrenAll(
        ownProps.node.uniqueId,
        ownProps.selectedDay,
        ownProps.selectedHierarchy
      )
    );
  },
  fetchHistory: (showComing) => {
    dispatch(clearNodeHistory());
    dispatch(clearChildrenHistory());
    dispatch(clearParentsHistory());
    dispatch(clearFullNamesHistory());
    dispatch(
      fetchNodeParentsHistory(
        ownProps.node.uniqueId,
        ownProps.selectedDay,
        ownProps.selectedHierarchy
      )
    );
    dispatch(
      fetchNodeChildrenHistory(
        ownProps.node.uniqueId,
        ownProps.selectedDay,
        ownProps.selectedHierarchy
      )
    );
    dispatch(
      fetchNodeAttributesHistory(
        ownProps.node.uniqueId,
        ownProps.selectedDay,
        ownProps.selectedHierarchy
      )
    );
    if (!showComing) {
      dispatch(
        fetchNodeFullNamesHistory(ownProps.node.uniqueId, ownProps.selectedDay)
      );
    }
  },
  onSwitchComing: (input) => {
    dispatch(switchComing(input));
  },
  fetchComing: (showHistory) => {
    dispatch(clearNodeFuture());
    dispatch(clearChildrenFuture());
    dispatch(clearParentsFuture());
    dispatch(clearFullNamesFuture());
    dispatch(
      fetchNodeParentsFuture(
        ownProps.node.uniqueId,
        ownProps.selectedDay,
        ownProps.selectedHierarchy
      )
    );
    dispatch(
      fetchNodeChildrenFuture(
        ownProps.node.uniqueId,
        ownProps.selectedDay,
        ownProps.selectedHierarchy
      )
    );
    dispatch(
      fetchNodeAttributesFuture(
        ownProps.node.uniqueId,
        ownProps.selectedDay,
        ownProps.selectedHierarchy
      )
    );
    if (!showHistory) {
      dispatch(
        fetchNodeFullNamesFuture(ownProps.node.uniqueId, ownProps.selectedDay)
      );
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NodeViewControl);
