import React from 'react';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useForm from '../../hooks/useForm';
import AttributeEditor from '../attributes/AttributeEditor';
import { useParents } from '../../hooks/useParents';
import useContentLanguage from '../../hooks/useContentLanguage';

const ParentEditor = () => {
  const { t } = useTranslation();
  const { parents } = useParents();
  const contentLanguage = useContentLanguage();
  const data = parents[contentLanguage] || [];
  const getParentName = (id) => {
    return data.find((parent) => `s${parent.uniqueId}` === id).fullName;
  };

  const selectableHierarchies = useSelector((s) => {
    return s.tree.selectedHierarchy.split(',');
  });
  const { values, setValues } = useForm();

  const renderValueField = (valueFieldProps) => {
    return (
      <TextField select {...valueFieldProps}>
        {selectableHierarchies.map((hierarchy) => (
          <MenuItem key={hierarchy} value={hierarchy}>
            {t(hierarchy)}
          </MenuItem>
        ))}
      </TextField>
    );
  };

  const getDisplayText = (value) => t(value.value);

  return Object.entries(values).map(([parentId, hierarchies], i) => (
    <AttributeEditor
      renderValueField={renderValueField}
      getDisplayText={getDisplayText}
      key={`${parentId}-${i}`}
      path={`${parentId}`}
      attributeLabel={getParentName(parentId)}
      attributeKey={parentId}
      data={hierarchies}
      onChange={(newData) => {
        setValues({
          ...values,
          [parentId]: newData,
        });
      }}
    />
  ));
};

export default ParentEditor;
