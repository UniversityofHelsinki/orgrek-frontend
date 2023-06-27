import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import useFetchNode from '../../hooks/useFetchNode';
import { Form } from '../../contexts/FormContext';
import StartDateField from '../attributes/StartDateField';
import ValueField from '../attributes/ValueField';
import useForm from '../../hooks/useForm';
import { newHierarchyFilterValiditySchema } from '../../utils/validations';
import { useSelector } from 'react-redux';
import Button from '../inputs/Button';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  IconButton,
  Typography,
  Chip,
  Stack,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import HelperText from '../inputs/HelperText';
import MenuItem from '@mui/material/MenuItem';
import useFormField from '../../hooks/useFormField';
import dropdownFieldOptions from 'lodash';

const ContentHeader = ({ value }) => {
  return (
    <Typography component="legend" variant="h6" mb={2}>
      {value}
    </Typography>
  );
};

const Actions = ({ onCancel }) => {
  const { t } = useTranslation();
  const { dirty, invalid, submitting } = useForm();
  const actions = (
    <>
      <Button variant="outlined" onClick={onCancel} disabled={submitting}>
        {t('cancel_button')}
      </Button>
      <Button
        type="submit"
        variant="contained"
        disabled={!dirty || invalid}
        loading={submitting}
      >
        {t('save_button')}
      </Button>
    </>
  );
  return actions;
};

const NewHierarchyFilterForm = ({
  open,
  onClose,
  handleSubmit,
  initialRows,
}) => {
  const { t } = useTranslation();
  //const validationSchema = newNodeValiditySchema;
  const uniqueHierarchyValues = initialRows.filter(
    (elem, ix) =>
      initialRows.findIndex((elem1) => elem1.hierarchy === elem.hierarchy) ===
      ix
  );

  const uniqueKeyValues = initialRows.filter(
    (elem, ix) =>
      initialRows.findIndex((elem1) => elem1.key === elem.key) === ix
  );

  const uniqueValues = initialRows.filter(
    (elem, ix) =>
      initialRows.findIndex((elem1) => elem1.value === elem.value) === ix
  );

  const dropdownHierarchyFieldOptions = uniqueHierarchyValues;
  const dropdownKeyFieldOptions = uniqueKeyValues;
  const dropdownValueFieldOptions = uniqueValues;

  const emptySection = {
    section: '',
    attr: '',
  };

  const today = new Date();

  const headerRow = (
    <Stack alignItems="center" justifyContent="space-between" direction="row">
      <Typography component="p" variant="h4">
        {t('hierarchyFilter.createFilter')}
      </Typography>
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </Stack>
  );

  const SectionDropdownField = ({ path }) => {
    const { props, errors } = useFormField({ path, name: 'hierarchy' });

    return (
      <TextField
        {...props}
        select
        fullWidth
        helperText={<HelperText errors={errors} />}
      >
        {dropdownHierarchyFieldOptions.map((option) => (
          <MenuItem key={option.hierarchy} value={option.hierarchy}>
            {option.hierarchy}
          </MenuItem>
        ))}
      </TextField>
    );
  };

  const AttributeDropdownField = ({ path }) => {
    const { props, errors } = useFormField({ path, name: 'key' });

    return (
      <TextField
        {...props}
        select
        fullWidth
        helperText={<HelperText errors={errors} />}
      >
        {dropdownKeyFieldOptions.map((option) => (
          <MenuItem key={option.key} value={option.key}>
            {option.key}
          </MenuItem>
        ))}
      </TextField>
    );
  };

  const ValueDropdownField = ({ path }) => {
    const { props, errors } = useFormField({ path, name: 'value' });

    return (
      <TextField
        {...props}
        select
        fullWidth
        helperText={<HelperText errors={errors} />}
      >
        {dropdownValueFieldOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
      </TextField>
    );
  };

  const content = (
    <>
      <Stack spacing={2}>
        <Box>
          <ContentHeader value={t('hierarchyDataGrid.sectionColumnHeader')} />
          <SectionDropdownField path="" />
          <ContentHeader value={t('hierarchyDataGrid.attributeColumnHeader')} />
          <AttributeDropdownField path="" />
          <ContentHeader value={t('hierarchyDataGrid.valueColumnHeader')} />
          <ValueDropdownField path="" />
        </Box>
      </Stack>
    </>
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="sm">
      <Form
        onSubmit={handleSubmit}
        initialValues={emptySection}
        validationSchema={newHierarchyFilterValiditySchema}
      >
        <DialogTitle>{headerRow}</DialogTitle>
        <Divider />
        <DialogContent>{content}</DialogContent>
        <Divider />
        <DialogActions>
          <Actions onCancel={onClose} />
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default NewHierarchyFilterForm;
