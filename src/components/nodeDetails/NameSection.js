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
import { parse, isValid, format } from 'date-fns';
import { fi } from 'date-fns/locale';

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
  const sortedAndFilteredData = useFilterAttributesByDate(sortedData);

  // TODO: show success snackbar when saveResult is completed
  // success message t('update_attributes_success')

  // TODO: show error snackbar if saveResult has error

  if (error) {
    // TODO: Fetching data failed, show error snackbar
  }

  const validStartDate = (date) => {
    if (date !== null && !isValid(date)) {
      const parsedDate = parse(date, 'yyyy-MM-DD', new Date(), { locale: fi });
      const isValidDate = isValid(parsedDate);
      return false;
    }
    return true;
  };

  const validEndDate = (date) => {
    if (date !== null && !isValid(date)) {
      const parsedDate = parse(date, 'yyyy-MM-DD', new Date(), { locale: fi });
      const isValidDate = isValid(parsedDate);
      return false;
    }
    return true;
  };

  const compareStartAndEndDates = (startDate, endDate, days) => {
    const start_date = new Date(startDate);
    start_date.setDate(start_date.getDate() + days);
    start_date.setHours(0, 0, 0, 0);

    if (startDate >= endDate) {
      return false;
    }

    const end_date = new Date(endDate);
    end_date.setDate(end_date.getDate() - days);
    end_date.setHours(0, 0, 0, 0);

    if (endDate <= startDate) {
      return false;
    }

    return true;
  };

  // Validates form values every time when the values change
  // Submit button is disabled when errors contain any truthy values
  // EditableContent handles displaying form-level validation error messages
  const validate = (values) => {
    let errors = {};

    // TODO: add validation rules here
    // errors.error = t('…');
    const arrOfNames = [...values.nameFi, ...values.nameSv, ...values.nameEn];
    arrOfNames.forEach((elem) => {
      if (!validStartDate(elem.startDate)) {
        errors = { error: 'invalid date' };
      }
      if (!validEndDate(elem.endDate)) {
        errors = { error: 'invalid date' };
      }
      if (compareStartAndEndDates(elem.startDate, elem.endDate, 3)) {
        errors = { error: 'invalid date' };
      }
    });

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
        editorComponent={<NameEditor />}
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
