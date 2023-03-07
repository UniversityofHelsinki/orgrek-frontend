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

const NameSection = () => {
  const { t } = useTranslation();
  const nodeId = useNodeId();
  const { data, error, isFetching } = useGetNameAttributesQuery(nodeId);
  const [saveNameAttributes, saveResult] = useSaveNameAttributesMutation();
  const sortedData = useSortAttributesByDate(data);

  // TODO: show success snackbar when saveResult is completed
  // success message t('update_attributes_success')
  // TODO: show error snackbar if saveResult has error

  if (error) {
    // TODO: Fetching data failed, show error snackbar
  }

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
  const empty = sortedData.length === 0;

  const nameFi = sortedData.filter((value) => value.key === 'name_fi');
  const nameSv = sortedData.filter((value) => value.key === 'name_sv');
  const nameEn = sortedData.filter((value) => value.key === 'name_en');

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
        initialValues={{ nameFi, nameSv, nameEn }}
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
