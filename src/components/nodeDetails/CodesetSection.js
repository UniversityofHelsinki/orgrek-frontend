import React from 'react';
import EditableAccordion from '../EditableAccordion';
import { useTranslation } from 'react-i18next';
import AttributesTable from '../attributes/AttributesTable';
import { codeAttributes as codes } from '../../constants/variables';
import useAttributes from '../../hooks/useAttributes';
import Validity from '../attributes/Validity';

const CodesetSection = () => {
  const { t } = useTranslation();
  const { codeAttributes } = useAttributes();

  const columns = [
    { label: t('code_namespace'), render: (item) => t(item.key) },
    { label: t('value'), render: (item) => item.value },
    {
      label: t('valid_dates'),
      render: (item) => (
        <Validity startDate={item.startDate} endDate={item.endDate} />
      ),
    },
  ];

  const byCodesAndDates = (a, b) => {
    if (a.key === b.key) {
      if (!a.startDate && !a.endDate) {
        return -1;
      }
      if (!b.startDate && !b.endDate) {
        return 1;
      }
      if (b.endDate && a.startDate) {
        return new Date(b.endDate) - new Date(a.startDate);
      }
      return new Date(a.startDate) - new Date(b.startDate);
    }
    const aOrder = codes.findIndex((key) => key === a.key);
    const bOrder = codes.findIndex((key) => key === b.key);
    if (aOrder < bOrder) {
      return -1;
    } else if (aOrder > bOrder) {
      return 1;
    }
    return 0;
  };

  const data = [...codeAttributes].sort(byCodesAndDates);
  const title = t('codes');

  return (
    <EditableAccordion title={title} defaultExpanded>
      <AttributesTable columns={columns} data={data} summary={title} />
    </EditableAccordion>
  );
};

export default CodesetSection;
