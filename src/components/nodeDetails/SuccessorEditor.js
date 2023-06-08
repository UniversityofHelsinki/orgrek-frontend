import React from 'react';
import { useTranslation } from 'react-i18next';
import AttributeEditor from '../attributes/AttributeEditor';
import useFormField from '../../hooks/useFormField';
import HelperText from '../inputs/HelperText';
import NodeField from '../inputs/NodeField';
import { showValidity } from '../../utils/showValidity';
import { useGetNodeValidityQuery } from '../../store';
import useForm from '../../hooks/useForm';

const SuccessorTypeField = ({ path, value }) => {
  const { t } = useTranslation();
  const { props, errors, setValue } = useFormField({ path, name: 'value' });
  const { data, isFetching } = useGetNodeValidityQuery(value.value?.id, {
    skip: value.value === null,
  });

  let helperText = '';

  if (isFetching || !data) {
    helperText = '';
  } else if (!data.startDate && !data.endDate) {
    helperText = t('successors.nodeValidityNotSpecified');
  } else if (value.value) {
    helperText = t('successors.nodeValidity', {
      validity: showValidity(data.startDate, data.endDate),
    });
  }

  return (
    <NodeField
      {...props}
      fullWidth
      label={t('unit')}
      helperText={<HelperText errors={errors} helperText={helperText} />}
      onChange={(event, newValue) => setValue(newValue)}
    ></NodeField>
  );
};

const getDisplayText = (value) => {
  if (value.value === null) {
    return '';
  }
  return value.value.name;
};

const SuccessorEditor = () => {
  const { values, setValues } = useForm();

  const fields = [
    {
      name: 'value',
      render: (props) => <SuccessorTypeField {...props} />,
      gridProps: { xs: 12, sm: 6, lg: 8 },
    },
    { name: 'startDate', gridProps: { xs: 12, sm: 6, lg: 4 } },
  ];

  return Object.entries(values).map(([name], i) => (
    <AttributeEditor
      key={name}
      path={name}
      fields={fields}
      attributeKey={name}
      overlap
      getDisplayText={getDisplayText}
    />
  ));
};

export default SuccessorEditor;
