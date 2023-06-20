import React from 'react';
import NodeValiditySection from './NodeValiditySection';
import NameSection from './NameSection';
import DisplayNameSection from './DisplayNameSection';
import CodeAttributesSection from './CodeAttributesSection';
import UnitTypeSection from './UnitTypeSection';
import ParentsSection from './ParentsSection';
import ChildrenSection from './ChildrenSection';
import PredecessorsSection from './PredecessorsSection';
import SuccessorsSection from './SuccessorsSection';
import OtherAttributesSection from './OtherAttributesSection';
import Typography from '@mui/material/Typography';
import IfAdmin from '../../auth/IfAdmin';
import useFavorableName from '../../hooks/useFavorableName';
import useFetchNodeDetails from '../../hooks/useFetchNodeDetails';
import Box from '@mui/material/Box';
import useFetchNode from '../../hooks/useFetchNode';
import { useNodeId } from '../../hooks/useNodeId';

const NodeDetails = () => {
  const nodeId = useNodeId();
  const title = useFavorableName();

  // These legacy fetch hooks can be removed after everything has been migrated
  // to use RTK Query
  useFetchNode();
  useFetchNodeDetails();

  if (!nodeId) {
    return null;
  }

  return (
    <Box
      key={nodeId}
      component="main"
      sx={{
        pl: 4,
        pr: 4,
        pb: 8,
        flex: 1,
      }}
    >
      <Typography variant="h1" component="h2" mt={5} mb={5}>
        {title}
      </Typography>
      <NodeValiditySection />
      <NameSection />
      <DisplayNameSection />
      <CodeAttributesSection />
      <UnitTypeSection />
      <ParentsSection />
      <ChildrenSection />
      <PredecessorsSection />
      <SuccessorsSection />
      <OtherAttributesSection />
    </Box>
  );
};

export default NodeDetails;
