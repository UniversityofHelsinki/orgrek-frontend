import HelperText from '../../../components/inputs/HelperText';

export default {
  component: HelperText,
};

export const Default = {
  args: {
    helperText: 'Assistive text',
    errors: [],
  },
};

export const Error = {
  args: {
    helperText: 'Assistive text',
    errors: ['Error text'],
  },
};

export const Multiline = {
  args: {
    helperText: 'Assistive text',
    errors: ['Error 1', 'Error 2'],
  },
};

export const Empty = {
  args: {
    helperText: '',
    errors: [],
  },
};
