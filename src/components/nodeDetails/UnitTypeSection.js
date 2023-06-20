import React from 'react';
import EditableAccordion from '../EditableAccordion';
import { useTranslation } from 'react-i18next';
import AttributesTable from '../attributes/AttributesTable';
import Placeholder from '../Placeholder';
import EditableContent from '../EditableContent';
import UnitTypeEditor from './UnitTypeEditor';
import {
  useGetAttributeKeysBySectionQuery,
  useGetTypeAttributesQuery,
  useSaveTypeAttributesMutation,
} from '../../store';
import { useNodeId } from '../../hooks/useNodeId';
import useSortAttributesByDate from '../../hooks/useSortAttributesByDate';
import { authActions } from '../../auth';
import { defaultSchemaForAttributes } from '../../utils/validations';
import useFilterAttributesByDate from '../../hooks/useFilterAttributesByDate';
import useUnitTypeOptions from '../../hooks/useUnitTypeOptions';

const UnitTypeSection = () => {
  const { t } = useTranslation();
  const nodeId = useNodeId();
  const { data: keysData, isFetching: isFetchingKeys } =
    useGetAttributeKeysBySectionQuery('types');
  const { unitTypeOptions, isFetching: isFetchingSelectable } =
    useUnitTypeOptions();
  const { data, isFetching } = useGetTypeAttributesQuery(nodeId);
  const [saveTypeAttributes] = useSaveTypeAttributesMutation();

  const loading = isFetching || isFetchingKeys || isFetchingSelectable;
  const keys = (keysData || []).map((key) => key.attr);

  // In edit mode data includes also history and future
  const sortedData = useSortAttributesByDate(data);

  // In view mode filter history and future depending on selection
  const sortedAndFilteredData = useFilterAttributesByDate(sortedData);

  const toFormValues = (data) => {
    const foundTypes = [];
    data.forEach((value) => {
      unitTypeOptions.forEach((o) => {
        if (o.value === value.value) {
          foundTypes.push(value);
        }
      });
    });
    return { type: [...foundTypes] };
  };

  const { type } = toFormValues(sortedAndFilteredData);

  // Validates form values every time when the values change
  // Submit button is disabled when validation fails
  const validationSchema = defaultSchemaForAttributes(keys);

  const ObjetToArray = (obj) => Object.assign([], Object.values(obj));

  const handleSubmit = (values) => {
    const valuesArray = ObjetToArray(values.type);
    return saveTypeAttributes({ valuesArray, nodeId }).unwrap();
  };

  const title = t('unit_type');
  const empty = type.length === 0;

  return (
    <EditableAccordion title={title} loading={loading} defaultExpanded={!empty}>
      <EditableContent
        editorComponent={<UnitTypeEditor keys={keys} />}
        validationSchema={validationSchema}
        initialValues={toFormValues(sortedData)}
        onSubmit={handleSubmit}
        successMessage={t('typeInfo.saveSuccess')}
        errorMessage={t('typeInfo.saveError')}
        authActions={authActions.unitType}
      >
        <Placeholder empty={empty} placeholder={t('typeInfo.empty')}>
          <AttributesTable data={[...type]} summary={title} />
        </Placeholder>
      </EditableContent>
    </EditableAccordion>
  );
};

export default UnitTypeSection;
