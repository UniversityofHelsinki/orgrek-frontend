import React from 'react';
import NodeValiditySection from './NodeValiditySection';
import NameSection from './NameSection';
import CodeAttributesSection from './CodeAttributesSection';
import UnitTypeSection from './UnitTypeSection';
import ParentsSection from './ParentsSection';
import ChildrenSection from './ChildrenSection';
import PredecessorsSection from './PredecessorsSection';
import SuccessorsSection from './SuccessorsSection';
import OtherAttributesSection from './OtherAttributesSection';
import Typography from '@mui/material/Typography';
import IfAdmin from '../../auth/IfAdmin';
//import useFavorableName from '../../hooks/useFavorableName';
//import useFetchNodeDetails from '../../hooks/useFetchNodeDetails';
import Box from '@mui/material/Box';
import useFetchNode from '../../hooks/useFetchNode';
import { useNodeId } from '../../hooks/useNodeId';
import { useMediaQuery, useTheme } from '@mui/material';
import useFilterAttributesByDate from '../../hooks/useFilterAttributesByDate';
import useAttributes from '../../hooks/useAttributes';
import { useTranslation } from 'react-i18next';
import { useGetNodeValidityQuery } from '../../store';

const NodeDetails = ({ showHistory, showFuture }) => {
  const { t, i18n } = useTranslation();
  const nodeId = useNodeId();
  const { data: names, isFetching, error } = useAttributes('names');
  const { data } = useGetNodeValidityQuery(nodeId);
  const node = data || {};
  const currentLanguage = i18n.language;
  // In view mode filter history and future depending on selection
  const visibleNames = useFilterAttributesByDate(
    names,
    showHistory,
    showFuture
  );
  const selectedTitle = visibleNames
    .map((elem) => {
      return { ...elem };
    })
    .filter((wantedElem) => {
      return wantedElem.key === 'name_' + currentLanguage;
    });
  let title = '';
  selectedTitle.length > 0
    ? (title = selectedTitle[0].value)
    : (title = node.name);
  //const title = useFavorableName(nodeId);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

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
      <Typography
        variant="h2"
        component="h2"
        mt={5}
        mb={5}
        sx={{
          position: 'sticky',
          bgcolor: 'white',
          top: isDesktop ? 70 : 120,
          alignSelf: 'flex-start',
          pb: 3,
          zIndex: 30,
          marginTop: 0,
          marginBottom: 0,
        }}
      >
        {title}
      </Typography>
      <NodeValiditySection />
      <NameSection showHistory={showHistory} showFuture={showFuture} />
      {/*  <DisplayNameSection showHistory={showHistory} showFuture={showFuture} />  */}
      <CodeAttributesSection
        showHistory={showHistory}
        showFuture={showFuture}
      />
      <UnitTypeSection showHistory={showHistory} showFuture={showFuture} />
      <ParentsSection showHistory={showHistory} showFuture={showFuture} />
      <ChildrenSection showHistory={showHistory} showFuture={showFuture} />
      <PredecessorsSection />
      <SuccessorsSection />
      <OtherAttributesSection
        showHistory={showHistory}
        showFuture={showFuture}
      />
    </Box>
  );
};

export default NodeDetails;
