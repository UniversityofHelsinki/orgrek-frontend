import {
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
import { Form } from '../../contexts/FormContext';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { newSectionValiditySchema } from '../../utils/validations';
import useForm from '../../hooks/useForm';
import Button from '../inputs/Button';
import useFormField from '../../hooks/useFormField';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import HelperText from '../inputs/HelperText';
import fieldComparator from './fieldComparator';

const NewSectionDialogForm = ({
  open,
  onClose,
  handleSubmit,
  sectionOptions,
  attributeOptions,
}) => {
  const sectionDropdownFieldOptions = [...sectionOptions].sort(
    fieldComparator('label')
  );
  const attributeDropDownFieldOptions = [...attributeOptions].sort(
    fieldComparator('label')
  );

  const { t } = useTranslation();

  const emptySection = {
    section: '',
    attr: '',
  };

  const headerRow = (
    <Stack alignItems="center" justifyContent="space-between" direction="row">
      <Typography component="p" variant="h4">
        {t('section.createNewSection')}
      </Typography>
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </Stack>
  );

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

  const ContentHeader = ({ value }) => {
    return (
      <Typography component="legend" variant="h6" mb={2}>
        {value}
      </Typography>
    );
  };

  const SectionDropdownField = ({ path }) => {
    const { props, errors } = useFormField({ path, name: 'section' });

    return (
      <TextField
        {...props}
        select
        fullWidth
        helperText={<HelperText errors={errors} />}
      >
        {sectionDropdownFieldOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    );
  };

  const AttributeDropdownField = ({ path }) => {
    const { props, errors } = useFormField({ path, name: 'attr' });

    return (
      <TextField
        {...props}
        select
        fullWidth
        helperText={<HelperText errors={errors} />}
      >
        {attributeDropDownFieldOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    );
  };

  const content = (
    <>
      <Stack spacing={2}>
        <Box>
          <ContentHeader value={t('sectionsDataGrid.sectionColumnHeader')} />
          <SectionDropdownField path="" />
          <ContentHeader value={t('sectionsDataGrid.attributeColumnHeader')} />
          <AttributeDropdownField path="" />
        </Box>
      </Stack>
    </>
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="sm">
      <Form
        onSubmit={handleSubmit}
        initialValues={emptySection}
        validationSchema={newSectionValiditySchema}
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

export default NewSectionDialogForm;
