import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import useFetchNode from '../../hooks/useFetchNode';
import { Form } from '../../contexts/FormContext';
import StartDateField from '../attributes/StartDateField';
import ValueField from '../attributes/ValueField';
import useForm from '../../hooks/useForm';
import { newNodeValiditySchema } from '../../utils/validations';
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
import useHierarchies from '../../hooks/useHierarchies';
import useFavorableName from '../../hooks/useFavorableName';

const ContentHeader = ({ value }) => {
  return (
    <Typography component="legend" variant="h6" mb={2}>
      {value}
    </Typography>
  );
};

const ValidFromField = () => {
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
};

const NameFields = () => {
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
};

const Hierarchies = ({ hierarchies }) => {
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
};

const Node = () => {
  const currentNode = useFetchNode();
  const favorableName = useFavorableName(currentNode.uniqueId);
  const { t } = useTranslation();
  return (
    <Box>
      <ContentHeader value={t('subunits.parent')} />
      <Typography variant="body1">{favorableName}</Typography>
    </Box>
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

const NewUnitForm = ({ open, onClose, handleSubmit }) => {
  const { t } = useTranslation();
  const validationSchema = newNodeValiditySchema;
  const [selectedHierarchies] = useHierarchies();

  const today = new Date();
  const emptyNode = {
    hierarchies: selectedHierarchies,
    startDate: today,
    endDate: null,
    nameFi: '',
    nameEn: '',
    nameSv: '',
  };

  const headerRow = (
    <Stack alignItems="center" justifyContent="space-between" direction="row">
      <Typography component="p" variant="h4">
        {t('subunits.createChild')}
      </Typography>
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </Stack>
  );

  const stickyChildren = (
    <Stack spacing={2}>
      <Node />
      <Hierarchies hierarchies={selectedHierarchies} />
    </Stack>
  );

  const content = (
    <Stack spacing={2}>
      <ValidFromField />
      <NameFields />
    </Stack>
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="sm">
      <Form
        onSubmit={handleSubmit}
        initialValues={emptyNode}
        validationSchema={validationSchema}
        sx={{ overflowY: 'auto' }}
      >
        <DialogTitle>{headerRow}</DialogTitle>
        <Divider />
        <DialogContent
          sx={{
            backgroundColor: 'white',
            position: 'sticky',
            top: 0,
            zIndex: 30,
          }}
        >
          {stickyChildren}
        </DialogContent>
        <DialogContent>{content}</DialogContent>
        <Divider />
        <DialogActions>
          <Actions onCancel={onClose} />
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default NewUnitForm;
