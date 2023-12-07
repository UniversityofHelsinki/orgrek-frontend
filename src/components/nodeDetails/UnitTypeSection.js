import React from 'react';
import EditableAccordion from '../EditableAccordion';
import { useTranslation } from 'react-i18next';
import AttributesTable from '../attributes/AttributesTable';
import Placeholder from '../Placeholder';
import EditableContent from '../EditableContent';
import UnitTypeEditor from './UnitTypeEditor';
import {
  useGetTypeAttributesQuery,
  useSaveTypeAttributesMutation,
} from '../../store';
import { useNodeId } from '../../hooks/useNodeId';
import { authActions } from '../../auth';
import { defaultSchemaForAttributes } from '../../utils/validations';
import useFilterAttributesByDate from '../../hooks/useFilterAttributesByDate';
import useSelectedDate from '../../hooks/useSelectedDate';
import useHierarchies from '../../hooks/useHierarchies';
import { toFormValues } from '../../utils/attributeUtils';
import useAttributes from '../../hooks/useAttributes';

const UnitTypeSection = ({ showHistory, showFuture }) => {
  const { t } = useTranslation();
  const nodeId = useNodeId();
  const { data: types, isFetching } = useAttributes('types');
  const [saveTypeAttributes] = useSaveTypeAttributesMutation();

  const loading = isFetching;

  // In view mode filter history and future depending on selection
  const visibleTypes = useFilterAttributesByDate(
    types,
    showHistory,
    showFuture
  );

  const formValues = toFormValues(
    types.filter((t) => !t.isNew),
    types.filter((t) => t.isNew).map((t) => t.key)
  );

  const keys = Object.keys(formValues);
  const metas = types.reduce((accumulated, current) => {
    accumulated[current.key] = current.meta;
    return accumulated;
  }, {});

  // Validates form values every time when the values change
  // Submit button is disabled when validation fails
  const validationSchema = defaultSchemaForAttributes(keys);

  const handleSubmit = (values) => {
    return saveTypeAttributes({
      valuesArray: Object.values(values).flat(),
      nodeId,
    }).unwrap();
  };

  const title = t('unit_type');
  const empty = visibleTypes.length === 0;

  return (
    <EditableAccordion title={title} loading={loading} defaultExpanded={!empty}>
      <EditableContent
        editorComponent={<UnitTypeEditor metas={metas} />}
        validationSchema={validationSchema}
        initialValues={formValues}
        onSubmit={handleSubmit}
        successMessage={t('typeInfo.saveSuccess')}
        errorMessage={t('typeInfo.saveError')}
        authActions={authActions.unitType}
      >
        <Placeholder empty={empty} placeholder={t('typeInfo.empty')}>
          <AttributesTable data={visibleTypes} caption={title} />
        </Placeholder>
      </EditableContent>
    </EditableAccordion>
  );
};

export default UnitTypeSection;
