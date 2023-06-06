import AttributeEditor from '../attributes/AttributeEditor';
import Stack from '@mui/material/Stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useForm from '../../hooks/useForm';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useGetHierarchiesBySectionQuery } from '../../store';
import { useSelector } from 'react-redux';

const OtherAttributesEditor = () => {
  const { t } = useTranslation();
  const { values, setValues, valid, invalid, errors } = useForm();
  //console.log('XXX ', valid, invalid, errors, values);
  const selectedHierarchies = useSelector(
    (s) => s.tree.selectedHierarchy || s.tree.defaultHierarchy
  );
  const { data: otherattributes, isFetching: isFetchingKeys } =
    useGetHierarchiesBySectionQuery({
      selectedHierarchies,
      sections: ['other_attributes'],
      attributes: Object.keys(values), //['publicity','iam-henkilostoryhma','iam-johtoryhma'],
    });

  const generateAttr = (attribute) => {
    if (attribute[0].value) {
      let attr = {
        key: attribute[0].attr,
        type: 'options',
        optionValues: attribute[0].value.split(),
      };
      return attr;
    } else {
      let attr = {
        key: attribute[0].attr,
        type: 'text',
        value: null,
      };
      return attr;
    }
  };

  const getAttributeByKey = (key) => {
    if (otherattributes) {
      let attribute = otherattributes.filter((one) => one.attr === key);
      return generateAttr(attribute);
    }
  };

  const renderValueField = (attributes) => {
    const valueField = (valueFieldProps) => {
      const type = attributes.some((a) => a.type === 'options')
        ? 'options'
        : 'text';
      if (type === 'options') {
        return (
          <TextField select {...valueFieldProps}>
            {attributes[0].optionValues.map(
              (
                option //only one attributerow is "used" = attributes[0]
              ) => (
                <MenuItem key={option} value={option}>
                  {t(option)}
                </MenuItem>
              )
            )}
          </TextField>
        );
      }
      return <TextField {...valueFieldProps} value={valueFieldProps.value} />;
    };
    return valueField; //returns function to be passed to AttributeEditor
  };

  /**
   * Called when customCreateRow used
   *
   * @param key
   * @returns {function(): {deleted: boolean, endDate: null, id: number, isNew: boolean, type: string, value: null, key: *, startDate: null}}
   */
  const createRow = (key) => {
    const attribute = getAttributeByKey(key);
    return () => {
      const base = {
        id: Math.floor(Math.random() * -1000000),
        key: key,
        value: null,
        startDate: null,
        endDate: null,
        isNew: true,
        deleted: false,
      };
      const rest = {
        type: 'text',
      };
      if (attribute.key === key && attribute.type === 'options') {
        rest.type = 'options';
        rest.optionValues = attribute.optionValues;
      }
      return { ...base, ...rest };
    };
  };

  return (
    <Stack spacing={2}>
      {[
        ...Object.entries(values).map(([key, attributes], i) => (
          <AttributeEditor
            key={`${key}-${i}`}
            attributeLabel={t(key)}
            attributeKey={`${key}`}
            valueLabel={t('attribute_value')}
            path={key}
            data={attributes}
            renderValueField={renderValueField(attributes)}
            onChange={(newData) =>
              setValues({
                ...values,
                [key]: newData,
              })
            }
            customCreateRow={createRow(key)}
          />
        )),
      ]}
    </Stack>
  );
};

export default OtherAttributesEditor;
