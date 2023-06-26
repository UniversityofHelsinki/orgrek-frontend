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

const NewSectionDialogForm = ({ open, onClose, handleSubmit, initialRows }) => {
  const uniqueSectionValues = initialRows.filter(
    (elem, ix) =>
      initialRows.findIndex((elem1) => elem1.section === elem.section) === ix
  );

  const dropdownFieldOptions = uniqueSectionValues;

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
        {dropdownFieldOptions.map((option) => (
          <MenuItem key={option.section} value={option.section}>
            {t(option.section)}
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
          <ContentHeader value={t('attr.header')} />
          <SectionDropdownField path="" />
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
