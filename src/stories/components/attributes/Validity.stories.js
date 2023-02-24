import Validity from '../../../components/attributes/Validity';

export default {
  component: Validity,
};

export const Default = {
  args: {
    startDate: '2022-01-01',
    endDate: '2022-12-31',
  },
};

export const From = {
  args: {
    startDate: '2022-01-01',
    endDate: null,
  },
};

export const Until = {
  args: {
    startDate: null,
    endDate: '2022-12-31',
  },
};

export const Undefined = {
  args: {
    startDate: null,
    endDate: null,
  },
};
