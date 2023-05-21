import React from 'react';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useForm from '../../hooks/useForm';
import AttributeEditor from '../attributes/AttributeEditor';
import { useParents } from '../../hooks/useParents';
import useContentLanguage from '../../hooks/useContentLanguage';
import useFormField from '../../hooks/useFormField';
import HelperText from '../inputs/HelperText';

const HierarchyField = ({ path, onChange }) => {
  const { t } = useTranslation();
  const { props, errors } = useFormField({ path, name: 'value', onChange });
  const selectableHierarchies = useSelector((s) => {
    return s.tree.selectedHierarchy.split(',');
  });

  return (
    <TextField
      {...props}
      label={t('upperUnits.hierarchy')}
      select
      fullWidth
      helperText={<HelperText errors={errors} />}
    >
      {selectableHierarchies.map((hierarchy) => (
        <MenuItem key={hierarchy} value={hierarchy}>
          {t(hierarchy)}
        </MenuItem>
      ))}
    </TextField>
  );
};

const ParentEditor = () => {
  const { t } = useTranslation();
  const { parents } = useParents();
  const contentLanguage = useContentLanguage();
  const data = parents[contentLanguage] || [];
  const getParentName = (id) => {
    return data.find((parent) => `s${parent.uniqueId}` === id).fullName;
  };

  const { values } = useForm();

  const getDisplayText = (value) => t(value.value);

  const fields = [
    { name: 'value', render: (props) => <HierarchyField {...props} /> },
    'startDate',
    'endDate',
  ];

  return Object.entries(values).map(([parentId, hierarchies], i) => (
    <AttributeEditor
      overlap
      getDisplayText={getDisplayText}
      key={`${parentId}-${i}`}
      path={parentId}
      attributeLabel={getParentName(parentId)}
      attributeKey={parentId}
      fields={fields}
    />
  ));
};

export default ParentEditor;
