import React from 'react';
import EditableAccordion from '../EditableAccordion';
import { useTranslation } from 'react-i18next';
import AttributesTable from '../attributes/AttributesTable';
import { codeAttributes as codes } from '../../constants/variables';
import useAttributes from '../../hooks/useAttributes';
import Validity from '../attributes/Validity';
import Placeholder from '../Placeholder';
import EditableContent from '../EditableContent';
import CodeAttributesEditor from './CodeAttributesEditor';

const toFormValues = (attributes) => {
  return { ...attributes };
};

const CodeAttributesSection = () => {
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
  const empty = data.length === 0;

  return (
    <EditableAccordion title={title}>
      <Placeholder
        empty={empty}
        placeholder={t('nodeDetailsSection.noAttributes')}
      >
        <EditableContent
          editorComponent={<CodeAttributesEditor />}
          initialValues={toFormValues(
            data.filter((a) => a.key !== 'unique_id')
          )}
          validate={(o) => console.log(o) || {}}
          onSubmit={(o) => Promise.resolve(console.log(o) || o)}
        >
          <AttributesTable columns={columns} data={data} summary={title} />
        </EditableContent>
      </Placeholder>
    </EditableAccordion>
  );
};

export default CodeAttributesSection;
