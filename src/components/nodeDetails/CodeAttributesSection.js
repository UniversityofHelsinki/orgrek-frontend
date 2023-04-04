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
import { compareAndCheckDates, valueNotEmpty } from './Validations';

const toFormValues = (attributes) => {
  const byKey = {};
  attributes.forEach((attribute) => {
    if (!byKey[attribute.key]) {
      byKey[attribute.key] = [];
    }
    byKey[attribute.key].push(attribute);
  });
  return byKey;
};

const withoutUniqueID = (attributes) => {
  return attributes.filter((attribute) => attribute.key !== 'unique_id');
};

const includeMissing = (attributes, allKeys) => {
  const missingKeys = allKeys.filter((key) => !attributes[key]);
  const missingAttributes = missingKeys.map((key) => ({
    id: -1,
    key: key,
    value: '',
    startDate: null,
    endDate: null,
    isNew: true,
  }));
  const missingIncluded = { ...attributes };
  missingAttributes.forEach((attribute) => {
    missingIncluded[attribute.key] = [attribute];
  });
  return missingIncluded;
};

const filterExcess = (attributes, allKeys) => {
  return attributes.filter((attribute) => {
    return allKeys.includes(attribute.key) || attribute.key === 'unique_id';
  });
};

const CodeAttributesSection = () => {
  const { t } = useTranslation();
  const nodeId = useNodeId();
  const { codeAttributes } = useCodeAttributes();
  const selectedHierarchies = useSelector(
    (s) => s.tree.selectedHierarchy || s.tree.defaultHierarchy
  );
  const presentCodeAttributes = useFilterAttributesByDate(codeAttributes);
  const { data, isFetching } = useGetAttributeKeysQuery(selectedHierarchies);
  const attributeKeys = data;

  const [saveCodeAttributes] = useSaveCodeAttributesMutation();

  if (isFetching || !attributeKeys) {
    return <></>;
  }

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
  const validate = (values) => {
    const all = Object.values(values).flat();
    return {
      ...compareAndCheckDates(all),
      ...valueNotEmpty(all),
    };
  };
  const title = t('codes');
  const empty = codeAttributes.length === 0;

  const handleSubmit = (input) => {
    const attributes = Object.values(input).flat();
    const sanitized = attributes.filter((a) => !(a.isNew && a.deleted));
    return saveCodeAttributes({ attributes: sanitized, nodeId }).unwrap();
  };

  return (
    <EditableAccordion title={title}>
      <EditableContent
        editorComponent={<CodeAttributesEditor />}
        initialValues={includeMissing(
          toFormValues(
            withoutUniqueID(filterExcess(codeAttributes, attributeKeys))
          ),
          attributeKeys
        )}
        validate={validate}
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
