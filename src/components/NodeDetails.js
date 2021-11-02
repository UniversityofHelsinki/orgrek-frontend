import React from 'react';
import NodeName from './NodeName';
import NodeValidity from './NodeValidity';
import NodeAttributes from './NodeAttributes';
import NodeParents from './NodeParents';
import NodeChildren from './NodeChildren';

const NodeDetails = () => {

    return (
        <div className="nodeDetailsContainer">
            <NodeValidity/>
            <NodeName />
            <NodeParents />
            <NodeChildren />
            <NodeAttributes />
        </div>
    );
};

export default NodeDetails;
