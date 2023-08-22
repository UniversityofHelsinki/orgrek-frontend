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
import useSuccessors from '../../hooks/useSuccessors';

const SuccessorsSection = () => {
  const { t } = useTranslation();
  const nodeId = useNodeId();
  const language = useContentLanguage();
  const languageField = language === 'ia' ? 'fi' : language;
  const { successors, isFetching } = useSuccessors();
  const [saveSuccessors] = useSaveSuccessorsMutation();
  const contentLanguage = useContentLanguage();

  if (isFetching) {
    return <></>;
  }

  const handleSubmit = (values) => {
    const successors = Object.values(values)
      .flat()
      .filter((value) => !value.deleted || !value.isNew)
      .map((value) => asEdge(value));
    return saveSuccessors({ successors, nodeId }).unwrap();
  };

  const asAttribute = (successor) => ({
    id: successor.edges[0].id,
    key: successor.node.names[languageField],
    value: {
      id: successor.node.uniqueId,
      name: successor.node.name,
      names: successor.node.names,
    },
    nodeStartDate: successor.node.startDate,
    nodeEndDate: successor.node.endDate,
    startDate: successor.edges[0].startDate,
    endDate: successor.edges[0].endDate,
    isNew: Boolean(successor.isNew),
    deleted: Boolean(successor.deleted),
  });

  const asEdge = (value) => ({
    id: value.id,
    parentUniqueId: nodeId,
    childUniqueId: value.value?.id,
    startDate: value.startDate,
    endDate: null,
    isNew: value.isNew,
    deleted: value.deleted,
    hierarchy: successorHierarchy,
  });
  const columns = [
    {
      label: t('name'),
      render: (item) => <Link node={item.value.id}>{item.key}</Link>,
    },
    {
      label: t('valid_dates'),
      render: (item) => (
        <Validity startDate={item.nodeStartDate} endDate={item.nodeEndDate} />
      ),
    },
    {
      label: t('successor_edge_valid'),
      render: (item) => (
        <Validity startDate={item.startDate} endDate={item.endDate} />
      ),
    },
  ];

  const title = t('successors.title');
  const empty = successors.length === 0;

  const asAttributes = successors.map((successor) => asAttribute(successor));

  const renderedContent = (
    <AttributesTable columns={columns} data={asAttributes} caption={title} />
  );

  const emptyInitialValues = { new_successor: [] };

  const initialValues =
    successors.length > 0 ? toFormValues(asAttributes) : emptyInitialValues;
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
