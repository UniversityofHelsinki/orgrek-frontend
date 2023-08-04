import React from 'react';
import EditableAccordion from '../EditableAccordion';
import { useTranslation } from 'react-i18next';
import AttributesTable from '../attributes/AttributesTable';
import Validity from '../attributes/Validity';
import NameEditor from './NameEditor';
import EditableContent from '../EditableContent';
import Placeholder from '../Placeholder';
import { useNodeId } from '../../hooks/useNodeId';
import { useSaveNameAttributesMutation } from '../../store';
import useFilterAttributesByDate from '../../hooks/useFilterAttributesByDate';
import { nameAttributeSchema } from '../../utils/validations';
import { authActions } from '../../auth';
import { flattenAttributes, toFormValues } from '../../utils/attributeUtils';
import { attributeLangCodes } from '../../Constants';
import useAttributes from '../../hooks/useAttributes';

const NameSection = ({ showHistory, showFuture }) => {
  const { t } = useTranslation();
  const nodeId = useNodeId();
  const { data: names, isFetching, error } = useAttributes('names');
  const [saveNameAttributes] = useSaveNameAttributesMutation();

  // In view mode filter history and future depending on selection
  const visibleNames = useFilterAttributesByDate(
    names,
    showHistory,
    showFuture
  );

  if (isFetching) {
    return <></>;
  }

  const formValues = toFormValues(
    names.filter((n) => !n.isNew),
    names.filter((n) => n.isNew).map((n) => n.key)
  );
  const keys = Object.keys(formValues);

  // Validates form values every time when the values change
  // Submit button is disabled when validation fails
  const validationSchema = nameAttributeSchema(keys);

  const handleSubmit = (input) => {
    const attributes = flattenAttributes(input);
    return saveNameAttributes({ attributes, nodeId }).unwrap();
  };

  const columns = [
    { label: t('text_language_header'), render: (item) => t(item.key) },
    {
      label: t('name'),
      render: (item) => (
        <span lang={attributeLangCodes[item.key]}>{item.value}</span>
      ),
    },
    {
      label: t('valid_dates'),
      render: (item) => (
        <Validity startDate={item.startDate} endDate={item.endDate} />
      ),
    },
  ];

  const title = t('name_info');
  const empty = visibleNames.length === 0;

  const renderedContent = (
    <AttributesTable columns={columns} data={visibleNames} summary={title} />
  );

  return (
    <EditableAccordion
      title={title}
      loading={isFetching}
      defaultExpanded={!empty}
    >
      <EditableContent
        editorComponent={<NameEditor keys={keys} />}
        validationSchema={validationSchema}
        initialValues={formValues}
        onSubmit={handleSubmit}
        successMessage={t('nameInfo.saveSuccess')}
        errorMessage={t('nameInfo.saveError')}
        authActions={authActions.nameAttributes}
      >
        <Placeholder empty={empty} placeholder={t('nameInfo.empty')}>
          {renderedContent}
        </Placeholder>
      </EditableContent>
    </EditableAccordion>
  );
};

export default NameSection;
