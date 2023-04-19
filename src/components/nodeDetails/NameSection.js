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
import { defaultSchemaForAttributes } from '../../utils/validations';
import { attributeSanitation } from '../../utils/sanitations';
import { authActions } from '../../auth';

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
  // Submit button is disabled when validation fails
  // TODO: Use keys from backend (implemented in OR-1044)
  const keys = ['nameFi', 'nameSv', 'nameEn'];
  const validationSchema = defaultSchemaForAttributes(keys);

  const handleSubmit = (values) => {
    const combinedArrays = [
      ...values.nameEn,
      ...values.nameFi,
      ...values.nameSv,
    ];

    const cleanedAttributes = attributeSanitation(combinedArrays);

    return saveNameAttributes({ cleanedAttributes, nodeId }).unwrap();
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
        validationSchema={validationSchema}
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
