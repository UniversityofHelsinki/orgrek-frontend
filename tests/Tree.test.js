import React from 'react';
import { screen, render } from './testUtils';
import userEvent from '@testing-library/user-event';
import Tree from '../src/components/Tree';

jest.mock('../src/hooks/useTree', () => () => ({
  isFetching: false,
  tree: [
    {
      fi: {
        id: 'a1',
        name: 'Helsingin yliopisto (HY)',
        uniqueId: 42785051,
        hierarchies: ['talous'],
        children: [
          {
            id: 123,
            name: 'KOULOHJ HY, Koulutusohjelmat (KOULOHJ)',
            uniqueId: 33539259,
            hierarchies: ['talous'],
            children: [
              {
                id: 1234,
                name: 'H92 HY, Tohtoriohjelmat (TRI)',
                uniqueId: 54806742,
                hierarchies: ['talous'],
                children: [
                  {
                    id: 12345,
                    name: 'H920 HY-TRI, Humanistis-yhteiskuntatieteellinen tutkijakoulu (HYMY)',
                    uniqueId: 61974091,
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  ],
}));

jest.mock('../src/reducers/treeReducer', () => {
  const originalModule = jest.requireActual('../src/reducers/treeReducer');
  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(
      (
        state = {
          selectedHierarchy: 'talous',
          defaultHierarchy: 'talous',
          selectableHierarchies: [],
        },
        action
      ) => {
        switch (action.type) {
          case 'SUCCESS_API_GET_SELECTABLE_HIERARCHIES':
            return {
              ...state,
              selectableHierarchies: action.payload,
            };
          case 'SWITCH_HIERARCHY':
            return {
              ...state,
              selectedHierarchy: action.payload,
            };
          default:
            return state;
        }
      }
    ),
  };
});

test('Tree renders', () => {
  render(<Tree />);
  const tree = screen.getByTestId('tree');
  expect(tree).toBeDefined();
});

test.skip('There are two levels visible on default', () => {
  render(<Tree />);
  expect(screen.getByText('Helsingin yliopisto (HY)')).toBeInTheDocument;
  expect(screen.getByText('KOULOHJ HY, Koulutusohjelmat (KOULOHJ)'))
    .toBeInTheDocument;
  expect(() =>
    screen.getByText(
      'H920 Humanistis-yhteiskuntatieteellinen tutkijakoulu (HYMY)'
    )
  ).toThrow('Unable to find an element');
  expect(() =>
    screen.getByText(
      'H920 HY-TRI, Humanistis-yhteiskuntatieteellinen tutkijakoulu (HYMY)'
    )
  ).toThrow('Unable to find an element');
  expect(() => screen.getByText('H92 HY, Tohtoriohjelmat (TRI)')).toThrow(
    'Unable to find an element'
  );
});

test.skip('Opening and closing tree levels', async () => {
  render(<Tree />);
  expect(() =>
    screen.getByText(
      'H920 HY-TRI, Humanistis-yhteiskuntatieteellinen tutkijakoulu (HYMY)'
    )
  ).toThrow('Unable to find an element');
  let input = screen.getByTestId('arrowright');
  await userEvent.click(input);
  input = screen.getByTestId('arrowright');
  await userEvent.click(input);
  expect(() => screen.getByTestId('arrowright')).toThrow(
    'Unable to find an element'
  );
  expect(screen.getByText('Helsingin yliopisto (HY)')).toBeInTheDocument;
  expect(screen.getByText('KOULOHJ HY, Koulutusohjelmat (KOULOHJ)'))
    .toBeInTheDocument;
  expect(
    screen.getByText(
      'H920 HY-TRI, Humanistis-yhteiskuntatieteellinen tutkijakoulu (HYMY)'
    )
  ).toBeInTheDocument;
  expect(screen.getByText('H92 HY, Tohtoriohjelmat (TRI)')).toBeInTheDocument;
  input = screen.getAllByTestId('arrowdown');
  await userEvent.click(input[0]);
  expect(() =>
    screen.getByText('KOULOHJ HY, Koulutusohjelmat (KOULOHJ)')
  ).toThrow('Unable to find an element');
});
