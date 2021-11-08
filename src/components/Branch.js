import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Node from './Node';

const Branch = ({ item, level }) => {
    const { t, i18n } = useTranslation();
    const [selected, setSelected] = useState(level >= 1 ? false : true); // open tree on load
    const hasChildren = item.children && item.children.length !== 0;

    const renderBranches = () => {
        if (hasChildren) {
            const newLevel = level + 1;
            const sortedChildren = sortChildren(item.children, i18n.language);
            return sortedChildren.map((child) => {
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

const compareNameVersion = (prev, next, language) => {
    switch (language) {
        case 'en':
            return prev.nameEn.localeCompare(next.nameEn);
        case 'fi':
            return prev.nameFi.localeCompare(next.nameFi);
        case 'sv':
            return prev.nameSv.localeCompare(next.nameSv);
        default:
            break;
    }
};

const sortChildren = (children, language) => {
    let childrenWithCode = [];
    let childrenRest = [];
    children.map((item) => {
        if (item.code) {
            childrenWithCode.push(item);
        } else {
            childrenRest.push(item);
        }
    });

    childrenWithCode.sort((prev, next) => prev.code.localeCompare(next.code));
    childrenRest.sort((prev, next) => { compareNameVersion(prev, next, language);});
    return childrenWithCode.concat(childrenRest);
};

export default Branch;
