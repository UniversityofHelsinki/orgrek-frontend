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
import useHierarchies from '../../hooks/useHierarchies';

const HierarchyField = ({ path }) => {
  const { t } = useTranslation();
  const { props, errors } = useFormField({ path, name: 'value' });
  const [selectableHierarchies] = useHierarchies();

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

const RelationEditor = ({ units, onUnitChange, editortitle }) => {
  const { t } = useTranslation();
  const currentNodeId = useNodeId();
  const [unitNames, setUnitNames] = useState(units);
  const getUnitName = (id) => {
    return unitNames.find((unit) => `s${unit.uniqueId}` === id)?.fullName;
  };

  const { values, setValues } = useForm();

  const getDisplayText = (value) => t(value.value);

  const nodeIsAlreadyUnit = (node) => {
    return values[`s${node.id}`];
  };

  const addUnit = (event, node, reason) => {
    if (!node || nodeIsAlreadyUnit(node) || String(node.id) === currentNodeId) {
      return;
    }
    const newValues = {
      [`s${node.id}`]: [],
      ...values,
    };
    setUnitNames([...unitNames, { uniqueId: node.id, fullName: node.name }]);
    setValues(newValues);
    onUnitChange(newValues);
  };

  const fields = [
    { name: 'value', render: (props) => <HierarchyField {...props} /> },
    'startDate',
    'endDate',
  ];

  const removeCharacterDueToYupBug = (v) => v.substring(1);
  const filterList = [
    currentNodeId,
    ...Object.keys(values).map(removeCharacterDueToYupBug),
  ];

  const optionFilter = (option) => !filterList.includes(`${option.uniqueId}`);

  return (
    <Stack>
      <Box mb={2} sx={{ marginBottom: '40px' }}>
        <Typography component="p" variant="h6" mb={2}>
          {editortitle}
        </Typography>
        <NodeField
          style={{ width: '50%' }}
          variant="search"
          onChange={addUnit}
          filter={optionFilter}
          clearOnSelect={true}
        />
      </Box>
      {Object.entries(values).map(([parentId, hierarchies], i) => (
        <AttributeEditor
          overlap
          getDisplayText={getDisplayText}
          key={`${parentId}-${i}`}
          path={parentId}
          attributeLabel={getUnitName(parentId) || parentId}
          attributeKey={parentId}
          fields={fields}
        />
      ))}
    </Stack>
  );
};

export default RelationEditor;
