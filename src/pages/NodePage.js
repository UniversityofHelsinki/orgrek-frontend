import Hierarchy from '../components/Hierarchy';
import NodeDetails2 from '../components/nodeDetails/NodeDetails2';
import NodeDetails from '../components/NodeDetails';
import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2';
import useSelectedHierarchies from '../hooks/useSelectedHierarchies';

const NodePage = () => {
  useSelectedHierarchies();

  // Temporary solution until the old NodeDetails component is removed
  const editMode = useSelector((state) => state.editModeReducer.edit);

  return (
    <>
      <Grid container>
        <Grid xs={12} md={5} lg={4}>
          <Hierarchy />
        </Grid>
        <Grid xs={12} md={7} lg={8}>
          {!editMode && <NodeDetails2 />}
          {editMode && <NodeDetails />}
        </Grid>
      </Grid>
    </>
  );
};

export default NodePage;
