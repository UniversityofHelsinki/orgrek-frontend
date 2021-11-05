import React, { useState } from 'react';
import { connect } from 'react-redux';
import Node from './Node';

const Branch = (props, { item, level }) => {
    console.log(item);
    const [selected, setSelected] = useState(level >= 1 ? false : true); // open tree on load
    const hasChildren = item.children && item.children.length !== 0;

    const renderBranches = () => {
        if (hasChildren) {
            const newLevel = level + 1;
            const sortedChildren = sortChildren(item.children, props.order_by);
            return item.children.map((child) => {
                return <Branch key={child.id} item={child} level={newLevel} />;
            });
        }
        return null;
    };

    const toggleSelected = () => {
        setSelected(prev => !prev);
    };

    const onSelection = () => {
        console.log('selected item' , item);

    };

    return (
        <>
            <Node
                item={item}
                selected={selected}
                hasChildren={hasChildren}
                level={level}
                onToggle={toggleSelected}
                onSelection={onSelection}
            />

            {selected && renderBranches()}
        </>
    );
};

function sortChildren (children, attributeToSortBy) {
    let childrenWithAttr = [];
    let childrenRest = [];
    children.map((item) => {
        const attributes = []; //node attributes
        const attribute = attributes.find(elem => elem.key === attributeToSortBy);
        item.sortValue = attribute;
        if (attribute !== undefined) {
            childrenWithAttr.push(item);
        } else {
            childrenRest.push(item);
        }
    });

    childrenWithAttr.sort((prev, next) => prev.sortValue - next.sortValue);
    childrenRest.sort((prev, next) => prev.nameFi - next.nameFi);
    console.log(children);
    return childrenWithAttr + childrenRest;
}

const mapStateToProps = state => ({
    order_by : state.tree.order_by
});

export default connect(mapStateToProps)(Branch);
