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

/*const ValidFromField = () => {
  const { t } = useTranslation();
  const { values, setValues, errors } = useForm();
  return (
    <Box>
      <ContentHeader value={t('subunits.validFrom')} />
      <Box>
        <StartDateField
          value={values.startDate}
          label={t('subunits.validFrom')}
          path=""
        />
      </Box>
    </Box>
  );
};*/
/*const NameFields = () => {
    const { t } = useTranslation();
    const { values, setValues } = useForm();
    const fieldPrefix = 'name';
    const languages = ['Fi', 'En', 'Sv'];
    return (
        <Box>
            <ContentHeader value={t('subunits.names')} />
            <Stack spacing={1}>
                {languages.map((language) => (
                    <Box key={language} component="fieldset">
                        <ValueField
                            label={t(`subunits.${fieldPrefix}${language}`)}
                            name={`${fieldPrefix}${language}`}
                            path=""
                        />
                    </Box>
                ))}
            </Stack>
        </Box>
    );
};*/
/*const Hierarchies = ({ hierarchies }) => {
  const { t } = useTranslation();
  const { values, setValues } = useForm();

  return (
    <Box>
      <ContentHeader value={t('subunits.hierarchies')} />
      <Stack direction="row" rowGap="10px" flexWrap="wrap">
        {hierarchies.map((hierarchy) => (
          <Chip
            key={hierarchy}
            label={t(hierarchy)}
            sx={{ marginRight: '10px' }}
          />
        ))}
      </Stack>
    </Box>
  );
};*/
/*const Node = () => {
  const currentNode = useFetchNode();
  const { t } = useTranslation();
  return (
    <Box>
      <ContentHeader value={t('subunits.parent')} />
      <Typography variant="body1">{currentNode.name}</Typography>
    </Box>
  );
};*/

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
  const uniqueSectionValues = initialRows.filter(
    (elem, ix) =>
      initialRows.findIndex((elem1) => elem1.section === elem.section) === ix
  );

  const dropdownFieldOptions = uniqueSectionValues;

  const emptySection = {
    section: '',
    attr: '',
  };

  const today = new Date();
  /*const emptyNode = {
    hierarchies: selectedHierarchies,
    key: null,
    value: null,
    startDate: today,
    endDate: null,
    isNew: true,
  };*/

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
            {option.section}
          </MenuItem>
        ))}
      </TextField>
    );
  };

  const content = (
    <>
      <Stack spacing={2}>
        <Box>
          <p>Aukea per ...</p>
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
