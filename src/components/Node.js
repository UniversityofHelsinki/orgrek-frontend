import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { containsAll } from '../actions/utilAction';
import { fetchNode } from '../actions/nodeAction';

const Node = (props) => {
  const [showHierarchies, setShowHierarchies] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (props.node && props.node.uniqueId === props.item.uniqueId) {
      props.onNodeSelection();
    }
  }, [props.selectedDay]);

  useEffect(() => {
    if (props.item?.hierarchies) {
      setShowHierarchies(
        !containsAll(props.item.hierarchies, props.selectedHierarchy.split(','))
      );
    }
  }, [props.item]);

  return (
    <div
      style={{
        display: 'flex',
        cursor: 'pointer',
        paddingLeft: `${props.level * 35}px`,
      }}
    >
      {props.hasChildren && (
        <div>
          <i
            data-testid={props.selected ? 'arrowdown' : 'arrowright'}
            id={props.item.uniqueId}
            onClick={props.onToggle}
            onKeyUp={(e) => e.key === 'Enter' && props.onToggle()}
            tabIndex={0}
            className={props.selected ? 'arrow down' : 'arrow right'}
          ></i>
        </div>
      )}
      <div className="treeNode">
        <span
          className={
            props.node && props.node.uniqueId === props.item.uniqueId
              ? 'nodeLinkSelected'
              : 'nodeLink'
          }
          onClick={() =>
            props.onNodeSelection(
              props.selectedDay,
              props.showHistory,
              props.showComing
            )
          }
          onKeyUp={(e) =>
            e.key === 'Enter' &&
            props.onNodeSelection(
              props.selectedDay,
              props.showHistory,
              props.showComing
            )
          }
          tabIndex={0}
        >
          {props.item?.name}
        </span>
        {showHierarchies && (
          <span className="treeHierarchies">
            {props.item?.hierarchies
              .map((h) => t(h))
              .reduce((a, c) => `${a} ${c}`)}
          </span>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  node: state.nrd.node,
  selectedDay: state.dr.selectedDay,
  selectedHierarchy: state.tree.selectedHierarchy,
  showHistory: state.nvrd.showHistory,
  showComing: state.nvrd.showComing,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onNodeSelection: () => {
    dispatch(fetchNode(ownProps.item.uniqueId, false));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Node);
