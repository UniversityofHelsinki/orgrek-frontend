import AttributesTable from '../../../components/attributes/AttributesTable';

export default {
  component: AttributesTable,
};

export const Default = {
  args: {
    summary: 'Nimitiedot',
    data: [
      {
        id: 4821,
        nodeId: '4820',
        key: 'name_en',
        value: 'IT Solutions',
        startDate: null,
        endDate: null,
      },
      {
        id: 4822,
        nodeId: '4820',
        key: 'name_sv',
        value: 'Datatekniklösningar',
        startDate: null,
        endDate: null,
      },
      {
        id: 4826,
        nodeId: '4820',
        key: 'name_fi',
        value: 'Tietotekniikkaratkaisut',
        startDate: null,
        endDate: null,
      },
    ],
  },
};

export const DuplicateKey = {
  args: {
    summary: 'Duplicate key and validity',
    data: [
      {
        id: 1001,
        nodeId: '1',
        key: 'lyhenne',
        value: 'value1',
        startDate: null,
        endDate: null,
      },
      {
        id: 1001,
        nodeId: '1',
        key: 'lyhenne',
        value: 'value2',
        startDate: null,
        endDate: null,
      },
    ],
  },
};
