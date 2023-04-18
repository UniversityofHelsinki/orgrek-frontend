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
  useGetAttributeKeysBySectionQuery,
} from '../../store';
import useSortAttributesByDate from '../../hooks/useSortAttributesByDate';
import useFilterAttributesByDate from '../../hooks/useFilterAttributesByDate';
import { compareAndCheckDates, valueNotEmpty } from './Validations';
import { attributeSanitation } from './Sanitations';
import { authActions } from '../../auth';
import { flattenAttributes, toFormValues } from '../../utils/attributeUtils';

const NameSection = () => {
  const { t } = useTranslation();
  const nodeId = useNodeId();
  const { data, isFetching } = useGetNameAttributesQuery(nodeId);
  const { data: keysData } = useGetAttributeKeysBySectionQuery('names');
  const [saveNameAttributes] = useSaveNameAttributesMutation();

  // In edit mode data includes also history and future
  const sortedData = useSortAttributesByDate(data);

  // In view mode filter history and future depending on selection
  const sortedAndFilteredData = useFilterAttributesByDate(sortedData);

  // Validates form values every time when the values change
  // Submit button is disabled when errors contain any truthy values
  // EditableContent handles displaying form-level validation error messages
  const validate = (values) => {
    const combinedArrays = flattenAttributes(values);
    return {
      ...valueNotEmpty(combinedArrays),
      ...compareAndCheckDates(combinedArrays),
    };
  };

  const handleSubmit = (input) => {
    const attributes = flattenAttributes(input);
    const sanitized = attributeSanitation(attributes);

    return saveNameAttributes({ attributes: sanitized, nodeId }).unwrap();
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

  const keys = (keysData || []).map((key) => key.attr);

  const sortedDataByKeys = keys
    .map((key) => sortedAndFilteredData.filter((value) => value.key === key))
    .flat();

  const renderedContent = (
    <AttributesTable
      columns={columns}
      data={sortedDataByKeys}
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
        editorComponent={<NameEditor keys={keys} />}
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
