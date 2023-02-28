import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { containsAll } from '../actions/utilAction';
import Link from './Link';

const Node = (props) => {
  const [showHierarchies, setShowHierarchies] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (props.item?.hierarchies) {
      setShowHierarchies(
        !containsAll(props.item.hierarchies, props.selectedHierarchy.split(','))
      );
    }
  }, [props.item]);

  const selected = props.node?.uniqueId === props.item.uniqueId;

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
        <Link
          node={props.item.uniqueId}
          sx={{ ml: 1, textDecoration: 'none', fontWeight: selected && 'bold' }}
        >
          {props.item?.name}
        </Link>
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

export default connect(mapStateToProps)(Node);
