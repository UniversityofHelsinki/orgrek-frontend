import React from 'react';
import NodeName from './NodeName';
import NodeValidity from './NodeValidity';
import NodeOtherAttributes from './NodeOtherAttributes';

const NodeDetails = () => {

    return (
        <div className="nodeDetailsContainer">
            <NodeValidity/>
            <NodeName />
            <NodeOtherAttributes />
        </div>
    );
};

export default NodeDetails;
