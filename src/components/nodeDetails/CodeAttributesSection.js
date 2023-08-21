import React from 'react';
import EditableAccordion from '../EditableAccordion';
import { useTranslation } from 'react-i18next';
import AttributesTable from '../attributes/AttributesTable';
import Validity from '../attributes/Validity';
import Placeholder from '../Placeholder';
import EditableContent from '../EditableContent';
import CodeAttributesEditor from './CodeAttributesEditor';
import { useSaveCodeAttributesMutation } from '../../store';
import { authActions } from '../../auth';
import { useNodeId } from '../../hooks/useNodeId';
import useFilterAttributesByDate from '../../hooks/useFilterAttributesByDate';
import { defaultSchemaForAttributes } from '../../utils/validations';
import { flattenAttributes, toFormValues } from '../../utils/attributeUtils';
import useAttributes from '../../hooks/useAttributes';

const readOnlyFields = (attributes, keys) => {
  const result = {};
  attributes.forEach((attribute) => {
    if (keys.includes(attribute.key)) {
      if (!result[attribute.key]) {
        result[attribute.key] = [attribute];
      } else {
        result[attribute.key] = [...result[attribute.key], attribute];
      }
    }
  });
  return result;
};

const CodeAttributesSection = ({ showHistory, showFuture }) => {
  const { t } = useTranslation();
  const nodeId = useNodeId();
  const { data, isFetching } = useAttributes('codes');

  const uniqueId = {
    id: Math.floor(Math.random() * -100000),
    key: 'unique_id',
    value: nodeId,
    startDate: null,
    endDate: null,
  };
  const codeAttributes = [uniqueId, ...data];
  const withoutUniqueID = [...data];

  const visibleAttributes = useFilterAttributesByDate(
    codeAttributes,
    showHistory,
    showFuture
  );
  const [saveCodeAttributes] = useSaveCodeAttributesMutation();

  const readOnlyFieldKeys = ['unique_id'];

  const formValues = toFormValues(
    codeAttributes
      .filter((ca) => !ca.isNew)
      .filter((ca) => !readOnlyFieldKeys.includes(ca.key)),
    codeAttributes.filter((ca) => ca.isNew).map((ca) => ca.key)
  );
  const keys = Object.keys(formValues);

  const columns = [
    { label: t('code_namespace'), render: (item) => t(item.key) },
    { label: t('value'), render: (item) => item.value },
    {
      label: t('valid_dates'),
      render: (item) => (
        <Validity startDate={item.startDate} endDate={item.endDate} />
      ),
    },
  ];
  const title = t('codes');
  const empty = codeAttributes.filter((ca) => !ca.isNew).length === 0;

  if (isFetching) {
    return <EditableAccordion title={title} loading />;
  }

  // Validates form values every time when the values change
  // Submit button is disabled when validation fails
  const validationSchema = defaultSchemaForAttributes(keys);

  const handleSubmit = (input) => {
    const attributes = flattenAttributes(input);
    return saveCodeAttributes({ attributes, nodeId }).unwrap();
  };

  return (
    <EditableAccordion title={title}>
      <EditableContent
        editorComponent={
          <CodeAttributesEditor
            readOnlyFields={readOnlyFields(
              visibleAttributes,
              readOnlyFieldKeys
            )}
            keys={withoutUniqueID
              .map((ca) => ca.key)
              .filter((ca, i, all) => all.indexOf(ca) === i)}
          />
        }
        initialValues={formValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        successMessage={t('codeInfo.saveSuccess')}
        errorMessage={t('codeInfo.saveError')}
        authActions={authActions.codeAttributes}
      >
        <Placeholder empty={empty} placeholder={t('codeInfo.empty')}>
          <AttributesTable
            columns={columns}
            data={visibleAttributes}
            summary={title}
          />
        </Placeholder>
      </EditableContent>
    </EditableAccordion>
  );
};

export default CodeAttributesSection;
