import Hierarchy from '../components/Hierarchy';
import NodeDetails2 from '../components/nodeDetails/NodeDetails2';
import NodeDetails from '../components/NodeDetails';
import React from 'react';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

const NodePage = () => {
  // Temporary solution until the old NodeDetails component is removed
  const editMode = useSelector((state) => state.editModeReducer.edit);

  return (
    <Container>
      <Grid container>
        <Grid xs={12} md={5} lg={4} mb={2}>
          <Hierarchy />
        </Grid>
        <Grid xs={12} md={7} lg={8}>
          {!editMode && <NodeDetails2 />}
          {editMode && <NodeDetails />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default NodePage;
