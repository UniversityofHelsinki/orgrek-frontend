import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useForm from '../../hooks/useForm';
import AttributeEditor from '../attributes/AttributeEditor';
import NodeField from '../inputs/NodeField';
import Stack from '@mui/material/Stack';
import { Typography, Box } from '@mui/material';
import { useNodeId } from '../../hooks/useNodeId';
import HelperText from '../inputs/HelperText';
import useFormField from '../../hooks/useFormField';

const HierarchyField = ({ path }) => {
  const { t } = useTranslation();
  const { props, errors } = useFormField({ path, name: 'value' });
  const selectableHierarchies = useSelector((s) => {
    return s.tree.selectedHierarchy.split(',');
  });

  return (
    <TextField
      {...props}
      select
      fullWidth
      label={t('upperUnits.hierarchy')}
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

const ParentEditor = ({ parents, onParentChange }) => {
  const { t } = useTranslation();
  const currentNodeId = useNodeId();
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
    if (
      !node ||
      nodeIsAlreadyParent(node) ||
      String(node.id) === currentNodeId
    ) {
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

  const fields = [
    { name: 'value', render: (props) => <HierarchyField {...props} /> },
    'startDate',
    'endDate',
  ];

  return (
    <Stack>
      <Box mb={2}>
        <Typography component="p" variant="h6" mb={2}>
          {t('upperUnits.newUpperUnit')}
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
          getDisplayText={getDisplayText}
          key={`${parentId}-${i}`}
          path={parentId}
          attributeLabel={getParentName(parentId) || parentId}
          attributeKey={parentId}
          fields={fields}
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