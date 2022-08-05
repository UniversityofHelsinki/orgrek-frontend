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
            fi: {
                'id': 'a1',
                'name': 'Helsingin yliopisto (HY)',
                'uniqueId': 42785051,
                'hierarchies': ['talous'],
                'children': [
                    {
                        'id': 123,
                        'name': 'KOULOHJ HY, Koulutusohjelmat (KOULOHJ)',
                        'uniqueId' : 33539259,
                        'hierarchies': ['talous'],
                        'children': [
                            {
                                'id': 1234,
                                'name': 'H92 HY, Tohtoriohjelmat (TRI)',
                                'uniqueId': 54806742,
                                'hierarchies': ['talous'],
                                'children': [
                                    {
                                        'id': 12345,
                                        'name': 'H920 HY-TRI, Humanistis-yhteiskuntatieteellinen tutkijakoulu (HYMY)',
                                        'uniqueId': 61974091
                                    }]
                            }]
                    }]
        } }
    };})
}));

jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate hook can use it without a warning being shown
    useTranslation: () => {
      return {
        t: (str) => str,
        i18n: {
          changeLanguage: () => new Promise(() => {}),
          language: 'fi'
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
