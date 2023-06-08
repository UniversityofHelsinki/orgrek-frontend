import React from 'react';
import EditableAccordion from '../EditableAccordion';
import { useTranslation } from 'react-i18next';
import Placeholder from '../Placeholder';
import EditableContent from '../EditableContent';
import { useGetSuccessorsQuery, useSaveSuccessorsMutation } from '../../store';
import { useNodeId } from '../../hooks/useNodeId';
import { authActions } from '../../auth';
import SuccessorEditor from './SuccessorEditor';
import { successorsSchema } from '../../utils/validations';
import Validity from '../attributes/Validity';
import AttributesTable from '../attributes/AttributesTable';
import useContentLanguage from '../../hooks/useContentLanguage';
import Link from '../Link';
import { successorHierarchy } from '../../Constants';
import { toFormValues } from '../../utils/attributeUtils';

const SuccessorsSection = () => {
  const { t } = useTranslation();
  const nodeId = useNodeId();
  const { data, isFetching } = useGetSuccessorsQuery(nodeId);
  const [saveSuccessors] = useSaveSuccessorsMutation();
  const contentLanguage = useContentLanguage();

  const handleSubmit = (values) => {
    const successors = Object.values(values)
      .flat()
      .map((value) => asEdge(value));
    return saveSuccessors({ successors, nodeId }).unwrap();
  };

  const asAttribute = (successor) => ({
    id: successor.edgeId,
    key: successor.fullName,
    value: { id: successor.uniqueId, name: successor.fullName },
    nodeStartDate: successor.startDate,
    nodeEndDate: successor.endDate,
    startDate: successor.edgeStartDate,
    endDate: null,
    isNew: Boolean(successor.isNew),
    deleted: Boolean(successor.deleted),
  });

  const asEdge = (value) => ({
    id: value.id,
    parentUniqueId: value.value.id,
    childUniqueId: nodeId,
    startDate: value.startDate,
    endDate: null,
    isNew: value.isNew,
    deleted: value.deleted,
    hierarchy: successorHierarchy,
  });
  const columns = [
    {
      label: t('name'),
      render: (item) => <Link node={item.uniqueId}>{item.fullName}</Link>,
    },
    {
      label: t('valid_dates'),
      render: (item) => (
        <Validity startDate={item.startDate} endDate={item.endDate} />
      ),
    },
    {
      label: t('successor_edge_valid'),
      render: (item) => (
        <Validity startDate={item.edgeStartDate} endDate={item.edgeEndDate} />
      ),
    },
  ];

  const successorsData = (data && data[contentLanguage]) || [];
  const title = t('successors.title');
  const empty = successorsData.length === 0;

  const renderedContent = (
    <AttributesTable columns={columns} data={successorsData} summary={title} />
  );

  const initialValues = toFormValues(
    successorsData.map((successor) => asAttribute(successor))
  );
  return (
    <EditableAccordion
      title={title}
      loading={isFetching}
      defaultExpanded={!empty}
    >
      <EditableContent
        editorComponent={<SuccessorEditor />}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        successMessage={t('successorInfo.saveSuccess')}
        errorMessage={t('successorInfo.saveError')}
        authActions={authActions.successors}
        validationSchema={successorsSchema(Object.keys(initialValues))}
      >
        <Placeholder empty={empty} placeholder={t('successors.empty')}>
          {renderedContent}
        </Placeholder>
      </EditableContent>
    </EditableAccordion>
  );
};

export default SuccessorsSection;
