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

const NodeValiditySection = () => {
  const { t } = useTranslation();
  const nodeId = useNodeId();
  const { data: node, isFetching } = useGetNodeValidityQuery(nodeId);
  const saveNodeValidity = useSaveNodeValidityMutation();

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
        validationSchema={nodeValiditySchema}
        initialValues={node}
        onSubmit={handleSubmit}
        successMessage={t('nodeValidity.saveSuccess')}
        errorMessage={t('nodeValidity.saveError')}
        authActions={authActions.nodeValidity}
      >
        <Placeholder empty={empty} placeholder={<Validity />}>
          <Validity startDate={node.startDate} endDate={node.endDate} />
        </Placeholder>
      </EditableContent>
    </EditableAccordion>
  );
};

export default NodeValiditySection;
