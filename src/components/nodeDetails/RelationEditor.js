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
import useContentLanguage from '../../hooks/useContentLanguage';

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
  const language = useContentLanguage();
  const languageField = language === 'ia' ? 'fi' : language;
  const [unitNames, setUnitNames] = useState(units);
  const getUnitName = (id) => {
    const found = unitNames.find((unit) => `s${unit.node.uniqueId}` === id)
      ?.node.names[languageField];
    return found;
  };

  const { values, setValues } = useForm();

  const getDisplayText = (value) => t(value.value);

  const nodeIsAlreadyUnit = (unit) => {
    return values[`s${unit.id}`];
  };

  const addUnit = (event, unit, reason) => {
    if (!unit || nodeIsAlreadyUnit(unit) || String(unit.id) === currentNodeId) {
      return;
    }
    const newValues = {
      [`s${unit.id}`]: [],
      ...values,
    };
    setUnitNames([
      ...unitNames,
      {
        node: {
          uniqueId: unit.id,
          names: { fi: unit.name, sv: unit.name, en: unit.name },
        },
        edges: [],
      },
    ]);
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

  const createRow = (nodeId) => {
    return () => ({
      id: Math.floor(Math.random() * -1000000),
      key: nodeId,
      value: '',
      startDate: null,
      endDate: null,
      isNew: true,
      deleted: false,
    });
  };

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
      {Object.entries(values).map(([nodeId, edges], i) => (
        <AttributeEditor
          overlap
          getDisplayText={getDisplayText}
          key={`${nodeId}-${i}`}
          path={nodeId}
          attributeLabel={getUnitName(nodeId) || nodeId}
          attributeKey={nodeId}
          fields={fields}
          customCreateRow={createRow(nodeId)}
        />
      ))}
    </Stack>
  );
};

export default RelationEditor;
