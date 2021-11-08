import React from 'react';
import NodeName from './NodeName';
import NodeValidity from './NodeValidity';
import NodeAttributes from './NodeAttributes';
import NodeParents from './NodeParents';
import NodeChildren from './NodeChildren';
import NodePredecessors from './NodePredecessors';
import NodeSuccessors from './NodeSuccessors';

const NodeDetails = () => {

    return (
        <div className="nodeDetailsContainer">
            <NodeValidity/>
            <NodeName />
            <NodeParents />
            <NodeChildren />
            <NodePredecessors />
            <NodeSuccessors />
            <NodeAttributes />
        </div>
    );
};

export default NodeDetails;
