import React from 'react';
import EditableAccordion from '../EditableAccordion';
import { useTranslation } from 'react-i18next';
import AttributesTable from '../attributes/AttributesTable';
import Placeholder from '../Placeholder';
import EditableContent from '../EditableContent';
import { compareAndCheckDates, valueNotEmpty } from './validations';
import UnitTypeEditor from './UnitTypeEditor';
import { useGetTypeAttributesQuery } from '../../store';
import { useNodeId } from '../../hooks/useNodeId';
import useSortAttributesByDate from '../../hooks/useSortAttributesByDate';

const UnitTypeSection = () => {
  const { t } = useTranslation();
  const nodeId = useNodeId();
  const { data, error, isFetching } = useGetTypeAttributesQuery(nodeId);

  // In edit mode data includes also history and future
  const sortedData = useSortAttributesByDate(data);

  const title = t('unit_type');
  const empty = sortedData.length === 0;

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
    return {
      ...valueNotEmpty(values),
      ...compareAndCheckDates(values),
    };
  };

  const handleSubmit = (values) => {
    /*const combinedArrays = [
            ...values.nameEn,
            ...values.nameFi,
            ...values.nameSv,
        ];
        return saveNameAttributes({ combinedArrays, nodeId }).unwrap();*/
    //return saveXXX({ ...values.typeAttributes, nodeId }).unwrap();
  };

  return (
    <EditableAccordion
      title={title}
      loading={isFetching}
      defaultExpanded={!empty}
    >
      <EditableContent
        editorComponent={<UnitTypeEditor />}
        validate={validate}
        initialValues={sortedData}
        onSubmit={handleSubmit}
      >
        <Placeholder empty={empty} placeholder={t('unittype.empty')}>
          <AttributesTable data={sortedData} summary={title} />
          {/* {renderedContent} */}
        </Placeholder>
      </EditableContent>
    </EditableAccordion>
  );
};

export default UnitTypeSection;
