import React from 'react';
import { screen, render } from './testUtils';
import * as reactRedux from 'react-redux';
import userEvent from '@testing-library/user-event';
import Tree from '../src/components/Tree';

jest.spyOn(reactRedux, 'useDispatch');

// eslint-disable-next-line max-lines-per-function
jest.mock('../src/actions/treeAction', () => ({
    __esModule: true,
    // eslint-disable-next-line max-lines-per-function
    fetchTree: jest.fn(() => { return  {
        type: 'SUCCESS_API_GET_TREE',
        payload: {
            'tree': {
                'id': 42785051,
                'code': 'HY',
                'nameFi': 'Helsingin yliopisto',
                'nameEn': 'University of Helsinki',
                'nameSv': 'Helsingfors universitet',
                'displayNameFi': 'Helsingin yliopisto (HY)',
                'displayNameEn': 'University of Helsinki (HY)',
                'displayNameSv': 'Helsingfors universitet (HY)',
                'type': 'yritys_yhteiso',
                'abbreviation': 'HY',
                'children': [
                    {
                        'id': 33539259,
                        'code': 'KOULOHJ',
                        'nameFi': 'Koulutusohjelmat',
                        'nameEn': 'Degree Programmes',
                        'nameSv': 'Utbildningsprogram',
                        'displayNameFi': 'HY, Koulutusohjelmat (KOULOHJ)',
                        'displayNameEn': 'HY, Degree Programmes (KOULOHJ)',
                        'displayNameSv': 'HY, Utbildningsprogram (KOULOHJ)',
                        'type': 'koontiyksikko',
                        'abbreviation': 'KOULOHJ',
                        'parentAbbreviation': 'HY',
                        'children': [
                            {
                                'id': 54806742,
                                'code': 'H92',
                                'nameFi': 'Tohtoriohjelmat',
                                'nameEn': 'Doctoral Programmes',
                                'nameSv': 'Doktorandprogram',
                                'displayNameFi': 'HY, Tohtoriohjelmat (TRI)',
                                'displayNameEn': 'HY, Doctoral Programmes (TRI)',
                                'displayNameSv': 'HY, Doktorandprogram (TRI)',
                                'type': 'tiedekunnan kaltainen,koontiyksikko',
                                'abbreviation': 'TRI',
                                'parentAbbreviation': 'HY',
                                'children': [
                                    {
                                        'id': 61974091,
                                        'code': 'H920',
                                        'nameFi': 'Humanistis-yhteiskuntatieteellinen tutkijakoulu',
                                        'nameEn': 'Doctoral School in the Humanities and Social Sciences',
                                        'nameSv': 'Humanistisk-samhällsvetenskapliga forskarskolan',
                                        'displayNameFi': 'HY-TRI, Humanistis-yhteiskuntatieteellinen tutkijakoulu (HYMY)',
                                        'displayNameEn': 'HY-TRI, Doctoral School in the Humanities and Social Sciences (HYMY)',
                                        'displayNameSv': 'HY-TRI, Humanistisk-samhällsvetenskapliga forskarskolan (HYMY)',
                                        'type': 'tutkijakoulu',
                                        'abbreviation': 'HYMY',
                                        'parentAbbreviation': 'HY-TRI'
                                    }]
                            }]
                    }]
            },
        }
    };})
}));

jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate hook can use it without a warning being shown
    useTranslation: () => {
      return {
        t: (str) => str,
        i18n: {
          changeLanguage: () => new Promise(() => {}),
        },
      };
    },
}));

test('Tree renders', () => {
    render(<Tree />);
    const tree = screen.getByTestId('tree');
    expect(tree).toBeDefined();
});

test('There are two levels visible on default', () => {
    render(<Tree />);
    expect(screen.getByText('Helsingin yliopisto (HY)')).toBeInTheDocument;
    expect(screen.getByText('KOULOHJ HY, Koulutusohjelmat (KOULOHJ)')).toBeInTheDocument;    expect(() => screen.getByText('H920 Humanistis-yhteiskuntatieteellinen tutkijakoulu (HYMY)')).toThrow('Unable to find an element');
    expect(() => screen.getByText('H920 HY-TRI, Humanistis-yhteiskuntatieteellinen tutkijakoulu (HYMY)')).toThrow('Unable to find an element');
    expect(() => screen.getByText('H92 HY, Tohtoriohjelmat (TRI)')).toThrow('Unable to find an element');

});

test('Opening and closing tree levels', () => {
    render(<Tree />);
    expect(() => screen.getByText('H920 HY-TRI, Humanistis-yhteiskuntatieteellinen tutkijakoulu (HYMY)')).toThrow('Unable to find an element');
    let input = screen.getByTestId('arrowright');
    userEvent.click(input);
    input = screen.getByTestId('arrowright');
    userEvent.click(input);
    expect(() => screen.getByTestId('arrowright')).toThrow('Unable to find an element');
    expect(screen.getByText('Helsingin yliopisto (HY)')).toBeInTheDocument;
    expect(screen.getByText('KOULOHJ HY, Koulutusohjelmat (KOULOHJ)')).toBeInTheDocument;
    expect(screen.getByText('H920 HY-TRI, Humanistis-yhteiskuntatieteellinen tutkijakoulu (HYMY)')).toBeInTheDocument;
    expect(screen.getByText('H92 HY, Tohtoriohjelmat (TRI)')).toBeInTheDocument;
    input = screen.getAllByTestId('arrowdown');
    userEvent.click(input[0]);
    expect(() => screen.getByText('KOULOHJ HY, Koulutusohjelmat (KOULOHJ)')).toThrow('Unable to find an element');
});
