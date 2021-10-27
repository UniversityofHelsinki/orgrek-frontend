import React from 'react';
import NodeName from './NodeName';
import NodeValidity from './NodeValidity';

const NodeDetails = () => {

    return (
        <div className="nodeDetailsContainer">
            <NodeValidity/>
            <NodeName />
        </div>
    );
};

export default NodeDetails;
