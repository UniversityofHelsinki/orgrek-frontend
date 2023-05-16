import React from 'react';
import { useTranslation } from 'react-i18next';
import useForm from '../../hooks/useForm';
import AttributeEditor from '../attributes/AttributeEditor';
import NodeField from '../inputs/NodeField';

const SuccessorEditor = () => {
  const { t } = useTranslation();
  const { values, setValues } = useForm();
  const key = 'successors';

  return (
    <AttributeEditor
      key={key}
      attributeKey={`${key}`}
      valueLabel={t('successors.valueLabel')}
      path={key}
      renderValueField={({
        inputProps,
        onBlur,
        onChange,
        ...valueFieldProps
      }) => (
        <NodeField
          {...valueFieldProps}
          variant="combobox"
          onChange={(event, newValue) =>
            setValues({
              ...values,
              [key]: [{ ...values[key][0], value: newValue }],
            })
          }
        />
      )}
      data={values[key] || []}
      onChange={(newData) =>
        setValues({
          ...values,
          [key]: newData,
        })
      }
    />
  );
};

export default SuccessorEditor;
