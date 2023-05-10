import React from 'react';
import { useSelector } from 'react-redux';
import TextField from '../inputs/TextField';
import { MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useForm from '../../hooks/useForm';
import AttributeEditor from '../attributes/AttributeEditor';
import { useParents } from '../../hooks/useParents';
import useContentLanguage from '../../hooks/useContentLanguage';

const ParentEditor = (props) => {
  const { t } = useTranslation();
  const { parents, isFetching } = useParents();
  const contentLanguage = useContentLanguage();
  const data = parents[contentLanguage] || [];
  const getParentName = (id) => {
    return data.find((parent) => `s${parent.uniqueId}` === id).fullName;
  };
  const removeHistory = (hierarchieswithHistory) => {
    return hierarchieswithHistory.filter((s) => {
      return !s.match('history');
    });
  };
  const removeHierarchies = (hierarchies, excessHierarchies) => {
    return hierarchies.filter((s) => {
      return !s.includes(excessHierarchies);
    });
  };
  const selectableHierarchies = useSelector((s) => {
    return s.tree.selectedHierarchy.split(',');
    //return removeHierarchies(s.tree.selectedHierarchies, ['history']);
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

  return Object.entries(values).map(([parentId, hierarchies], i) => (
    <AttributeEditor
      renderValueField={renderValueField}
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
