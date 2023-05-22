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
import { useSaveNodeOtherAttributesMutation } from '../../store';

const OtherAttributesSection = () => {
  const { t } = useTranslation();
  const nodeId = useNodeId();
  const { nodeOtherAttributes, isFetching } = useOtherAttributes();
  const initialValues = toFormValues(nodeOtherAttributes);
  const [saveOtherAttributes] = useSaveNodeOtherAttributesMutation();

  // In view mode filter history and future depending on selection
  const sortedAndFilteredData = useFilterAttributesByDate(nodeOtherAttributes);

  const title = t('other_attributes');
  const empty = nodeOtherAttributes.length === 0;

  if (isFetching) {
    return <EditableAccordion title={title} loading />;
  }

  const asAttribute = (nodeId) => (otherAttr) => ({
    id: otherAttr.id,
    key: otherAttr.key,
    nodeId: nodeId,
    value: otherAttr.value,
    startDate: otherAttr.startDate,
    endDate: otherAttr.endDate,
    isNew: Boolean(otherAttr.new),
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
