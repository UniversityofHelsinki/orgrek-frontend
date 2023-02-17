import React from 'react';
import { useSelector } from 'react-redux';
import EditButtons from '../EditButtons';
import NodeValiditySection from './NodeValiditySection';
import NameSection from './NameSection';
import DisplayNameSection from './DisplayNameSection';
import CodesetSection from './CodesetSection';
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

const NodeDetails = () => {
  const editMode = useSelector((state) => state.editModeReducer.edit);
  useFetchNodeDetails();
  const title = useFavorableName();

  // Temporarily use legacy NodeDetails as edit view until it can be removed
  if (editMode) {
    return <NodeDetails />;
  }

  return (
    <div>
      <IfAdmin>
        <EditButtons modifiedParents={[]} />
      </IfAdmin>
      <main className="right-side">
        <Typography variant="h1" component="h2" mt={5} mb={5}>
          {title}
        </Typography>
        <NodeValiditySection />
        <NameSection />
        <DisplayNameSection />
        <CodesetSection />
        <UnitTypeSection />
        <ParentsSection />
        <ChildrenSection />
        <PredecessorsSection />
        <SuccessorsSection />
        <OtherAttributesSection />
      </main>
    </div>
  );
};

export default NodeDetails;
