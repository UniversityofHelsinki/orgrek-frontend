import React from 'react';
import EditableAccordion from '../EditableAccordion';
import { useTranslation } from 'react-i18next';
import AttributesTable from '../attributes/AttributesTable';
import Placeholder from '../Placeholder';
import { authActions } from '../../auth';
import EditableContent from '../EditableContent';
import OtherAttributesEditor from './OtherAttributesEditor';
import { toFormValues } from '../../utils/attributeUtils';
import { useOtherAttributes } from '../../hooks/useOtherAttributes';
import useFilterAttributesByDate from '../../hooks/useFilterAttributesByDate';
import { useNodeId } from '../../hooks/useNodeId';
import {
  useGetAttributeKeysQuery,
  useSaveNodeOtherAttributesMutation,
} from '../../store';
import { defaultSchemaForAttributes } from '../../utils/validations';
import { useSelector } from 'react-redux';

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

const OtherAttributesSection = () => {
  const { t } = useTranslation();
  const nodeId = useNodeId();
  const { nodeOtherAttributes, isFetching } = useOtherAttributes();
  const [saveOtherAttributes] = useSaveNodeOtherAttributesMutation();
  const selectedHierarchies = useSelector(
    (s) => s.tree.selectedHierarchy || s.tree.defaultHierarchy
  );
  const { data: attributeKeys, isFetching: isFetchingKeys } =
    useGetAttributeKeysQuery({
      selectedHierarchies,
      sections: ['other_attributes'],
    });
  // In view mode filter history and future depending on selection
  const sortedAndFilteredData = useFilterAttributesByDate(nodeOtherAttributes);

  const title = t('other_attributes');
  const empty = nodeOtherAttributes.length === 0;

  if (isFetching) {
    return <EditableAccordion title={title} loading />;
  }

  const initialValues = includeMissing(
    toFormValues(filterExcess(nodeOtherAttributes, attributeKeys)),
    attributeKeys
  );

  // Validates form values every time when the values change
  // Submit button is disabled when validation fails
  const validationSchema = defaultSchemaForAttributes(
    Object.keys(initialValues)
  );

  const asAttribute = (nodeId) => (otherAttr) => ({
    id: otherAttr.id,
    key: otherAttr.key,
    nodeId: nodeId,
    value: otherAttr.value,
    startDate: otherAttr.startDate,
    endDate: otherAttr.endDate,
    isNew: Boolean(otherAttr.isNew),
    deleted: Boolean(otherAttr.deleted),
  });

  const handleSubmit = (values) => {
    const valuesArray = Object.values(values).flat().map(asAttribute(nodeId));
    return saveOtherAttributes({ valuesArray, nodeId }).unwrap();
  };

  return (
    <EditableAccordion
      title={title}
      loading={isFetching}
      defaultExpanded={!empty}
    >
      <EditableContent
        editorComponent={<OtherAttributesEditor />}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        successMessage={t('typeInfo.saveSuccess')}
        errorMessage={t('typeInfo.saveError')}
        authActions={authActions.otherAttributes}
      >
        <Placeholder
          empty={empty}
          placeholder={t('nodeDetailsSection.noAttributes')}
        >
          <AttributesTable data={sortedAndFilteredData} summary={title} />
        </Placeholder>
      </EditableContent>
    </EditableAccordion>
  );
};

export default OtherAttributesSection;
