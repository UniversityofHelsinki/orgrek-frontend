import React from 'react';
import EditableAccordion from '../EditableAccordion';
import { useTranslation } from 'react-i18next';
import AttributesTable from '../attributes/AttributesTable';
import Placeholder from '../Placeholder';
import { authActions } from '../../auth';
import EditableContent from '../EditableContent';
import OtherAttributesEditor from './OtherAttributesEditor';
import { toFormValues } from '../../utils/attributeUtils';
import useFilterAttributesByDate from '../../hooks/useFilterAttributesByDate';
import { useNodeId } from '../../hooks/useNodeId';
import { useSaveNodeOtherAttributesMutation } from '../../store';
import { defaultSchemaForAttributes } from '../../utils/validations';
import useAttributes from '../../hooks/useAttributes';

const OtherAttributesSection = ({ showHistory, showFuture }) => {
  const { t } = useTranslation();
  const nodeId = useNodeId();
  const { data: nodeOtherAttributes, isFetching } =
    useAttributes('other_attributes');
  const [saveOtherAttributes] = useSaveNodeOtherAttributesMutation();

  // In view mode filter history and future depending on selection
  const visibleAttributes = useFilterAttributesByDate(
    nodeOtherAttributes,
    showHistory,
    showFuture
  );

  const title = t('other_attributes');
  const empty = visibleAttributes.length === 0;

  if (isFetching) {
    return <EditableAccordion title={title} loading />;
  }

  const formValues = toFormValues(
    nodeOtherAttributes.filter((a) => !a.isNew),
    nodeOtherAttributes.filter((a) => a.isNew).map((a) => a.key)
  );
  const keys = Object.keys(formValues);

  const validationSchema = defaultSchemaForAttributes(keys);

  const metas = nodeOtherAttributes.reduce((accumulated, current) => {
    accumulated[current.key] = current.meta;
    return accumulated;
  }, {});

  const handleSubmit = (values) => {
    const valuesArray = Object.values(values).flat();
    return saveOtherAttributes({ valuesArray, nodeId }).unwrap();
  };

  return (
    <EditableAccordion
      title={title}
      loading={isFetching}
      defaultExpanded={!empty}
    >
      <EditableContent
        editorComponent={<OtherAttributesEditor metas={metas} />}
        initialValues={formValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        successMessage={t('otherAttributeInfo.saveSuccess')}
        errorMessage={t('otherAttributeInfo.saveError')}
        authActions={authActions.otherAttributes}
      >
        <Placeholder empty={empty} placeholder={t('otherAttributeInfo.empty')}>
          <AttributesTable data={visibleAttributes} summary={title} />
        </Placeholder>
      </EditableContent>
    </EditableAccordion>
  );
};

export default OtherAttributesSection;
