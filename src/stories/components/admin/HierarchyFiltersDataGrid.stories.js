/* eslint-disable max-lines */
import HierarchyFiltersDataGrid from '../../../components/admin/HierarchyFiltersDataGrid';
import Container from '@mui/material/Container';
import React from 'react';
import { withMockStore } from '../../../mockStore';

const data = [
  {
    id: 34243,
    hierarchy: 'henkilosto',
    key: 'henkilosto_osa-alue',
    value: null,
    startDate: '2023-04-10',
    endDate: null,
  },
  {
    id: 34242,
    hierarchy: 'henkilosto',
    key: 'henkilostoalue',
    value: null,
    startDate: '2023-04-10',
    endDate: null,
  },
  {
    id: 48,
    hierarchy: 'henkilosto',
    key: 'hr_lyhenne',
    value: null,
    startDate: null,
    endDate: null,
  },
  {
    id: 49,
    hierarchy: 'henkilosto',
    key: 'hr_tunnus',
    value: null,
    startDate: null,
    endDate: null,
  },
  {
    id: 34244,
    hierarchy: 'henkilosto',
    key: 'iam_ryhma',
    value: null,
    startDate: '2023-04-10',
    endDate: null,
  },
  {
    id: 19,
    hierarchy: 'henkilosto',
    key: 'type',
    value: 'erillinen laitos',
    startDate: null,
    endDate: '2023-03-06',
  },
  {
    id: 34289,
    hierarchy: 'henkilosto',
    key: 'type',
    value: 'henkilosto-osa-alue',
    startDate: null,
    endDate: null,
  },
  {
    id: 34288,
    hierarchy: 'henkilosto',
    key: 'type',
    value: 'henkilostoalue',
    startDate: null,
    endDate: null,
  },
  {
    id: 124,
    hierarchy: 'henkilosto',
    key: 'type',
    value: 'henkilostoyksikko',
    startDate: null,
    endDate: null,
  },
  {
    id: 9,
    hierarchy: 'henkilosto',
    key: 'type',
    value: 'koontiyksikko',
    startDate: null,
    endDate: null,
  },
  {
    id: 29,
    hierarchy: 'henkilosto',
    key: 'type',
    value: 'laitos',
    startDate: null,
    endDate: '2017-12-31',
  },
  {
    id: 24,
    hierarchy: 'henkilosto',
    key: 'type',
    value: 'osasto',
    startDate: '2018-01-01',
    endDate: '2023-03-06',
  },
  {
    id: 14,
    hierarchy: 'henkilosto',
    key: 'type',
    value: 'tiedekunta',
    startDate: null,
    endDate: '2023-03-06',
  },
  {
    id: 4,
    hierarchy: 'henkilosto',
    key: 'type',
    value: 'yritys_yhteiso',
    startDate: '2000-01-01',
    endDate: '2023-03-06',
  },
  {
    id: 32819,
    hierarchy: 'johto',
    key: 'iam_ryhma',
    value: null,
    startDate: '2023-03-29',
    endDate: null,
  },
  {
    id: 32743,
    hierarchy: 'johto',
    key: 'type',
    value: 'kandi_johtoryhma',
    startDate: '2023-03-22',
    endDate: null,
  },
  {
    id: 32842,
    hierarchy: 'johto',
    key: 'type',
    value: 'kansio',
    startDate: '2023-03-22',
    endDate: null,
  },
  {
    id: 32745,
    hierarchy: 'johto',
    key: 'type',
    value: 'maisteri_johtoryhma',
    startDate: '2023-03-22',
    endDate: null,
  },
  {
    id: 32765,
    hierarchy: 'johto',
    key: 'type',
    value: 'tohtori_johtoryhma',
    startDate: '2023-03-22',
    endDate: null,
  },
  {
    id: 32781,
    hierarchy: 'johto',
    key: 'type',
    value: 'yritys_yhteiso',
    startDate: '2023-03-22',
    endDate: null,
  },
  {
    id: 35690,
    hierarchy: 'laskutus',
    key: 'laskutus_tunnus',
    value: null,
    startDate: '2023-05-24',
    endDate: null,
  },
  {
    id: 35689,
    hierarchy: 'laskutus',
    key: 'mainari_tunnus',
    value: null,
    startDate: '2023-05-24',
    endDate: null,
  },
  {
    id: 46,
    hierarchy: 'opetus',
    key: 'oppiaine_tunnus',
    value: null,
    startDate: null,
    endDate: null,
  },
  {
    id: 17,
    hierarchy: 'opetus',
    key: 'type',
    value: 'erillinen laitos',
    startDate: null,
    endDate: null,
  },
  {
    id: 32272,
    hierarchy: 'opetus',
    key: 'type',
    value: 'erilliset opinnot',
    startDate: '2023-01-01',
    endDate: null,
  },
  {
    id: 38,
    hierarchy: 'opetus',
    key: 'type',
    value: 'kandiohjelma',
    startDate: null,
    endDate: null,
  },
  {
    id: 7,
    hierarchy: 'opetus',
    key: 'type',
    value: 'koontiyksikko',
    startDate: null,
    endDate: null,
  },
  {
    id: 27,
    hierarchy: 'opetus',
    key: 'type',
    value: 'laitos',
    startDate: null,
    endDate: '2017-12-31',
  },
  {
    id: 40,
    hierarchy: 'opetus',
    key: 'type',
    value: 'maisteriohjelma',
    startDate: null,
    endDate: null,
  },
  {
    id: 123,
    hierarchy: 'opetus',
    key: 'type',
    value: 'oppiaine',
    startDate: null,
    endDate: null,
  },
  {
    id: 22,
    hierarchy: 'opetus',
    key: 'type',
    value: 'osasto',
    startDate: '2018-01-01',
    endDate: null,
  },
  {
    id: 12,
    hierarchy: 'opetus',
    key: 'type',
    value: 'tiedekunta',
    startDate: null,
    endDate: null,
  },
  {
    id: 43,
    hierarchy: 'opetus',
    key: 'type',
    value: 'tohtoriohjelma',
    startDate: null,
    endDate: null,
  },
  {
    id: 36,
    hierarchy: 'opetus',
    key: 'type',
    value: 'tutkijakoulu',
    startDate: null,
    endDate: null,
  },
  {
    id: 34245,
    hierarchy: 'talous',
    key: 'iam_ryhma',
    value: null,
    startDate: '2023-04-10',
    endDate: null,
  },
  {
    id: 45,
    hierarchy: 'talous',
    key: 'talous_tunnus',
    value: null,
    startDate: null,
    endDate: null,
  },
  {
    id: 16,
    hierarchy: 'talous',
    key: 'type',
    value: 'erillinen laitos',
    startDate: null,
    endDate: '2023-03-12',
  },
  {
    id: 6,
    hierarchy: 'talous',
    key: 'type',
    value: 'koontiyksikko',
    startDate: null,
    endDate: null,
  },
  {
    id: 26,
    hierarchy: 'talous',
    key: 'type',
    value: 'laitos',
    startDate: null,
    endDate: '2017-12-31',
  },
  {
    id: 21,
    hierarchy: 'talous',
    key: 'type',
    value: 'osasto',
    startDate: '2018-01-01',
    endDate: null,
  },
  {
    id: 32688,
    hierarchy: 'talous',
    key: 'type',
    value: 'talousvastuullinen yksikko',
    startDate: '2023-03-13',
    endDate: null,
  },
  {
    id: 11,
    hierarchy: 'talous',
    key: 'type',
    value: 'tiedekunta',
    startDate: null,
    endDate: '2023-03-12',
  },
  {
    id: 31,
    hierarchy: 'talous',
    key: 'type',
    value: 'tulosyksikko',
    startDate: null,
    endDate: null,
  },
  {
    id: 34,
    hierarchy: 'talous',
    key: 'type',
    value: 'tutkijakoulu',
    startDate: null,
    endDate: '2023-03-12',
  },
  {
    id: 32716,
    hierarchy: 'talous',
    key: 'type',
    value: 'yritys_yhteiso',
    startDate: null,
    endDate: null,
  },
  {
    id: 35715,
    hierarchy: 'toiminnanohjaus',
    key: 'iam-johtoryhma',
    value: null,
    startDate: null,
    endDate: null,
  },
  {
    id: 32822,
    hierarchy: 'toiminnanohjaus',
    key: 'iam_ryhma',
    value: null,
    startDate: null,
    endDate: null,
  },
  {
    id: 32633,
    hierarchy: 'toiminnanohjaus',
    key: 'laskutus_tunnus',
    value: null,
    startDate: null,
    endDate: '2023-05-29',
  },
  {
    id: 32635,
    hierarchy: 'toiminnanohjaus',
    key: 'publicity',
    value: 'julkinen',
    startDate: null,
    endDate: null,
  },
  {
    id: 20,
    hierarchy: 'toiminnanohjaus',
    key: 'type',
    value: 'erillinen laitos',
    startDate: null,
    endDate: null,
  },
  {
    id: 39,
    hierarchy: 'toiminnanohjaus',
    key: 'type',
    value: 'kandiohjelma',
    startDate: null,
    endDate: null,
  },
  {
    id: 10,
    hierarchy: 'toiminnanohjaus',
    key: 'type',
    value: 'koontiyksikko',
    startDate: null,
    endDate: null,
  },
  {
    id: 30,
    hierarchy: 'toiminnanohjaus',
    key: 'type',
    value: 'laitos',
    startDate: '2000-01-01',
    endDate: '2017-12-31',
  },
  {
    id: 32496,
    hierarchy: 'toiminnanohjaus',
    key: 'type',
    value: 'lakiin-perustuva-laitos',
    startDate: null,
    endDate: null,
  },
  {
    id: 41,
    hierarchy: 'toiminnanohjaus',
    key: 'type',
    value: 'maisteriohjelma',
    startDate: null,
    endDate: null,
  },
  {
    id: 25,
    hierarchy: 'toiminnanohjaus',
    key: 'type',
    value: 'osasto',
    startDate: '2018-01-01',
    endDate: '2022-12-31',
  },
  {
    id: 32489,
    hierarchy: 'toiminnanohjaus',
    key: 'type',
    value: 'palveluyksikko',
    startDate: null,
    endDate: null,
  },
  {
    id: 34290,
    hierarchy: 'toiminnanohjaus',
    key: 'type',
    value: 'tdk-alainen-erillinen-laitos',
    startDate: null,
    endDate: null,
  },
  {
    id: 32500,
    hierarchy: 'toiminnanohjaus',
    key: 'type',
    value: 'tdk-yhteinen-toimintayksikko',
    startDate: null,
    endDate: null,
  },
  {
    id: 15,
    hierarchy: 'toiminnanohjaus',
    key: 'type',
    value: 'tiedekunta',
    startDate: null,
    endDate: null,
  },
  {
    id: 44,
    hierarchy: 'toiminnanohjaus',
    key: 'type',
    value: 'tohtoriohjelma',
    startDate: null,
    endDate: null,
  },
  {
    id: 32603,
    hierarchy: 'toiminnanohjaus',
    key: 'type',
    value: 'toimintayksikko',
    startDate: null,
    endDate: null,
  },
  {
    id: 37,
    hierarchy: 'toiminnanohjaus',
    key: 'type',
    value: 'tutkijakoulu',
    startDate: null,
    endDate: null,
  },
  {
    id: 32494,
    hierarchy: 'toiminnanohjaus',
    key: 'type',
    value: 'ulkopuolisten-kanssa-yhteinen-laitos',
    startDate: null,
    endDate: null,
  },
  {
    id: 31831,
    hierarchy: 'toiminnanohjaus',
    key: 'type',
    value: 'yksikko',
    startDate: null,
    endDate: null,
  },
  {
    id: 5,
    hierarchy: 'toiminnanohjaus',
    key: 'type',
    value: 'yritys_yhteiso',
    startDate: null,
    endDate: null,
  },
  {
    id: 32634,
    hierarchy: 'tutkimus',
    key: 'publicity',
    value: 'julkinen',
    startDate: null,
    endDate: null,
  },
  {
    id: 47,
    hierarchy: 'tutkimus',
    key: 'tutkimus_tunnus',
    value: null,
    startDate: null,
    endDate: null,
  },
  {
    id: 18,
    hierarchy: 'tutkimus',
    key: 'type',
    value: 'erillinen laitos',
    startDate: null,
    endDate: null,
  },
  {
    id: 8,
    hierarchy: 'tutkimus',
    key: 'type',
    value: 'koontiyksikko',
    startDate: null,
    endDate: null,
  },
  {
    id: 28,
    hierarchy: 'tutkimus',
    key: 'type',
    value: 'laitos',
    startDate: null,
    endDate: '2017-12-31',
  },
  {
    id: 32604,
    hierarchy: 'tutkimus',
    key: 'type',
    value: 'lakiin-perustuva-laitos',
    startDate: null,
    endDate: null,
  },
  {
    id: 32627,
    hierarchy: 'tutkimus',
    key: 'type',
    value: 'oppiaine',
    startDate: null,
    endDate: null,
  },
  {
    id: 23,
    hierarchy: 'tutkimus',
    key: 'type',
    value: 'osasto',
    startDate: '2018-01-01',
    endDate: null,
  },
  {
    id: 32605,
    hierarchy: 'tutkimus',
    key: 'type',
    value: 'palveluyksikko',
    startDate: null,
    endDate: null,
  },
  {
    id: 32606,
    hierarchy: 'tutkimus',
    key: 'type',
    value: 'tdk-yhteinen-toimintayksikko',
    startDate: null,
    endDate: null,
  },
  {
    id: 13,
    hierarchy: 'tutkimus',
    key: 'type',
    value: 'tiedekunta',
    startDate: null,
    endDate: null,
  },
  {
    id: 42,
    hierarchy: 'tutkimus',
    key: 'type',
    value: 'tohtoriohjelma',
    startDate: null,
    endDate: null,
  },
  {
    id: 32607,
    hierarchy: 'tutkimus',
    key: 'type',
    value: 'toimintayksikko',
    startDate: null,
    endDate: null,
  },
  {
    id: 35,
    hierarchy: 'tutkimus',
    key: 'type',
    value: 'tutkijakoulu',
    startDate: null,
    endDate: null,
  },
  {
    id: 33,
    hierarchy: 'tutkimus',
    key: 'type',
    value: 'tutkimusryhma',
    startDate: null,
    endDate: null,
  },
  {
    id: 32,
    hierarchy: 'tutkimus',
    key: 'type',
    value: 'tutkimusyhteiso',
    startDate: null,
    endDate: null,
  },
  {
    id: 32626,
    hierarchy: 'tutkimus',
    key: 'type',
    value: 'ulkopuolisten-kanssa-yhteinen-laitos',
    startDate: null,
    endDate: null,
  },
  {
    id: 3,
    hierarchy: 'tutkimus',
    key: 'type',
    value: 'yritys_yhteiso',
    startDate: null,
    endDate: null,
  },
  {
    id: 34264,
    hierarchy: 'uusi_henkilosto',
    key: 'henkilosto_osa-alue',
    value: null,
    startDate: '2023-04-01',
    endDate: null,
  },
  {
    id: 34271,
    hierarchy: 'uusi_henkilosto',
    key: 'henkilostoalue',
    value: null,
    startDate: '2023-04-01',
    endDate: null,
  },
  {
    id: 34265,
    hierarchy: 'uusi_henkilosto',
    key: 'hr_lyhenne',
    value: null,
    startDate: '2023-04-01',
    endDate: null,
  },
  {
    id: 34267,
    hierarchy: 'uusi_henkilosto',
    key: 'iam_ryhma',
    value: null,
    startDate: '2023-04-01',
    endDate: null,
  },
  {
    id: 34270,
    hierarchy: 'uusi_henkilosto',
    key: 'type',
    value: 'henkilostoyksikko',
    startDate: '2023-04-01',
    endDate: null,
  },
  {
    id: 34847,
    hierarchy: 'uusi_henkilosto',
    key: 'type',
    value: 'linjayksikko',
    startDate: '2023-04-01',
    endDate: null,
  },
  {
    id: 34845,
    hierarchy: 'uusi_henkilosto',
    key: 'type',
    value: 'yritys_yhteiso',
    startDate: '2023-04-01',
    endDate: null,
  },
];

export default {
  component: HierarchyFiltersDataGrid,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [withMockStore()],
};

export const Default = {
  args: {
    initialRows: data,
  },
  decorators: [
    // Use same width for the container as in Sketch so that screenshots fit nicely
    (Story) => (
      <Container sx={{ pt: 6, pb: 6, maxWidth: 1440 }}>
        <Story />
      </Container>
    ),
  ],
};

export const Empty = {
  args: {
    initialRows: [],
  },
};
