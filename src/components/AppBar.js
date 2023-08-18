import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import TreeSearch from './TreeSearch';
import ReviewDate from './ReviewDate';
import { fetchSelectableHierarchies } from '../actions/treeAction';
import HierarchySelection from './HierarchySelection';
import { Grid, Paper, Stack, useTheme } from '@mui/material';
import useFetchNode from '../hooks/useFetchNode';
import NodeViewControl from './NodeViewControl';

const AppBar = ({ fetchSelectableHierarchies, switchHandlers }) => {
  useEffect(() => {
    fetchSelectableHierarchies();
  }, []);
  const node = useFetchNode();
  const selectedDay = useSelector((state) => state.dr.selectedDay);

  return (
    <Paper
      id="orgrek-appbar"
      elevation={0}
      sx={{
        pt: 2,
        pb: 2,
      }}
    >
      <Grid
        container
        id="main-content"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid container item xs={12} md={8} spacing={1}>
          <Grid item xs={12} sm={3} md={3}>
            <ReviewDate />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <HierarchySelection size="small" limitTags={2} />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <TreeSearch width="auto" />
          </Grid>
        </Grid>
        <Grid item xs={12} md="auto">
          <NodeViewControl
            node={node}
            onSwitchHistory={switchHandlers.onSwitchHistory}
            onSwitchFuture={switchHandlers.onSwitchFuture}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchSelectableHierarchies: () => dispatch(fetchSelectableHierarchies()),
});

export default connect(null, mapDispatchToProps)(AppBar);
