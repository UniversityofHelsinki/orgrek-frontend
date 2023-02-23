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

const NodeDetails = () => {
  useFetchNodeDetails();
  const title = useFavorableName();

  return (
    <div>
      <IfAdmin>
        <EditButtons modifiedParents={[]} />
      </IfAdmin>
      <Box component="main" pt={8} pb={8} overflow="scroll" maxHeight="100vh">
        <Typography variant="h1" component="h2" mb={5}>
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
