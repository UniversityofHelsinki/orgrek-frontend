import React from 'react';
import EditableAccordion from '../EditableAccordion';
import { useTranslation } from 'react-i18next';
import AttributesTable from '../attributes/AttributesTable';
import Validity from '../attributes/Validity';
import NameEditor from './NameEditor';
import EditableContent from '../EditableContent';
import Placeholder from '../Placeholder';
import { useNodeId } from '../../hooks/useNodeId';
import {
  useGetNameAttributesQuery,
  useSaveNameAttributesMutation,
} from '../../store';
import useSortAttributesByDate from '../../hooks/useSortAttributesByDate';
import useFilterAttributesByDate from '../../hooks/useFilterAttributesByDate';
import { compareAndCheckDates, valueNotEmpty } from './validations';
import { authActions } from '../auth/auth';

const toFormValues = (data) => {
  const nameFi = data.filter((value) => value.key === 'name_fi');
  const nameSv = data.filter((value) => value.key === 'name_sv');
  const nameEn = data.filter((value) => value.key === 'name_en');

  return { nameFi, nameSv, nameEn };
};

const NameSection = () => {
  const { t } = useTranslation();
  const nodeId = useNodeId();
  const { data, isFetching } = useGetNameAttributesQuery(nodeId);
  const [saveNameAttributes] = useSaveNameAttributesMutation();

  // In edit mode data includes also history and future
  const sortedData = useSortAttributesByDate(data);

  // In view mode filter history and future depending on selection
  const sortedAndFilteredData = useFilterAttributesByDate(sortedData);

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
    const combinedArrays = [
      ...values.nameEn,
      ...values.nameFi,
      ...values.nameSv,
    ];
    return saveNameAttributes({ combinedArrays, nodeId }).unwrap();
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
        editorComponent={<NameEditor />}
        validate={validate}
        initialValues={toFormValues(sortedData)}
        onSubmit={handleSubmit}
        successMessage={t('nameInfo.saveSuccess')}
        errorMessage={t('nameInfo.saveError')}
        authActions={authActions.nameAttributes}
      >
        <Placeholder empty={empty} placeholder={t('nameInfo.empty')}>
          {renderedContent}
        </Placeholder>
      </EditableContent>
    </EditableAccordion>
  );
};

export default NameSection;
