import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useForm from '../../hooks/useForm';
import AttributeEditor from '../attributes/AttributeEditor';
import { useParents } from '../../hooks/useParents';
import useContentLanguage from '../../hooks/useContentLanguage';
import NodeField from '../inputs/NodeField';
import Stack from '@mui/material/Stack';
import { Typography, Box } from '@mui/material';

const ParentEditor = ({ parents, onParentChange }) => {
  const { t } = useTranslation();
  const [parentNames, setParentNames] = useState(parents);
  const getParentName = (id) => {
    return parentNames.find((parent) => `s${parent.uniqueId}` === id)?.fullName;
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

  const nodeIsAlreadyParent = (node) => {
    return values[`s${node.id}`];
  };

  const addParent = (event, node, reason) => {
    if (!node || nodeIsAlreadyParent(node)) {
      return;
    }
    const newValues = {
      ...values,
      [`s${node.id}`]: [],
    };
    setParentNames([
      ...parentNames,
      { uniqueId: node.id, fullName: node.name },
    ]);
    setValues(newValues);
    onParentChange(newValues);
  };

  return (
    <Stack>
      <Box mb={2}>
        <Typography component="p" variant="h6" mb={2}>
          {t('new_upper_unit')}
        </Typography>
        <NodeField
          style={{ width: '50%' }}
          variant="search"
          onChange={addParent}
        />
      </Box>
      {Object.entries(values).map(([parentId, hierarchies], i) => (
        <AttributeEditor
          overlap
          renderValueField={renderValueField}
          getDisplayText={getDisplayText}
          key={`${parentId}-${i}`}
          path={`${parentId}`}
          attributeLabel={getParentName(parentId) || parentId}
          attributeKey={parentId}
          data={hierarchies}
          onChange={(newData) => {
            setValues({
              ...values,
              [parentId]: newData,
            });
          }}
        />
      ))}
    </Stack>
  );
};

export default ParentEditor;
