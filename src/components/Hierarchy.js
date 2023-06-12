import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import TreeSearch from './TreeSearch';
import ReviewDate from './ReviewDate';
import { fetchSelectableHierarchies } from '../actions/treeAction';
import { useTranslation } from 'react-i18next';
import HierarchySelection from './HierarchySelection';
import { Stack, Paper, useTheme } from '@mui/material';
import useFetchNode from '../hooks/useFetchNode';
import NodeViewControl from './NodeViewControl';
import IfAdmin from '../auth/IfAdmin';

const Hierarchy = (props) => {
  useEffect(() => {
    props.fetchSelectableHierarchies();
  }, []);
  const node = useFetchNode();
  const hierarchies = useSelector(
    (state) => state.tree.selectedHierarchy || state.tree.defaultHierarchy
  );
  const selectedDay = useSelector((state) => state.dr.selectedDay);

  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <Paper
      elevation={0}
      sx={{
        top: 0,
        position: 'sticky',
        pt: 2,
        pb: 2,
        zIndex: theme.zIndex.appBar,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <Stack direction="row" spacing={2} id="main-content">
          <ReviewDate />
          <HierarchySelection size="small" limitTags={2} />
          <TreeSearch />
        </Stack>
        <IfAdmin>
          <NodeViewControl
            node={node}
            selectedDay={selectedDay}
            selectedHierarchies={hierarchies}
          />
        </IfAdmin>
      </Stack>
    </Paper>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchSelectableHierarchies: () => dispatch(fetchSelectableHierarchies()),
});

export default connect(null, mapDispatchToProps)(Hierarchy);
