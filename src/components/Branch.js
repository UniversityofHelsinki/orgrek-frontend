import React, { useEffect, useState } from 'react';
import Node from './Node';

const Branch = ({ item, level, openableTree }) => {
  const [selected, setSelected] = useState(level < 1); // open tree on load
  const hasChildren = item.children && item.children.length !== 0;

  const nextInSomePath = openableTree?.filter(
    (path) => path[0].uniqueId === item.uniqueId
  );
  const notLastSomePath =
    nextInSomePath && nextInSomePath.some((path) => path.length > 1);
  const consumedTree = openableTree?.map((path) =>
    nextInSomePath?.includes(path) && path.length > 1 ? path.slice(1) : path
  );

  useEffect(() => {
    if (openableTree) {
      setSelected(selected || (nextInSomePath && notLastSomePath));
    }
  }, [openableTree]);

  const renderBranches = () => {
    if (hasChildren) {
      const newLevel = level + 1;
      return item.children.map((child) => {
        return (
          <Branch
            key={child.id}
            item={child}
            openableTree={consumedTree}
            level={newLevel}
          />
        );
      });
    }
    return null;
  };

  const toggleSelected = () => {
    setSelected((prev) => !prev);
  };

  return (
    <>
      <Node
        item={item}
        selected={selected}
        hasChildren={hasChildren}
        level={level}
        onToggle={toggleSelected}
      />

      {selected && renderBranches()}
    </>
  );
};

export default Branch;
