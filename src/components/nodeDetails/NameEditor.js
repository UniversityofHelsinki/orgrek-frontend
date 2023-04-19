import AttributeEditor from '../attributes/AttributeEditor';
import Stack from '@mui/material/Stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useForm from '../../hooks/useForm';
import PropTypes from 'prop-types';

const NameEditor = ({ keys }) => {
  const { t } = useTranslation();
  const { values, setValues } = useForm();

  return (
    <Stack spacing={2}>
      {keys.map((key) => (
        <AttributeEditor
          key={key}
          attributeLabel={t(key)}
          attributeKey={`${key}`}
          valueLabel={t('attribute_value')}
          path={key}
          data={values[key] || []}
          onChange={(newData) =>
            setValues({
              ...values,
              [key]: newData,
            })
          }
        />
      ))}
    </Stack>
  );
};

NameEditor.propTypes = { keys: PropTypes.arrayOf(PropTypes.string).isRequired };

export default NameEditor;
