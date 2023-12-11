import {
  Autocomplete,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { Form } from '../../contexts/FormContext';
import Button from '../inputs/Button';
import useForm from '../../hooks/useForm';
import { newAttributeOrderSchema } from '../../utils/validations';
import useFormField from '../../hooks/useFormField';
import { stringComparator } from '../admin/fieldComparator';
import HelperText from '../inputs/HelperText';
import TextField from '../inputs/TextField';

const AttributeOrderForm = ({
  open,
  onClose,
  existingRows,
  onSubmit,
  attributes = {},
}) => {
  const { t } = useTranslation();
  const validationSchema = newAttributeOrderSchema(
    existingRows,
    t('attribute_order_already_exists')
  );

  const attributeKeys = Object.keys(attributes);

  const headerRow = (
    <Stack alignItems="center" justifyContent="space-between" direction="row">
      <Typography component="p" variant="h4">
        {t('attribute_orders_new')}
      </Typography>
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </Stack>
  );

  const ContentHeader = ({ value }) => {
    return (
      <Typography component="legend" variant="h6" mb={2}>
        {value}
      </Typography>
    );
  };

  const emptyAttributeOrder = {
    key: '',
    value: '',
    order: 0,
  };

  const Field = ({ name, label, values }) => {
    const { props, errors } = useFormField({ path: '', name });

    const autocompleteProps = {
      ...props,
      onInputChange: (_, value) => props.onChange(value),
      onChange: undefined,
      error: undefined,
      value: undefined,
    };

    const getOptionLabel = (option) => {
      return option || '';
    };

    return (
      <Autocomplete
        {...autocompleteProps}
        freeSolo
        options={[...values].sort(stringComparator)}
        getOptionLabel={getOptionLabel}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            label={label}
            error={errors.length > 0}
            helperText={<HelperText errors={errors} />}
          />
        )}
      />
    );
  };

  const KeyField = () => {
    return (
      <Field
        name="key"
        label={t('attribute_orders_label_key')}
        values={attributeKeys}
      />
    );
  };

  const AttributeValueField = () => {
    const { values } = useForm();
    const key = values.key;
    const attributeValues = attributes[key] || [];

    return (
      <Field
        name="value"
        label={t('attribute_orders_label_value')}
        values={attributeValues}
      />
    );
  };

  const Actions = ({ onCancel }) => {
    const { t } = useTranslation();
    const { dirty, invalid, submitting, removeBeforeUnloadListener } =
      useForm();

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

  const handleSubmit = (row) => {
    onSubmit(row);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="sm">
      <Form
        onSubmit={handleSubmit}
        initialValues={emptyAttributeOrder}
        validationSchema={validationSchema}
        sx={{ overflowY: 'auto' }}
      >
        <DialogTitle>{headerRow}</DialogTitle>
        <Divider />
        <DialogContent>
          <ContentHeader value={t('attribute_orders_label_key')} />
          <KeyField />
          <ContentHeader value={t('attribute_orders_label_value')} />
          <AttributeValueField />
        </DialogContent>
        <Divider />
        <DialogActions>
          <Actions onCancel={onClose} />
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default AttributeOrderForm;
