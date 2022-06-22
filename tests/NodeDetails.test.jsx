import React from 'react';
//import { render } from './testUtils';
import store from '../src/store';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import * as ReactDOM from 'react-dom';
import NodeDetails from '../src/components/NodeDetails';
import * as dayChangeReducer from '../src/reducers/dayChangeReducer';

jest.mock('../src/actions/nodeAction', () => ({
    fetchNodeAttributes: () => ({
        type: 'MOCK_NODE_ATTRIBUTES',
        payload: JSON.parse(`[
                {
                    "key": "name_fi",
                    "value": "Menneisyyden nimi",
                    "startDate": "1780-01-01T00:00:00+00:00",
                    "endDate": "1800-01-01T00:00:00+00:00",
                    "nodeId": "a1"
                },
                {
                    "key": "name_fi",
                    "value": "Nykyisyyden nimi",
                    "startDate": "2020-01-01T00:00:00+00:00",
                    "endDate": "2030-01-01T00:00:00+00:00",
                    "nodeId": "a1"
                },
                {
                    "key": "name_fi",
                    "value": "Tulevaisuuden nimi",
                    "startDate": "2040-01-01T00:00:00+00:00",
                    "endDate": "2050-01-01T00:00:00+00:00",
                    "nodeId": "a1"
                },
                {
                    "key": "lyhenne",
                    "value": "FUTURE",
                    "startDate": "2050-01-01T00:00:00+00:00",
                    "endDate": null,
                    "nodeId": "a1"
                },
                {
                    "key": "emo_lyhenne",
                    "value": "EMO_FUTURE",
                    "startDate": "2050-01-01T00:00:00+00:00",
                    "endDate": null,
                    "nodeId": "a1"
                },
                {
                    "key": "mainari_lyhenne",
                    "value": "AINA_VOIMASSA",
                    "startDate": null,
                    "endDate": null,
                    "nodeId": "a1"
                }
            ]`)
    }),
    fetchNodePredecessors: () => ({
        type: 'MOCK_NODE_PREDECESSORS',
        payload: JSON.parse(`[
                {
                    "node": null,
                    "nodeEdgeHistoryWrapper": {
                        "id": "9999",
                        "name": "edeltäjä",
                        "startDate": null,
                        "endDate": null,
                        "edgeStartDate": "1980-01-01T00:00:00+00:00",
                        "edgeEndDate": "1991-01-01T00:00:00+00:00",
                        "uniqueId": 12312312
                    },
                    "attributes": [],
                    "hierarchies": null,
                    "displayNameFi": "edeltäjä (EDELTÄJÄ)"
                }
            ]`)
    }),
    fetchNodeSuccessors: () => ({
        type: 'MOCK_NODE_SUCCESSORS',
        payload: JSON.parse(`[
                {
                    "node": null,
                    "nodeEdgeHistoryWrapper": {
                        "id": "9999",
                        "name": "seuraaja",
                        "startDate": null,
                        "endDate": null,
                        "edgeStartDate": null,
                        "edgeEndDate": "2080-01-01T00:00:00+00:00",
                        "uniqueId": 12312312
                    },
                    "attributes": [],
                    "hierarchies": null,
                    "displayNameFi": "seuraaja (SEURAAJA)"
                }
            ]
        `)
    }),
}));

jest.mock('../src/actions/hierarchyAction', () => ({
    fetchNodeParents: () => ({
        type: 'MOCK_NODE_PARENTS',
        payload: JSON.parse(`[
            {
                "node": {
                    "id": "2345",
                    "name": "aina-voimassa-yläyksikkö",
                    "startDate": null,
                    "endDate": null,
                    "timestamp": "2017-12-28T10:46:27.695+00:00",
                    "uniqueId": 22211122
                },
                "nodeEdgeHistoryWrapper": null,
                "hierarchies": [
                    {"nodeId":"2345","type":"tutkimus","startDate":null,"endDate":null},
                    {"nodeId":"2345","type":"opetus","startDate":null,"endDate":null}
                ],
                "attributes": [
                    {"nodeId":"2345","key":"talous_tunnus","value":"aina-voimassa-taloustunnus","startDate":null,"endDate":null}
                ],
                "displayNameFi": "aina-voimassa-yläyksikkö (DNMFI)"
            },
            {
                "node": {
                    "id": "2346",
                    "name": "menneisyyden-yläyksikkö",
                    "startDate": "1780-01-01T00:00:00+00:00",
                    "endDate": "1800-01-01T00:00:00+00:00",
                    "timestamp": "2017-12-28T10:46:27.695+00:00",
                    "uniqueId": 22211133
                },
                "nodeEdgeHistoryWrapper": null,
                "hierarchies": [
                    { "nodeId":"6770", "type":"tutkimus", "startDate": "1780-01-01T00:00:00+00:00", "endDate":"1800-01-01T00:00:00+00:00" }
                ],
                "attributes": [
                    {"nodeId":"2345","key":"talous_tunnus","value":"aina-voimassa-taloustunnus","startDate":null,"endDate":null}
                ],
                "displayNameFi": "menneisyyden-yläyksikkö (DNMFI)"
            }]`)
    }),
    fetchNodeChildren: () => ({
        type: 'MOCK_NODE_CHILDREN',
        payload: JSON.parse('[{"node":{"id":"16420","name":"Luonnontieteiden kandiohjelma","startDate":"2018-08-01T00:00:00.000+00:00","endDate":null,"timestamp":"2021-05-11T19:50:48.106+00:00","uniqueId":75819821},"nodeEdgeHistoryWrapper":null,"hierarchies":[{"nodeId":"16420","type":"toiminnanohjaus","startDate":"2018-08-01T00:00:00.000+00:00","endDate":"2030-12-31T00:00:00.000+00:00"},{"nodeId":"16420","type":"opetus","startDate":"2018-08-01T00:00:00.000+00:00","endDate":"2030-12-31T00:00:00.000+00:00"}],"attributes":[{"nodeId":"16420","key":"name_en","value":"Bachelor´s Programme in Science","startDate":"2018-08-01T00:00:00.000+00:00","endDate":null},{"nodeId":"16420","key":"name_fi","value":"Luonnontieteiden kandiohjelma","startDate":"2018-08-01T00:00:00.000+00:00","endDate":null},{"nodeId":"16420","key":"name_sv","value":"Kandidatprogrammet i naturvetenskaper","startDate":"2018-08-01T00:00:00.000+00:00","endDate":null},{"nodeId":"16420","key":"oppiaine_tunnus","value":"500-K008","startDate":"2018-08-01T00:00:00.000+00:00","endDate":null},{"nodeId":"16420","key":"type","value":"kandiohjelma","startDate":"2018-08-01T00:00:00.000+00:00","endDate":null},{"nodeId":"16420","key":"iam-johtoryhma","value":"hy-mltdk-bsc-jory","startDate":"2022-03-01T00:00:00.000+00:00","endDate":null},{"nodeId":"16420","key":"lyhenne","value":"BSC","startDate":null,"endDate":null}],"displayNameFi":"Luonnontieteiden kandiohjelma (BSC)","displayNameSv":"Kandidatprogrammet i naturvetenskaper (BSC)","displayNameEn":"Bachelor´s Programme in Science (BSC)"}]')
    }),
}));

jest.mock('../src/reducers/nodeReducer', () => ({
    __esModule: true,
    default: (state = { node: node(null, new Date('1991-01-01T00:00:00+00:00')) }, action) => {
        switch (action.type) {
            case 'MOCK_NODE_ATTRIBUTES':
                return {
                    ...state,
                    nodeAttributes: action.payload
                };
            case 'MOCK_NODE_PREDECESSORS':
                return {
                    ...state,
                    nodePredecessors: action.payload
                };
            case 'MOCK_NODE_SUCCESSORS':
                return {
                    ...state,
                    nodeSuccessors: action.payload
                };
            default:
                return state;
        }
    }
}));

jest.mock('../src/reducers/hierarchyReducer', () => ({
    __esModule: true,
    default: (state = {}, action) => {
        switch (action.type) {
           case 'MOCK_NODE_PARENTS':
                return {
                    ...state,
                    parents: action.payload
                };
            case 'MOCK_NODE_CHILDREN':
                return {
                    ...state,
                    children: action.payload
                };
            default:
                return state;
        }
    }
}));
/*
jest.mock('../src/reducers/dayChangeReducer', () => ({
    __esModule: true,
    default: (state = { selectedDay }, action) => {
        return state;
    }
}));
*/

const node = (startDate, endDate) => {
    return JSON.parse(`{
        "id":"a1",
        "name":"Helsingin yliopisto (HY)",
        "startDate": ${startDate && '"' + startDate.toJSON() + '"' || null},
        "endDate": ${endDate && '"' + endDate.toJSON() + '"' || null},
        "timestamp": "2020-01-16T13:37:26.891+00:00",
        "uniqueId": 123123123
    }`);
};

const createNodeAttribute = (startDate, endDate) => {
};

jest.mock('../src/reducers/dayChangeReducer', () => ({
    __esModule: true,
    default: (state = { selectedDay: new Date('1988-01-01T00:00:00+00:00') }, action) => {
        return state;
    }
}));
jest.mock('react-i18next', () => ({
        useTranslation: () => ({
            t: str => { return str; },
            i18n: {
                language: 'fi'
            }
        })
    })
);

function render(component, ...rest) {
    // eslint-disable-next-line react/no-render-return-value
    return ReactDOM.render(<Provider store={store}>{component}</Provider>, ...rest);
}

let container = null;
beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
    container = null;
    jest.clearAllMocks();
});


it('shows only unique_id, predecessors and successors when unit is past unit and selectedDay is today', () => {
    act(() => {
        render(<NodeDetails />, container);
    });
    expect(container.textContent).toContain('123123123');
    expect(container.textContent).toContain('edeltäjä (EDELTÄJÄ)');
    expect(container.textContent).toContain('seuraaja (SEURAAJA)');
    expect(container.textContent).not.toContain('lyhenne');
    expect(container.textContent).not.toContain('AINA_VOIMASSA');
    expect(container.textContent).not.toContain('aina-voimassa-yläyksikkö');
    expect(container.textContent).not.toContain('menneisyyden-yläyksikkö');
});

it('shows current information when the unit is currently valid', () => {
    act(() => {
        render(<NodeDetails />, container);
    });
    console.log(container.textContent);
});

/*
    node : state.nrd.node,
    nodeAttributes : state.nrd.nodeAttributes,
    nodeAttributesFuture: state.nrd.nodeAttributesFuture,
    nodeAttributesHistory: state.nrd.nodeAttributesHistory,
    parents : state.hr.parents,
    parentsHistory: state.hr.parentsHistory,
    parentsFuture: state.hr.parentsFuture,
    children : state.hr.children,
    childrenHistory: state.hr.childrenHistory,
    childrenFuture: state.hr.childrenFuture,
    predecessors : state.nrd.nodePredecessors,
    successors : state.nrd.nodeSuccessors,
    selectedDay: state.dr.selectedDay,
    showHistory: state.nvrd.showHistory,
    showComing: state.nvrd.showComing
*/