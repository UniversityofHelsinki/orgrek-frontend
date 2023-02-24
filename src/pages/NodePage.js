import { Col } from 'react-bootstrap';
import Hierarchy from '../components/Hierarchy';
import NodeDetails2 from '../components/nodeDetails/NodeDetails2';
import NodeDetails from '../components/NodeDetails';
import React from 'react';
import { useSelector } from 'react-redux';

const NodePage = () => {
  // Temporary solution until the old NodeDetails component is removed
  const editMode = useSelector((state) => state.editModeReducer.edit);

  return (
    <>
      <Col md={4} lg={4}>
        <Hierarchy />
      </Col>
      <Col>
        {!editMode && <NodeDetails2 />}
        {editMode && <NodeDetails />}
      </Col>
    </>
  );
};

export default NodePage;
