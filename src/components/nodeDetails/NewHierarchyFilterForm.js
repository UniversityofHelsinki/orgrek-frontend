import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Form } from '../../contexts/FormContext';
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
  Autocomplete,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import HelperText from '../inputs/HelperText';
import MenuItem from '@mui/material/MenuItem';
import useFormField from '../../hooks/useFormField';
import { stringComparator } from '../admin/fieldComparator';

const ContentHeader = ({ value }) => {
  return (
    <Typography component="legend" variant="h6" mb={2}>
      {value}
    </Typography>
  );
};

const Actions = ({ onCancel }) => {
  const { t } = useTranslation();
  const { dirty, invalid, submitting, removeBeforeUnloadListener } = useForm();

  const handleCancel = () => {
    removeBeforeUnloadListener();
    onCancel();
  };

  const actions = (
    <>
      <Button variant="outlined" onClick={handleCancel} disabled={submitting}>
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
  selhierarchies,
  distinctNodeAttrs,
  attributeKeys,
}) => {
  const { t } = useTranslation();
  const emptyHierarchyFilter = {
    key: '',
    value: '',
    hierarchy: '',
  };

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
        label={t('hierarchyFilter.sectionColumnHeader')}
        helperText={<HelperText errors={errors} />}
      >
        {[...selhierarchies].sort(stringComparator).map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    );
  };

  const AttributeDropdownField = ({ path }) => {
    const { props, errors } = useFormField({ path, name: 'key' });

    const autocompleteProps = {
      ...props,
      onInputChange: (_, value) => props.onChange(value),
      onChange: undefined,
      error: undefined,
      value: undefined,
    };

    const getOptionLabel = (option) => {
      return option;
    };

    return (
      <Autocomplete
        {...autocompleteProps}
        freeSolo
        options={[...attributeKeys].sort(stringComparator)}
        getOptionLabel={getOptionLabel}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            label={t('hierarchyFilter.attributeColumnHeader')}
            helperText={<HelperText errors={errors} />}
          />
        )}
      />
    );
  };

  const ValueDropdownField = ({ path }) => {
    const { props, errors } = useFormField({ path, name: 'value' });
    const { values } = useForm();
    const key = values.key;
    const attributeValues = distinctNodeAttrs[key]
      ? distinctNodeAttrs[key]
      : [];

    const autocompleteProps = {
      ...props,
      onInputChange: (_, value) => props.onChange(value),
      onChange: undefined,
      error: undefined,
      value: undefined,
    };

    const getOptionLabel = (option) => {
      return option;
    };

    return (
      <Autocomplete
        {...autocompleteProps}
        freeSolo
        getOptionLabel={getOptionLabel}
        options={attributeValues}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            label={t('hierarchyFilter.valueColumnHeader')}
            helperText={<HelperText errors={errors} />}
          />
        )}
      />
    );
  };
  const content = (
    <>
      <Stack spacing={2}>
        <Box>
          <SectionDropdownField path="" />
          <AttributeDropdownField path="" />
          <ValueDropdownField path="" />
        </Box>
      </Stack>
    </>
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="sm">
      <Form
        onSubmit={handleSubmit}
        initialValues={emptyHierarchyFilter}
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
