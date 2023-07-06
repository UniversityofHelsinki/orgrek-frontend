import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { Form } from '../../contexts/FormContext';
import useForm from '../../hooks/useForm';
import Button from '../inputs/Button';
import ValueField from '../attributes/ValueField';
import { t } from 'i18next';
import NodeField from '../inputs/NodeField';
import { newHierarchySchema } from '../../utils/validations';

const ContentHeader = ({ value }) => {
  return (
    <Typography component="legend" variant="h6" mb={2}>
      {value}
    </Typography>
  );
};

const HierarchyField = () => {
  const { values } = useForm();
  const { t } = useTranslation();

  return (
    <Box>
      <ContentHeader value={t(`hierarchy_identifier`)} />
      <ValueField
        name="hierarchy"
        label={t(`hierarchy_identifier`)}
        path=""
        value={values.hierarchy}
      />
    </Box>
  );
};

const RootUnitField = () => {
  const { values, setValues } = useForm();
  const onChange = (event, unit) => {
    setValues({ ...values, unit: unit.id });
  };
  return (
    <Box>
      <ContentHeader value={t(`hierarchy_unit`)} />
      <NodeField
        style={{ width: '100%' }}
        variant="search"
        onChange={onChange}
      />
    </Box>
  );
};

const LanguageField = ({ name, language }) => {
  const { values } = useForm();
  const { t } = useTranslation();

  return (
    <ValueField
      name={name}
      label={t(`texts_${language}`)}
      path=""
      value={values[name]}
    />
  );
};

const NameFields = () => {
  return (
    <Box>
      <ContentHeader value={t(`hierarchy_names`)} />
      <LanguageField name="nameFi" language="fi" />
      <LanguageField name="nameEn" language="en" />
      <LanguageField name="nameSv" language="sv" />
    </Box>
  );
};

const PublicityField = () => {
  const { t } = useTranslation();
  const { values, setValues } = useForm();
  return (
    <Box>
      <ContentHeader value={t(`hierarchy_publicity`)} />
      <FormControl fullWidth>
        <InputLabel id="publicity">{t(`publicity`)}</InputLabel>
        <Select
          fullWidth
          labelId="publicity"
          label="publicity"
          value={values.publicity}
          onChange={(v) => setValues({ ...values, publicity: v.target.value })}
        >
          <MenuItem value={true}>{t(`publicity_true`)}</MenuItem>
          <MenuItem value={false}>{t(`publicity_false`)}</MenuItem>
        </Select>
      </FormControl>
    </Box>
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

const HierarchyForm = ({ open, onClose }) => {
  const { t } = useTranslation();
  // TODO: replace ["talous"] with already existing hierarchies
  const validationSchema = newHierarchySchema(
    ['talous'],
    t('hierarchy_already_exists')
  );

  const formObject = {
    hierarchy: '',
    nameFi: '',
    nameSv: '',
    nameEn: '',
    unit: null,
    publicity: false,
  };

  const headerRow = (
    <Stack alignItems="center" justifyContent="space-between" direction="row">
      <Typography component="p" variant="h4">
        {t('hierarchy_new')}
      </Typography>
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </Stack>
  );

  const onSubmit = (values) => {
    const hierarchy = {
      hierarchy: values.hierarchy,
      publicity: values.publicity,
    };
    const texts = ['Fi', 'En', 'Sv'].map((language) => ({
      key: values.hierarchy,
      value: values[`name${language}`],
    }));
    // saveHierarchy here, disptach notification on success and error
    // saveTexts here, dispatch notification on success and error
    return Promise.resolve({});
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="sm">
      <Form
        onSubmit={onSubmit}
        initialValues={formObject}
        validationSchema={validationSchema}
      >
        <DialogTitle>{headerRow}</DialogTitle>
        <Divider />
        <DialogContent>
          <Stack spacing={1}>
            <HierarchyField />
            <NameFields />
            <RootUnitField />
            <PublicityField />
          </Stack>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Actions onCancel={onClose} />
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default HierarchyForm;
