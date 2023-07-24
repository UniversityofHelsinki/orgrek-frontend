import React, { useEffect, useRef, useState } from 'react';
import NodeLabel from './NodeLabel';
import PropTypes from 'prop-types';

const isLeaf = (node) => {
  return node.children.length === 0;
};

const caretDown = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 1000 1000"><path fill="#107eab" d="M503 819l462-532-123-110-339 394-345-394L35 287z" stroke="#107eab" stroke-width="50" /></svg>`;
const caretRight = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 1000 1000"><path fill="#107eab" d="M291,35L181,158l394,345L181,842l110,123l532-462L291,35z" stroke="#107eab" stroke-width="50" /></svg>`;
const noCaret = '';

const TreeItem = ({
  root,
  containerProps = {
    role: 'group',
  },
  onClick,
  visible,
  selectedItem,
  previousVisible,
  nextVisible,
  firstVisible,
  lastVisible,
  targetNodeIdentifier,
  getNodeIdentifier,
  expandOnLoad = false,
  paths = new Map(),
}) => {
  const domRef = useRef();
  const [labelId] = useState(
    `label-${root.id}-${Math.floor(Math.random() * 1000000)}`
  );
  const isTarget = (node) => getNodeIdentifier(node) === targetNodeIdentifier;
  const [expanded, setExpanded] = useState(expandOnLoad);
  const [nodeIsTarget, setNodeIsTarget] = useState(false);

  useEffect(() => {
    const result = isTarget(root);
    setNodeIsTarget(result);
    if (!result) {
      const hasPathToTarget = paths.has(root);
      if (!expanded) {
        setExpanded(hasPathToTarget);
      }
    }
  }, [paths]);

  const asTreeItems = (node) => {
    return (
      <TreeItem
        key={`${node.id}`}
        root={node}
        containerProps={{
          role: 'group',
        }}
        onClick={onClick}
        visible={expanded && visible}
        selectedItem={selectedItem}
        nextVisible={nextVisible}
        previousVisible={previousVisible}
        firstVisible={firstVisible}
        lastVisible={lastVisible}
        targetNodeIdentifier={targetNodeIdentifier}
        getNodeIdentifier={getNodeIdentifier}
        expandOnLoad={false}
        paths={paths}
      />
    );
  };

  let ariaExpandedValue = expanded;
  if (isLeaf(root)) {
    ariaExpandedValue = undefined;
  }

  const handleClick = (event) => {
    event.stopPropagation();
    if (onClick) {
      onClick(root);
    }
  };

  const handleBulletClick = (event) => {
    event.stopPropagation();
    setExpanded(!expanded);
  };

  const isTheSelectedOne = root === selectedItem;

  const linkStyle = {
    fontWeight: nodeIsTarget && 'bold',
  };

  const bullet = isLeaf(root) ? noCaret : expanded ? caretDown : caretRight;

  const listStyle = {
    listStyleType: 'none',
    listStylePosition: 'inside',
    listStyleImage: `url('data:image/svg+xml;utf8,${encodeURIComponent(
      bullet
    )}')`,
    cursor: 'pointer',
  };

  const moveFocus = (event, target) => {
    event.preventDefault();
    if (target) {
      const label = target.querySelector('a').focus({
        focusVisible: true,
      });
      if (label) {
        label.focus();
      }
    }
  };

  const arrowRightPressed = (event) => {
    if (isLeaf(root)) {
      return;
    }

    if (!expanded) {
      setExpanded(true);
    } else {
      moveFocus(event, nextVisible(domRef.current));
    }
  };

  const arrowLeftPressed = (event) => {
    if (!expanded || isLeaf(root)) {
      moveFocus(event, domRef.current.parentElement?.parentElement);
    } else if (expanded) {
      setExpanded(false);
    }
  };

  const keyHandlers = {
    ArrowUp: (event) => moveFocus(event, previousVisible(domRef.current)),
    ArrowRight: (event) => arrowRightPressed(event),
    ArrowLeft: (event) => arrowLeftPressed(event),
    ArrowDown: (event) => moveFocus(event, nextVisible(domRef.current)),
    Home: (event) => moveFocus(event, firstVisible()),
    End: (event) => moveFocus(event, lastVisible()),
  };

  const handleKeyPress = (event) => {
    event.stopPropagation();
    if (!keyHandlers[event.key]) {
      return;
    }
    keyHandlers[event.key](event);
  };

  return (
    <li
      role="treeitem"
      ref={domRef}
      hidden={!visible}
      style={listStyle}
      aria-labelledby={labelId}
      aria-selected={isTheSelectedOne}
      aria-expanded={ariaExpandedValue}
      onClick={handleBulletClick}
      onKeyDown={handleKeyPress}
    >
      <NodeLabel
        onClick={handleClick}
        labelId={labelId}
        node={root}
        style={linkStyle}
      />
      <ul {...containerProps} hidden={!visible}>
        {root.children.map(asTreeItems)}
      </ul>
    </li>
  );
};

TreeItem.propTypes = {
  /**
   * The node object itself to be rendered as a TreeItem.
   * Property "children" that is an array of similar
   * node objects is required. It can be empty.
   * */
  root: PropTypes.shape({
    id: PropTypes.string.isRequired,
    hierarchies: PropTypes.array.isRequired,
    children: PropTypes.array.isRequired,
  }).isRequired,
  /**
   * These are given to the ul element containing
   * this node's children. It should contain role="group"
   * to retain accessibility.
   * */
  containerProps: PropTypes.object,
  /**
   * onClick handler that is invoked
   * after the li element is clicked.
   * This node object is given as an argument.
   * */
  onClick: PropTypes.func,
  /**
   * Whether or not this particular TreeItem is visible.
   * */
  visible: PropTypes.bool,
  /**
   * One of the items in the tree can be selected.
   * aria-selected attribute is set if this equals
   * to the 'root' prop.
   * */
  selectedItem: PropTypes.object,
  /**
   * All functions with the Visible suffix returns
   * the next visible node relative to this node.
   * These are used in the keyboard navigation.
   *
   * previousVisible returns the previous (or 'above' this node) node
   * relative to this node.
   * */
  previousVisible: PropTypes.func.isRequired,
  /**
   * Returns the next (or the one that is below this node)
   * relative to this node.
   * */
  nextVisible: PropTypes.func.isRequired,
  /**
   * Home key should move focus on to the first visible node.
   * This returns the first node.
   * */
  firstVisible: PropTypes.func.isRequired,
  /**
   * End key should move focus on to the last visible node.
   * The last visible node.
   * */
  lastVisible: PropTypes.func.isRequired,
  /**
   * targetNodeIdentifier is used to compare this node
   * to the target node. All branches leading to the
   * TreeItem that satisfies getNodeIdentifier(root) === targetNodeIdentifier
   * are expanded automatically on load.
   * */
  targetNodeIdentifier: PropTypes.string,
  /**
   * A function that returns this node's identifier used to
   * compare against targetNodeIdentifier.
   * This defaults to (node) => node.uniqueId;
   * */
  getNodeIdentifier: PropTypes.func,

  /**
   * Default value of expand.
   * Used to expand the first level.
   * Always false except on root nodes.
   * */
  expandOnLoad: PropTypes.bool,
  /**
   * A map having keys of objects and values of boolean.
   * This map should tell whether or not the node is in
   * path towards target.
   */
  path: PropTypes.object,
};

export default TreeItem;
