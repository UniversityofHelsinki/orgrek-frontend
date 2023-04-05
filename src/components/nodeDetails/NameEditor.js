import AttributeEditor from '../attributes/AttributeEditor';
import Stack from '@mui/material/Stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useForm from '../../hooks/useForm';

const NameEditor = () => {
  const { t } = useTranslation();
  const { values, setValues } = useForm();

  return (
    <Stack spacing={2}>
      <AttributeEditor
        attributeLabel={t('name_fi')}
        attributeKey={'name_fi'}
        valueLabel={t('name')}
        data={values.nameFi}
        onChange={(newData) => setValues({ ...values, nameFi: newData })}
      />
      <AttributeEditor
        attributeLabel={t('name_sv')}
        attributeKey={'name_sv'}
        valueLabel={t('name')}
        data={values.nameSv}
        onChange={(newData) => setValues({ ...values, nameSv: newData })}
      />
      <AttributeEditor
        attributeLabel={t('name_en')}
        attributeKey={'name_en'}
        valueLabel={t('name')}
        data={values.nameEn}
        onChange={(newData) => setValues({ ...values, nameEn: newData })}
      />
    </Stack>
  );
};

export default NameEditor;
