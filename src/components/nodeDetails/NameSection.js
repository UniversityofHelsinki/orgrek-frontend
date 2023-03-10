import React from 'react';
import EditableAccordion from '../EditableAccordion';
import { useTranslation } from 'react-i18next';
import AttributesTable from '../attributes/AttributesTable';
import Validity from '../attributes/Validity';
import EditNameForm from './EditNameForm';
import EditableContent from '../EditableContent';
import Placeholder from '../Placeholder';
import { useNodeId } from '../../hooks/useNodeId';
import {
  useGetNameAttributesQuery,
  useSaveNameAttributesMutation,
} from '../../store';
import useSortAttributesByDate from '../../hooks/useSortAttributesByDate';
import useFilterAttributesByDate from '../../hooks/useFilterAttributesByDate';

const toFormValues = (data) => {
  const nameFi = data.filter((value) => value.key === 'name_fi');
  const nameSv = data.filter((value) => value.key === 'name_sv');
  const nameEn = data.filter((value) => value.key === 'name_en');

  return { nameFi, nameSv, nameEn };
};

const NameSection = () => {
  const { t } = useTranslation();
  const nodeId = useNodeId();
  const { data, error, isFetching } = useGetNameAttributesQuery(nodeId);
  const [saveNameAttributes, saveResult] = useSaveNameAttributesMutation();

  // In edit mode data includes also history and future
  const sortedData = useSortAttributesByDate(data);

  // In view mode filter history and future depending on selection
  const sortedAndFilteredData = useFilterAttributesByDate(data);

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
    const errors = {};

    // TODO: add validation rules here
    // errors.error = t('…');

    return errors;
  };

  const handleSubmit = (values) => {
    // TODO: call and return saveNameAttributes({ nodeId, values }).unwrap()
  };

  const columns = [
    { label: t('text_language_header'), render: (item) => t(item.key) },
    { label: t('name'), render: (item) => item.value },
    {
      label: t('valid_dates'),
      render: (item) => (
        <Validity startDate={item.startDate} endDate={item.endDate} />
      ),
    },
  ];

  const title = t('name_info');
  const empty = sortedAndFilteredData.length === 0;

  // Sort by language
  const { nameFi, nameSv, nameEn } = toFormValues(sortedAndFilteredData);

  const renderedContent = (
    <AttributesTable
      columns={columns}
      data={[...nameFi, ...nameSv, ...nameEn]}
      summary={title}
    />
  );

  return (
    <EditableAccordion
      title={title}
      loading={isFetching}
      defaultExpanded={!empty}
    >
      <EditableContent
        editorComponent={<EditNameForm />}
        validate={validate}
        initialValues={toFormValues(sortedData)}
        onSubmit={handleSubmit}
      >
        <Placeholder empty={empty} placeholder={t('nameInfo.empty')}>
          {renderedContent}
        </Placeholder>
      </EditableContent>
    </EditableAccordion>
  );
};

export default NameSection;
