import React from 'react';
import Validity from '../attributes/Validity';
import EditableAccordion from '../EditableAccordion';
import { useTranslation } from 'react-i18next';
import Placeholder from '../Placeholder';
import EditableContent from '../EditableContent';
import { authActions } from '../../auth';
import NodeValidityEditor from './NodeValidityEditor';
import { nodeValiditySchema } from '../../utils/validations';
import {
  useGetNodeValidityQuery,
  useSaveNodeValidityMutation,
} from '../../store';
import { useNodeId } from '../../hooks/useNodeId';
import Box from '@mui/material/Box';

const NodeValiditySection = () => {
  const { t } = useTranslation();
  const nodeId = useNodeId();
  const { data, isFetching } = useGetNodeValidityQuery(nodeId);
  const [saveNodeValidity] = useSaveNodeValidityMutation();

  const node = data || {};
  const empty = !node.startDate && !node.endDate;
  const title = t('valid_dates');

  const handleSubmit = (values) => {
    return saveNodeValidity({ data: values, id: nodeId }).unwrap();
  };

  return (
    <EditableAccordion
      title={title}
      loading={isFetching}
      defaultExpanded={!empty}
    >
      <EditableContent
        editorComponent={<NodeValidityEditor />}
        containerProps={{ direction: 'row-reverse', alignItems: 'center' }}
        validationSchema={nodeValiditySchema}
        initialValues={node}
        onSubmit={handleSubmit}
        successMessage={t('nodeValidity.saveSuccess')}
        errorMessage={t('nodeValidity.saveError')}
        authActions={authActions.nodeValidity}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Placeholder empty={empty} placeholder={<Validity />}>
            <Validity startDate={node.startDate} endDate={node.endDate} />
          </Placeholder>
        </Box>
      </EditableContent>
    </EditableAccordion>
  );
};

export default NodeValiditySection;
