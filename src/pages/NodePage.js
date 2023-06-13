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

  const [dragOptions, setDragOptions] = useState({
    dragging: false,
    width: 400,
    // difference between the object on the right side of the divider and the divider itself.
    // calculated every time the mouse is over the divider.
    difference: null,
  });

  const isDragging = dragOptions.dragging;
  const width = dragOptions.width;

  return (
    <Container sx={{ pb: 3 }}>
      <Hierarchy />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'start',
          cursor: isDragging ? 'col-resize' : 'default',
          userSelect: isDragging ? 'none' : 'auto',
        }}
        onMouseMove={(e) => {
          if (isDragging) {
            setDragOptions({
              ...dragOptions,
              width: e.clientX - dragOptions.difference,
            });
          }
        }}
        onMouseUp={(e) =>
          setDragOptions({
            ...dragOptions,
            dragging: false,
          })
        }
      >
        <Box
          component="aside"
          sx={{
            width: width,
            position: 'sticky',
            top: 80,
            alignSelf: 'flex-start',
            overflowY: 'auto',
            maxHeight: `90vh`,
            pb: 3,
          }}
        >
          <Tree sx={{ borderStyle: 'none' }} />
        </Box>
        <Divider
          sx={{
            ':hover': {
              backgroundColor: 'primary.main',
            },
            cursor: 'col-resize',
            backgroundColor: isDragging ? 'primary.main' : '',
            padding: '2px',
          }}
          orientation="vertical"
          flexItem
          component="div"
          onMouseOver={(e) =>
            setDragOptions({
              ...dragOptions,
              difference: Math.abs(width - e.clientX),
            })
          }
          onMouseDown={(e) =>
            setDragOptions({
              ...dragOptions,
              dragging: true,
            })
          }
        />
        {!editMode && <NodeDetails2 />}
        {editMode && <NodeDetails />}
      </Box>
    </Container>
  );
};

export default NodePage;
