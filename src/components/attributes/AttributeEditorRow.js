import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Grow from '@mui/material/Grow';
import DeletedAttributeRow from './DeletedAttributeRow';
import { getValueDescription } from '../../utils/attributeUtils';
import DeletedAttributeRowActions from './DeletedAttributeRowActions';
import AttributeEditorRowActions from './AttributeEditorRowActions';
import ValueField from './ValueField';
import StartDateField from './StartDateField';
import EndDateField from './EndDateField';
import useForm from '../../hooks/useForm';
import get from 'lodash/get';

/**
 * Edits a single attribute value with a start date and an end date.
 *
 * By default, uses TextField for editing the value but this can be customized
 * by passing a custom render function as renderValueField prop.
 */
const AttributeEditorRow = ({
  valueLabel,
  path,
  onChange,
  onInsertBefore,
  onInsertAfter,
  fields,
  renderValueField,
  getDisplayText,
}) => {
  // True after user has interacted with the row
  const [touched, setTouched] = useState(false);
  const { values, errors } = useForm();

  const value = get(values, path);

  if (!value) {
    throw new Error(`Value at path ${path} not found`);
  }

  const handleDelete = () => {
    setTouched(true);
    onChange({
      ...value,
      deleted: true,
    });
  };

  const handleUndoDelete = () => {
    setTouched(true);
    onChange({
      ...value,
      deleted: false,
    });
  };

  const valueDescription = getValueDescription({
    value,
    displayText: getDisplayText ? getDisplayText(value) : value.value,
    withValidity: true,
  });

  let renderedRow;
  let renderedActions;

  if (value.deleted) {
    renderedRow = (
      <Grid xs={12}>
        <DeletedAttributeRow value={value} getDisplayText={getDisplayText} />
      </Grid>
    );

    renderedActions = (
      <DeletedAttributeRowActions
        onUndoDelete={handleUndoDelete}
        valueDescription={valueDescription}
        sx={{ pt: 1 }}
      />
    );
  } else {
    const defaultFields = [
      {
        name: 'value',
        label: valueLabel,
        gridProps: { xs: 12, sm: 12, md: 6 },
        render: (props) => (
          <ValueField {...props} renderValueField={renderValueField} />
        ),
      },
      {
        name: 'startDate',
        gridProps: { xs: 12, sm: 6, md: 3 },
        render: (props) => <StartDateField {...props} />,
      },
      {
        name: 'endDate',
        gridProps: { xs: 12, sm: 6, md: 3 },
        render: (props) => <EndDateField {...props} />,
      },
    ];

    const getDefaultFieldByName = (name) =>
      defaultFields.find((f) => f.name === name);

    const getFieldConfig = (field) => {
      if (typeof field === 'string') {
        const defaultField = getDefaultFieldByName(field);

        if (!defaultField) {
          throw new Error(`Unknown field name '${name}'`);
        }

        return defaultField;
      } else if (field.name) {
        return { ...getDefaultFieldByName(field.name), ...field };
      } else {
        return field;
      }
    };

    const renderField = (field, index) => {
      if (!field.name) {
        throw new Error(`Field ${index} must have a name`);
      }

      if (typeof field.render !== 'function') {
        throw new Error(`Field ${field.name} must have a render function`);
      }

      const props = {
        label: field.label,
        helperText: field.helperText,
        path,
        value,
        errors,
        onChange,
      };

      return (
        <Grid key={field.name} {...field.gridProps}>
          {field.render(props)}
        </Grid>
      );
    };

    renderedRow = (fields || defaultFields)
      .map(getFieldConfig)
      .map(renderField);

    renderedActions = (
      <AttributeEditorRowActions
        onInsertBefore={onInsertBefore}
        onInsertAfter={onInsertAfter}
        onDelete={handleDelete}
        valueDescription={valueDescription}
        sx={{ pt: 1 }}
      />
    );
  }

  return (
    <Box
      sx={{
        '&:last-of-type': {
          marginBottom: 0,
        },
        '.actions': {
          // Apply hover effect to actions only in desktop
          opacity: { xs: 1, md: 0 },
        },
        ':hover .actions, :focus-within .actions, .actions.menuOpen': {
          opacity: 1,
        },
      }}
    >
      <Stack direction="row" spacing={1}>
        <Grow in appear={value.isNew || touched} key={value.deleted}>
          <Grid
            flex="auto"
            container
            xs="auto"
            rowSpacing={2}
            columnSpacing={2}
          >
            {renderedRow}
          </Grid>
        </Grow>
        {renderedActions}
      </Stack>
    </Box>
  );
};

AttributeEditorRow.propTypes = {
  /**
   * Label of the value text field.
   *
   * @deprecated use fields prop instead
   */
  valueLabel: PropTypes.string,

  /** The path in form values where to look for validation schema and errors */
  path: PropTypes.string.isRequired,

  /** Called when the value changes, taking the new value as the first argument */
  onChange: PropTypes.func.isRequired,

  /** Called when 'insert row before' action is clicked */
  onInsertBefore: PropTypes.func.isRequired,

  /** Called when 'insert row after' action is clicked */
  onInsertAfter: PropTypes.func.isRequired,

  /** Allows customizing how the row is rendered. */
  fields: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        label: PropTypes.string,
        gridProps: PropTypes.object,
        render: PropTypes.func,
      }),
    ])
  ),

  /**
   * Allows customizing how the value field is rendered.
   *
   * The first argument of this function contains default props that should be
   * passed to TextField
   *
   * @deprecated use fields prop instead
   */
  renderValueField: PropTypes.func,

  /**
   * Specifies how the value should be displayed in view mode and a11y
   * description.
   *
   * Takes an attribute object as the first arg and returns the display text as
   * string.
   */
  getDisplayText: PropTypes.func,
};

export default AttributeEditorRow;
