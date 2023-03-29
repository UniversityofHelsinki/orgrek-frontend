import React from 'react';
import EditableAccordion from '../EditableAccordion';
import { useTranslation } from 'react-i18next';
import AttributesTable from '../attributes/AttributesTable';
import { codeAttributes as codes } from '../../constants/variables';
import useAttributes from '../../hooks/useAttributes';
import Validity from '../attributes/Validity';
import Placeholder from '../Placeholder';
import EditableContent from '../EditableContent';
import CodeAttributesEditor from './CodeAttributesEditor';
import { useGetAttributeKeysQuery } from '../../store';
import { useSelector } from 'react-redux';
import { authActions } from '../../auth';

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
    startDate: null,
    endDate: null,
  }));
  const missingIncluded = { ...attributes };
  missingAttributes.forEach((attribute) => {
    missingIncluded[attribute.key] = [attribute];
  });
  return missingIncluded;
};

const CodeAttributesSection = () => {
  const { t } = useTranslation();
  const { codeAttributes } = useAttributes();
  const selectedHierarchies = useSelector(
    (s) => s.tree.selectedHierarchy || s.tree.defaultHierarchy
  );
  const { data, isFetching } = useGetAttributeKeysQuery(selectedHierarchies);
  const attributeKeys = data;

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

  const byCodesAndDates = (a, b) => {
    if (a.key === b.key) {
      if (!a.startDate && !a.endDate) {
        return -1;
      }
      if (!b.startDate && !b.endDate) {
        return 1;
      }
      if (b.endDate && a.startDate) {
        return new Date(b.endDate) - new Date(a.startDate);
      }
      return new Date(a.startDate) - new Date(b.startDate);
    }
    const aOrder = codes.findIndex((key) => key === a.key);
    const bOrder = codes.findIndex((key) => key === b.key);
    if (aOrder < bOrder) {
      return -1;
    } else if (aOrder > bOrder) {
      return 1;
    }
    return 0;
  };

  const sortedCodeAttributes = [...codeAttributes].sort(byCodesAndDates);
  const title = t('codes');
  const empty = sortedCodeAttributes.length === 0;

  if (isFetching || !attributeKeys) {
    return <></>;
  }

  return (
    <EditableAccordion title={title}>
      <Placeholder
        empty={empty}
        placeholder={t('nodeDetailsSection.noAttributes')}
      >
        <EditableContent
          editorComponent={<CodeAttributesEditor />}
          initialValues={includeMissing(
            toFormValues(withoutUniqueID(sortedCodeAttributes)),
            attributeKeys
          )}
          // TODO: change to use validation from validations.js
          validate={(o) => {}}
          onSubmit={(o) => Promise.resolve(o)}
          authActions={authActions.codeAttributes}
        >
          <AttributesTable
            columns={columns}
            data={sortedCodeAttributes}
            summary={title}
          />
        </EditableContent>
      </Placeholder>
    </EditableAccordion>
  );
};

export default CodeAttributesSection;
