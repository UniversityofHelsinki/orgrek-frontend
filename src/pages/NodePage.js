import Hierarchy from '../components/Hierarchy';
import NodeDetails2 from '../components/nodeDetails/NodeDetails2';
import NodeDetails from '../components/NodeDetails';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Divider } from '@mui/material';
import Tree from '../components/Tree';

const NodePage = () => {
  // Temporary solution until the old NodeDetails component is removed
  const editMode = useSelector((state) => state.editModeReducer.edit);

  return (
    <Container sx={{ pb: 3 }}>
      <Hierarchy />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box
          component="aside"
          sx={{
            width: 400,
            position: 'sticky',
            top: 80,
            alignSelf: 'flex-start',
          }}
        >
          <Box
            sx={{
              overflowY: 'auto',
              maxHeight: `calc(100vh - ${80}px)`,
              pb: 3,
            }}
          >
            {/* TODO: Move this border style override to the Tree component */}
            <Tree sx={{ borderStyle: 'none' }} />
          </Box>
        </Box>
        <Divider orientation="vertical" flexItem component="div" />
        {!editMode && <NodeDetails2 />}
        {editMode && <NodeDetails />}
      </Box>
    </Container>
  );
};

export default NodePage;
