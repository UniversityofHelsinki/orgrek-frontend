import React from 'react';
import NodeName from './NodeName';
import NodeValidity from './NodeValidity';
import NodeAttributes from './NodeAttributes';

const NodeDetails = () => {

    return (
        <div className="nodeDetailsContainer">
            <NodeValidity/>
            <NodeName />
            <NodeAttributes />
        </div>
    );
};

export default NodeDetails;
