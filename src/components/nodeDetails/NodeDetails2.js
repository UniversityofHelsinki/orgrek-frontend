import React from 'react';
import EditButtons from '../EditButtons';
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
import IfAdmin from '../auth/IfAdmin';
import useFavorableName from '../../hooks/useFavorableName';
import useFetchNodeDetails from '../../hooks/useFetchNodeDetails';
import Box from '@mui/material/Box';
import useFetchNode from '../../hooks/useFetchNode';

const NodeDetails = () => {
  const node = useFetchNode();
  useFetchNodeDetails();
  const title = useFavorableName();

  if (!node) {
    return null;
  }

  return (
    <div>
      <IfAdmin>
        <EditButtons />
      </IfAdmin>
      <Box
        key={node.uniqueId}
        component="main"
        sx={{
          pl: { xs: 1, md: 4 },
          pr: { xs: 1, md: 4 },
          pb: 8,
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
    </div>
  );
};

export default NodeDetails;
