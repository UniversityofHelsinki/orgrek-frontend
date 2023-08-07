import Hierarchy from '../components/Hierarchy';
import NodeDetails from '../components/nodeDetails/NodeDetails';
import React, { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import { Box, Divider, Grid, useTheme } from '@mui/material';
import Tree from '../components/tree/Tree';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import useTree from '../hooks/useTree';
import useContentLanguage from '../hooks/useContentLanguage';
import { useNodeId } from '../hooks/useNodeId';

const MemoedNodeDetails = memo(function MemoedNodeDetails(props) {
  return <NodeDetails {...props} />;
});

const MemoedTree = memo(function MemoedTree(props) {
  return <Tree {...props} />;
});

const NodePage = () => {
  const language = useContentLanguage();
  const { trees, isFetching } = useTree();
  const selectedNodeId = useNodeId();

  const [showHistory, setShowHistory] = useState(false);
  const [showFuture, setShowFuture] = useState(false);

  const onSwitchHistoryClick = (v) => setShowHistory(v);
  const onSwitchFutureClick = (v) => setShowFuture(v);

  const switchHandlers = {
    onSwitchHistory: onSwitchHistoryClick,
    onSwitchFuture: onSwitchFutureClick,
  };

  const theme = useTheme();

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
    <Container sx={{ paddingLeft: 0, paddingRight: 0 }}>
      <Grid
        container
        paddingBottom={3}
        sx={{
          cursor: isDragging ? 'col-resize' : 'default',
          userSelect: isDragging ? 'none' : 'auto',
        }}
        onMouseMove={(e) => {
          if (isDragging) {
            setDragOptions({
              ...dragOptions,
              width: Math.max(0, e.clientX - dragOptions.difference),
            });
          }
        }}
        onMouseUp={(e) =>
          setDragOptions({
            ...dragOptions,
            dragging: false,
          })
        }
        onMouseLeave={(e) => {
          if (isDragging) {
            setDragOptions({
              ...dragOptions,
              dragging: false,
            });
          }
        }}
      >
        <Grid
          item
          sx={{
            position: 'sticky',
            zIndex: theme.zIndex.appBar,
            top: 0,
          }}
          xs
          sm={12}
          md={12}
        >
          <Hierarchy switchHandlers={switchHandlers} />
        </Grid>
        <Grid
          item
          md="auto"
          xs
          sx={{
            display: 'flex',
            justifyContent: 'start',
          }}
        >
          <Box
            sx={{
              width: width,
              position: 'sticky',
              top: 100,
              alignSelf: 'flex-start',
              overflowY: 'auto',
              maxHeight: `90vh`,
              pb: 3,
            }}
          >
            <MemoedTree
              trees={trees || []}
              loading={isFetching}
              targetNodeIdentifier={selectedNodeId}
            />
          </Box>
          <Divider
            sx={{
              ':hover::before': {
                borderColor: 'primary.main',
                borderWidth: '3px',
              },
              ':hover::after': {
                borderColor: 'primary.main',
                borderWidth: '3px',
              },
              cursor: 'col-resize',
              borderColor: isDragging ? 'primary.main' : '',
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
          >
            <DragIndicatorIcon sx={{ color: 'action.active' }} />
          </Divider>
        </Grid>
        <Grid item xs md>
          {selectedNodeId && (
            <MemoedNodeDetails
              showHistory={showHistory}
              showFuture={showFuture}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default NodePage;
