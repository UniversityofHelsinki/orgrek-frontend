import React from 'react';
import EditableAccordion from '../EditableAccordion';
import { useTranslation } from 'react-i18next';
import Placeholder from '../Placeholder';
import EditableContent from '../EditableContent';
import { useGetSuccessorsQuery, useSaveSuccessorsMutation } from '../../store';
import { useNodeId } from '../../hooks/useNodeId';
import { authActions } from '../../auth';
import SuccessorEditor from './SuccessorEditor';
import { nameAttributeSchema } from '../../utils/validations';
import Validity from '../attributes/Validity';
import AttributesTable from '../attributes/AttributesTable';
import useContentLanguage from '../../hooks/useContentLanguage';
import Link from '../Link';

const SuccessorsSection = () => {
  const { t } = useTranslation();
  const nodeId = useNodeId();
  const { data, isFetching } = useGetSuccessorsQuery(nodeId);
  const [saveSuccessors] = useSaveSuccessorsMutation();
  const contentLanguage = useContentLanguage();

  const key = 'successors';

  // Validates form values every time when the values change
  // Submit button is disabled when validation fails
  const validationSchema = nameAttributeSchema([key]);

  const handleSubmit = (values) => {
    const successors = values[key].map((value) => asSuccessor(value));
    console.log(values, successors);
    return Promise.resolve();
    // return saveSuccessors({ successors, nodeId }).unwrap();
  };

  const asAttribute = (successor) => ({
    id: parseInt(successor.edgeId),
    key: key,
    value: { id: successor.uniqueId, name: successor.fullName },
    nodeStartDate: successor.startDate,
    nodeEndDate: successor.endDate,
    startDate: successor.edgeStartDate,
    endDate: null,
    isNew: Boolean(successor.isNew),
    deleted: Boolean(successor.deleted),
  });

  const asSuccessor = (value) => ({
    edgeId: String(value.id),
    uniqueId: value.value.id,
    fullName: value.value.name,
    startDate: value.nodeStartDate,
    endDate: value.nodeEndDate,
    edgeStartDate: value.startDate,
    edgeEndDate: null,
    isNew: value.isNew,
    deleted: value.deleted,
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

  return (
    <EditableAccordion
      title={title}
      loading={isFetching}
      defaultExpanded={!empty}
    >
      <EditableContent
        editorComponent={<SuccessorEditor />}
        initialValues={{
          [key]: successorsData.map((successor) => asAttribute(successor)),
        }}
        onSubmit={handleSubmit}
        successMessage={t('successorInfo.saveSuccess')}
        errorMessage={t('successorInfo.saveError')}
        authActions={authActions.successors}
      >
        <Placeholder empty={empty} placeholder={t('successors.empty')}>
          {renderedContent}
        </Placeholder>
      </EditableContent>
    </EditableAccordion>
  );
};

export default SuccessorsSection;
