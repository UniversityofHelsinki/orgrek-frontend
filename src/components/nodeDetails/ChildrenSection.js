import React, { useState } from 'react';
import EditableAccordion from '../EditableAccordion';
import { useTranslation } from 'react-i18next';
import useHierarchy from '../../hooks/useHierarchy';
import HierarchyTable from '../attributes/HierarchyTable';
import useContentLanguage from '../../hooks/useContentLanguage';
import Placeholder from '../Placeholder';
import { Stack } from '@mui/material';
import { showNotification, useSaveChildMutation } from '../../store';
import { useDispatch } from 'react-redux';
import { useNodeId } from '../../hooks/useNodeId';
import { authActions } from '../../auth';
import IfAuthorized from '../../auth/IfAuthorized';
import ActionBar from './ActionBar';
import Button from '../inputs/Button';
import NewUnitForm from './NewUnitForm';

const EditAction = ({ newChild, edit }) => {
  const { t } = useTranslation();
  return (
    <IfAuthorized action={authActions.children.edit}>
      <ActionBar>
        <Button variant="outlined" onClick={newChild} data-testid="editButton">
          {t('subunits.newChildButton')}
        </Button>
      </ActionBar>
    </IfAuthorized>
  );
};

const ChildrenSection = () => {
  const { t } = useTranslation();
  const { children } = useHierarchy();
  const nodeId = useNodeId();
  const contentLanguage = useContentLanguage();
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const [saveChild] = useSaveChildMutation();

  const data = children[contentLanguage] || [];
  const title = t('subunits.title');
  const empty = data.length === 0;

  const handleSubmit = (child) => {
    return saveChild({ data: child, id: nodeId })
      .unwrap()
      .then((response) => {
        dispatch(
          showNotification({
            message: t('subunits.createSuccess'),
            severity: 'success',
          })
        );
        setShowForm(false);
      })
      .catch((error) => {
        dispatch(
          showNotification({
            message: t('subunits.createError'),
            severity: 'error',
          })
        );
      });
  };

  const formElement = showForm ? (
    <NewUnitForm
      open={showForm}
      onClose={() => setShowForm(false)}
      handleSubmit={handleSubmit}
    />
  ) : (
    <></>
  );

  return (
    <EditableAccordion title={title}>
      <Stack spacing={2}>
        <EditAction newChild={() => setShowForm(true)} />
        <Placeholder empty={empty} placeholder={t('subunits.empty')}>
          <HierarchyTable data={data} summary={title} />
        </Placeholder>
        {formElement}
      </Stack>
    </EditableAccordion>
  );
};

export default ChildrenSection;
