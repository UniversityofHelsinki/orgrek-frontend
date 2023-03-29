import React from 'react';
import EditableAccordion from '../EditableAccordion';
import { useTranslation } from 'react-i18next';
import AttributesTable from '../attributes/AttributesTable';
import Placeholder from '../Placeholder';
import EditableContent from '../EditableContent';
import UnitTypeEditor from './UnitTypeEditor';
import {
  useGetTypeAttributesQuery,
  useGetValidHierarchyFiltersQuery,
} from '../../store';
import { useNodeId } from '../../hooks/useNodeId';
import useSortAttributesByDate from '../../hooks/useSortAttributesByDate';
import { useSelector } from 'react-redux';
import fillSelectableUnits from '../../hooks/filterSelectableUnits';
import { authActions } from '../../auth';

const UnitTypeSection = () => {
  const { t } = useTranslation();
  const nodeId = useNodeId();
  const { data, error, isFetching } = useGetTypeAttributesQuery(nodeId);
  const {
    data: hierarchies,
    hierarchyerror,
    isFetchingHierarchy,
  } = useGetValidHierarchyFiltersQuery();
  const selectedHierarchies = useSelector(
    (state) => state.tree.selectedHierarchy
  );
  const selectableUnits = [];

  // In edit mode data includes also history and future
  const sortedData = useSortAttributesByDate(data);

  const title = t('unit_type');
  const empty = sortedData.length === 0;

  const toFormValues = (data) => {
    const foundTypes = [];
    fillSelectableUnits(selectableUnits, hierarchies, selectedHierarchies);
    data.forEach((value) => {
      selectableUnits.forEach((o) => {
        if (o.value === value.value) {
          foundTypes.push(value);
        }
      });
    });
    return { type: [...foundTypes] };
  };

  const { type } = toFormValues(sortedData);

  // TODO: show success snackbar when saveResult is completed
  // success message t('update_attributes_success')
  // TODO: show error snackbar if saveResult has error
  if (error) {
    // TODO: Fetching data failed, show error snackbar
  }
  // Validates form values every time when the values change
  // Submit button is disabled when errors contain any truthy values
  // EditableContent handles displaying form-level validation error messages
  const validate = (values) => {
    return {};
  };

  const handleSubmit = (values) => {};

  return (
    <EditableAccordion
      title={title}
      loading={isFetching}
      defaultExpanded={!empty}
    >
      <EditableContent
        editorComponent={<UnitTypeEditor />}
        validate={validate}
        initialValues={toFormValues(sortedData)}
        onSubmit={handleSubmit}
        authActions={authActions.unitType}
      >
        <Placeholder empty={empty} placeholder={t('unittype.empty')}>
          <AttributesTable data={[...type]} summary={title} />
        </Placeholder>
      </EditableContent>
    </EditableAccordion>
  );
};

export default UnitTypeSection;
