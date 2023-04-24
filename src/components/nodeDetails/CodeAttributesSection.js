import React from 'react';
import EditableAccordion from '../EditableAccordion';
import { useTranslation } from 'react-i18next';
import AttributesTable from '../attributes/AttributesTable';
import Validity from '../attributes/Validity';
import Placeholder from '../Placeholder';
import EditableContent from '../EditableContent';
import CodeAttributesEditor from './CodeAttributesEditor';
import {
  useGetAttributeKeysQuery,
  useSaveCodeAttributesMutation,
} from '../../store';
import { useSelector } from 'react-redux';
import { authActions } from '../../auth';
import { useNodeId } from '../../hooks/useNodeId';
import { useCodeAttributes } from '../../hooks/useCodeAttributes';
import useFilterAttributesByDate from '../../hooks/useFilterAttributesByDate';
import { defaultSchemaForAttributes } from '../../utils/validations';
import { flattenAttributes, toFormValues } from '../../utils/attributeUtils';

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

const includeMissing = (attributes, allKeys) => {
  const missingKeys = allKeys.filter((key) => !attributes[key]);
  const missingIncluded = { ...attributes };
  missingKeys.forEach((key) => {
    missingIncluded[key] = [];
  });
  return missingIncluded;
};

const filterExcess = (attributes, allKeys) => {
  return attributes.filter((attribute) => {
    return allKeys.includes(attribute.key) || attribute.key === 'unique_id';
  });
};

const withoutReadOnlyFields = (attributes, readOnlyFieldKeys) => {
  return attributes.filter((attribute) => {
    return !readOnlyFieldKeys.includes(attribute.key);
  });
};

const CodeAttributesSection = () => {
  const { t } = useTranslation();
  const nodeId = useNodeId();
  const { codeAttributes, isFetching } = useCodeAttributes();
  const selectedHierarchies = useSelector(
    (s) => s.tree.selectedHierarchy || s.tree.defaultHierarchy
  );
  const presentCodeAttributes = useFilterAttributesByDate(codeAttributes);
  const { data: attributeKeys, isFetching: isFetchingKeys } =
    useGetAttributeKeysQuery(selectedHierarchies);
  const [saveCodeAttributes] = useSaveCodeAttributesMutation();

  const readOnlyFieldKeys = ['unique_id'];

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
  const empty = codeAttributes.length === 0;

  if (isFetching || isFetchingKeys) {
    return <EditableAccordion title={title} loading />;
  }

  const initialValues = includeMissing(
    toFormValues(
      withoutReadOnlyFields(
        filterExcess(codeAttributes, attributeKeys),
        readOnlyFieldKeys
      )
    ),
    attributeKeys
  );

  // Validates form values every time when the values change
  // Submit button is disabled when validation fails
  const validationSchema = defaultSchemaForAttributes(
    Object.keys(initialValues)
  );

  const handleSubmit = (input) => {
    const attributes = flattenAttributes(input);
    return saveCodeAttributes({ attributes, nodeId }).unwrap();
  };

  return (
    <EditableAccordion title={title}>
      <EditableContent
        editorComponent={
          <CodeAttributesEditor
            readOnlyFields={readOnlyFields(codeAttributes, readOnlyFieldKeys)}
          />
        }
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        successMessage={t('codeInfo.saveSuccess')}
        errorMessage={t('codeInfo.saveError')}
        authActions={authActions.codeAttributes}
      >
        <Placeholder empty={empty} placeholder={t('codeInfo.empty')}>
          <AttributesTable
            columns={columns}
            data={filterExcess(presentCodeAttributes, attributeKeys)}
            summary={title}
          />
        </Placeholder>
      </EditableContent>
    </EditableAccordion>
  );
};

export default CodeAttributesSection;
