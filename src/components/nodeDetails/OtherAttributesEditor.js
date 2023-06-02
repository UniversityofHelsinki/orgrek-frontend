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
      attributes: ['publicity'],
    });

  const getPublicityAttributes = () => {
    if (otherattributes) {
      let otherattributesString = '';
      otherattributes.filter((p) => {
        if (p.attr.match('publicity')) {
          otherattributesString = otherattributesString + p.value.concat(',');
        }
      });
      const otherattributesStr = otherattributesString.substring(
        0,
        otherattributesString.length - 1
      );
      const pubArr = otherattributesStr.split(',');
      let public_attributes = {
        key: 'publicity',
        type: 'options',
        optionValues: [],
      };
      let publicity_attributes = { ...public_attributes, optionValues: pubArr };
      return publicity_attributes;
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
   * @param attributes
   * @returns {function(): {deleted: boolean, endDate: null, id: number, isNew: boolean, type: string, value: null, key: *, startDate: null}}
   */
  const createRow = (key, attributes) => {
    const publicity_attributes = getPublicityAttributes();
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
      //const mock_attributes = [{key: 'publicity', type: 'options', optionValues: ['moikka', 'huikka']}];
      if (
        publicity_attributes.key === key &&
        publicity_attributes.type === 'options'
      ) {
        rest.type = 'options';
        rest.optionValues = publicity_attributes.optionValues;
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
            customCreateRow={createRow(key, otherattributes)}
          />
        )),
      ]}
    </Stack>
  );
};

export default OtherAttributesEditor;
