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
import {
  defaultSchemaForAttributes,
  nameAttributeSchema,
} from '../../utils/validations';
import { authActions } from '../../auth';
import { flattenAttributes, toFormValues } from '../../utils/attributeUtils';

const NameSection = () => {
  const { t } = useTranslation();
  const nodeId = useNodeId();
  const { data, isFetching } = useGetNameAttributesQuery(nodeId);
  const { data: keysData, isFetching: isFetchingKeys } =
    useGetAttributeKeysBySectionQuery('names');
  const [saveNameAttributes] = useSaveNameAttributesMutation();

  const keys = (keysData || []).map((key) => key.attr);

  // In edit mode data includes also history and future
  const sortedData = useSortAttributesByDate(data);

  // In view mode filter history and future depending on selection
  const sortedAndFilteredData = useFilterAttributesByDate(sortedData);

  // Validates form values every time when the values change
  // Submit button is disabled when validation fails
  const validationSchema = nameAttributeSchema(keys);

  const handleSubmit = (input) => {
    const attributes = flattenAttributes(input);
    return saveNameAttributes({ attributes, nodeId }).unwrap();
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
      loading={isFetching || isFetchingKeys}
      defaultExpanded={!empty}
    >
      <EditableContent
        editorComponent={<NameEditor keys={keys} />}
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
