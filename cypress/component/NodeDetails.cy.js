/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
import React from 'react';

import store from '../../src/store';
import NodeDetails from '../../src/components/NodeDetails';
import { apiGetNodeSuccessCall } from '../../src/actions/nodeAction';
import { changeDaySuccessCall } from '../../src/actions/dayChangeAction';

const createNode = (startDate, endDate) => {
    return JSON.parse(`{
        "id":"a1",
        "name":"Helsingin yliopisto (HY)",
        "startDate": ${startDate && '"' + startDate.toJSON() + '"' || null},
        "endDate": ${endDate && '"' + endDate.toJSON() + '"' || null},
        "timestamp": "2020-01-16T13:37:26.891+00:00",
        "uniqueId": 123123123
    }`);
};



describe('NodeDetails.cy.js', () => {
  it('shows correct information when node is current in relation to selected day', () => {
      cy.intercept('GET', /.*\/api\/node\/[0-9]+\/[0-9]+\.[0-9]+\.[0-9]+\/attributes/g, { fixture: '2022-06-21/current/attributes.json' });
      cy.intercept('GET', /.*\/api\/node\/parents\/[0-9]+\/[0-9]+\.[0-9]+\.[0-9]+/g, { fixture: '2022-06-21/current/parents.json' });
      cy.intercept('GET', /.*\/api\/node\/children\/[0-9]+\/[0-9]+\.[0-9]+\.[0-9]+/g, { fixture: '2022-06-21/current/children.json' });
      cy.intercept('GET', /.*\/api\/node\/predecessors\/[0-9]+\/[0-9]+\.[0-9]+\.[0-9]+/g, { fixture: '2022-06-21/current/predecessors.json' });
      cy.intercept('GET', /.*\/api\/node\/successors\/[0-9]+\/[0-9]+\.[0-9]+\.[0-9]+/g, { fixture: '2022-06-21/current/successors.json' });
      cy.intercept('GET', /.*\/api\/node\/historyandcurrent\/[0-9]+\/[0-9]+\.[0-9]+\.[0-9]+\/attributes/g, { fixture: '2022-06-21/current/historyAttributes.json' });
      cy.intercept('GET', /.*\/api\/node\/historyandcurrent\/parents\/[0-9]+\/[0-9]+\.[0-9]+\.[0-9]+/g, { fixture: '2022-06-21/current/historyParents.json' });
      cy.intercept('GET', /.*\/api\/node\/historyandcurrent\/children\/[0-9]+\/[0-9]+\.[0-9]+\.[0-9]+/g, { fixture: '2022-06-21/current/historyChildren.json' });
      cy.intercept('GET', /.*\/api\/node\/futureandcurrent\/[0-9]+\/[0-9]+\.[0-9]+\.[0-9]+\/attributes/g, { fixture: '2022-06-21/current/futureAttributes.json' });
      cy.intercept('GET', /.*\/api\/node\/futureandcurrent\/parents\/[0-9]+\/[0-9]+\.[0-9]+\.[0-9]+/g, { fixture: '2022-06-21/current/futureParents.json' });
      cy.intercept('GET', /.*\/api\/node\/futureandcurrent\/children\/[0-9]+\/[0-9]+\.[0-9]+\.[0-9]+/g, { fixture: '2022-06-21/current/futureChildren.json' });

     const node = createNode(new Date('2020-01-01T00:00:00+00:00'), new Date('2030-01-01T00:00:00+00:00'));
     store.dispatch(apiGetNodeSuccessCall(node));
     store.dispatch(changeDaySuccessCall(new Date('2022-01-01T00:00:00+00:00')));

     cy.mount(<NodeDetails />);

     cy.get('[id=show_history_switch]').as('showHistorySwitch');
     cy.get('[id=show_coming_switch]').as('showComingSwitch');
     cy.get('[id=name_info]').as('nameInfoTable');
     cy.get('[id=display_name_info]').as('displayNameInfoTable');
     cy.get('[id=codes]').as('codeAttributes');
     cy.get('[id=subunits]').as('children');
     cy.get('[id=upper_units]').as('parents');
     cy.get('[id=predecessors]').as('predecessors');

     cy.get('@showHistorySwitch').click();
     cy.get('@nameInfoTable').contains('Menneisyyden yliopisto').should('exist');
     cy.get('@nameInfoTable').contains('Helsingin yliopisto').should('exist');
     cy.get('@nameInfoTable').contains('Tulevaisuuden yliopisto').should('not.exist');
     cy.get('@displayNameInfoTable').contains('Menneisyyden yliopisto (HY)').should('exist');
     cy.get('@displayNameInfoTable').contains('Helsingin yliopisto (HY)').should('exist');
     cy.get('@displayNameInfoTable').contains('Tulevaisuuden yliopisto (HY)').should('not.exist');
     cy.get('@codeAttributes').contains('PAST').should('exist');
     cy.get('@codeAttributes').contains('FUTURE').should('not.exist');
     cy.get('@codeAttributes').contains('ALWAYS_VALID').should('exist');
     cy.get('@children').contains('tutkimus').should('exist');
     cy.get('@children').contains('talous').should('exist');
     cy.get('@parents').contains('tutkimus').should('exist');
     cy.get('@parents').contains('talous').should('exist');
     cy.get('@predecessors').contains('IPR University Center').should('exist');

     cy.get('@showHistorySwitch').click();
     cy.get('@nameInfoTable').contains('Menneisyyden yliopisto').should('not.exist');
     cy.get('@nameInfoTable').contains('Tulevaisuuden yliopisto').should('not.exist');
     cy.get('@nameInfoTable').contains('Helsingin yliopisto').should('exist');
     cy.get('@displayNameInfoTable').contains('Menneisyyden yliopisto (HY)').should('not.exist');
     cy.get('@displayNameInfoTable').contains('Tulevaisuuden yliopisto (HY)').should('not.exist');
     cy.get('@displayNameInfoTable').contains('Helsingin yliopisto (HY)').should('exist');
     cy.get('@codeAttributes').contains('PAST').should('not.exist');
     cy.get('@codeAttributes').contains('FUTURE').should('not.exist');
     cy.get('@codeAttributes').contains('ALWAYS_VALID').should('exist');
     cy.get('@children').contains('tutkimus').should('exist');
     cy.get('@children').contains('talous').should('not.exist');
     cy.get('@parents').contains('tutkimus').should('exist');
     cy.get('@parents').contains('talous').should('not.exist');
     cy.get('@predecessors').contains('IPR University Center').should('exist');

     cy.get('@showComingSwitch').click();
     cy.get('@nameInfoTable').contains('Tulevaisuuden yliopisto').should('exist');
     cy.get('@nameInfoTable').contains('Menneisyyden yliopisto').should('not.exist');
     cy.get('@nameInfoTable').contains('Helsingin yliopisto').should('exist');
     cy.get('@displayNameInfoTable').contains('Tulevaisuuden yliopisto (HY)').should('exist');
     cy.get('@displayNameInfoTable').contains('Helsingin yliopisto (HY)').should('exist');
     cy.get('@displayNameInfoTable').contains('Menneisyyden yliopisto (HY)').should('not.exist');
     cy.get('@codeAttributes').contains('PAST').should('not.exist');
     cy.get('@codeAttributes').contains('FUTURE').should('exist');
     cy.get('@codeAttributes').contains('ALWAYS_VALID').should('exist');
     cy.get('@children').contains('tutkimus').should('exist');
     cy.get('@children').contains('talous').should('not.exist');
     cy.get('@children').contains('opetus').should('exist');
     cy.get('@parents').contains('tutkimus').should('exist');
     cy.get('@parents').contains('talous').should('not.exist');
     cy.get('@parents').contains('opetus').should('exist');
     cy.get('@predecessors').contains('IPR University Center').should('exist');

     cy.get('@showComingSwitch').click();
     cy.get('@nameInfoTable').contains('Tulevaisuuden yliopisto').should('not.exist');
     cy.get('@nameInfoTable').contains('Menneisyyden yliopisto').should('not.exist');
     cy.get('@nameInfoTable').contains('Helsingin yliopisto').should('exist');
     cy.get('@displayNameInfoTable').contains('Tulevaisuuden yliopisto (HY)').should('not.exist');
     cy.get('@displayNameInfoTable').contains('Menneisyyden yliopisto (HY)').should('not.exist');
     cy.get('@codeAttributes').contains('PAST').should('not.exist');
     cy.get('@codeAttributes').contains('FUTURE').should('not.exist');
     cy.get('@codeAttributes').contains('ALWAYS_VALID').should('exist');
     cy.get('@children').contains('tutkimus').should('exist');
     cy.get('@children').contains('talous').should('not.exist');
     cy.get('@children').contains('opetus').should('not.exist');
     cy.get('@parents').contains('tutkimus').should('exist');
     cy.get('@parents').contains('talous').should('not.exist');
     cy.get('@parents').contains('opetus').should('not.exist');
     cy.get('@predecessors').contains('IPR University Center').should('exist');

     cy.get('@showComingSwitch').click();
     cy.get('@showHistorySwitch').click();
     cy.get('@nameInfoTable').contains('Tulevaisuuden yliopisto').should('exist');
     cy.get('@nameInfoTable').contains('Menneisyyden yliopisto').should('exist');
     cy.get('@nameInfoTable').contains('Helsingin yliopisto').should('exist');
     cy.get('@displayNameInfoTable').contains('Tulevaisuuden yliopisto (HY)').should('exist');
     cy.get('@displayNameInfoTable').contains('Menneisyyden yliopisto (HY)').should('exist');
     cy.get('@codeAttributes').contains('PAST').should('exist');
     cy.get('@codeAttributes').contains('FUTURE').should('exist');
     cy.get('@codeAttributes').contains('ALWAYS_VALID').should('exist');
     cy.get('@children').contains('tutkimus').should('exist');
     cy.get('@children').contains('talous').should('exist');
     cy.get('@children').contains('opetus').should('exist');
     cy.get('@parents').contains('tutkimus').should('exist');
     cy.get('@parents').contains('talous').should('exist');
     cy.get('@parents').contains('opetus').should('exist');
     cy.get('@predecessors').contains('IPR University Center').should('exist');

     cy.get('@showComingSwitch').click();
     cy.get('@showHistorySwitch').click();
     cy.get('@nameInfoTable').contains('Menneisyyden yliopisto').should('not.exist');
     cy.get('@nameInfoTable').contains('Tulevaisuuden yliopisto').should('not.exist');
     cy.get('@nameInfoTable').contains('Helsingin yliopisto').should('exist');
     cy.get('@displayNameInfoTable').contains('Menneisyyden yliopisto (HY)').should('not.exist');
     cy.get('@displayNameInfoTable').contains('Tulevaisuuden yliopisto (HY)').should('not.exist');
     cy.get('@displayNameInfoTable').contains('Helsingin yliopisto (HY)').should('exist');
     cy.get('@codeAttributes').contains('PAST').should('not.exist');
     cy.get('@codeAttributes').contains('FUTURE').should('not.exist');
     cy.get('@codeAttributes').contains('ALWAYS_VALID').should('exist');
     cy.get('@children').contains('tutkimus').should('exist');
     cy.get('@children').contains('talous').should('not.exist');
     cy.get('@children').contains('opetus').should('not.exist');
     cy.get('@parents').contains('tutkimus').should('exist');
     cy.get('@parents').contains('talous').should('not.exist');
     cy.get('@parents').contains('opetus').should('not.exist');
     cy.get('@predecessors').contains('IPR University Center').should('exist');


  });

  it('shows correct information when unit is past in relation to selected day', () => {
      cy.intercept('GET', /.*\/api\/node\/[0-9]+\/[0-9]+\.[0-9]+\.[0-9]+\/attributes/g, { fixture: '2022-06-21/past/attributes.json' });
      cy.intercept('GET', /.*\/api\/node\/parents\/[0-9]+\/[0-9]+\.[0-9]+\.[0-9]+/g, { fixture: '2022-06-21/past/parents.json' });
      cy.intercept('GET', /.*\/api\/node\/children\/[0-9]+\/[0-9]+\.[0-9]+\.[0-9]+/g, { fixture: '2022-06-21/past/children.json' });
      cy.intercept('GET', /.*\/api\/node\/predecessors\/[0-9]+\/[0-9]+\.[0-9]+\.[0-9]+/g, { fixture: '2022-06-21/past/predecessors.json' });
      cy.intercept('GET', /.*\/api\/node\/successors\/[0-9]+\/[0-9]+\.[0-9]+\.[0-9]+/g, { fixture: '2022-06-21/past/successors.json' });
      cy.intercept('GET', /.*\/api\/node\/historyandcurrent\/[0-9]+\/[0-9]+\.[0-9]+\.[0-9]+\/attributes/g, { fixture: '2022-06-21/past/historyAttributes.json' });
      cy.intercept('GET', /.*\/api\/node\/historyandcurrent\/parents\/[0-9]+\/[0-9]+\.[0-9]+\.[0-9]+/g, { fixture: '2022-06-21/past/historyParents.json' });
      cy.intercept('GET', /.*\/api\/node\/historyandcurrent\/children\/[0-9]+\/[0-9]+\.[0-9]+\.[0-9]+/g, { fixture: '2022-06-21/past/historyChildren.json' });
      cy.intercept('GET', /.*\/api\/node\/futureandcurrent\/[0-9]+\/[0-9]+\.[0-9]+\.[0-9]+\/attributes/g, { fixture: '2022-06-21/past/futureAttributes.json' });
      cy.intercept('GET', /.*\/api\/node\/futureandcurrent\/parents\/[0-9]+\/[0-9]+\.[0-9]+\.[0-9]+/g, { fixture: '2022-06-21/past/futureParents.json' });
      cy.intercept('GET', /.*\/api\/node\/futureandcurrent\/children\/[0-9]+\/[0-9]+\.[0-9]+\.[0-9]+/g, { fixture: '2022-06-21/past/futureChildren.json' });

     const node = createNode(new Date('2020-01-01T00:00:00+00:00'), new Date('2030-01-01T00:00:00+00:00'));
     store.dispatch(apiGetNodeSuccessCall(node));
     store.dispatch(changeDaySuccessCall(new Date('2035-01-01T00:00:00+00:00')));

     cy.mount(<NodeDetails />);

     cy.get('[id=show_history_switch]').as('showHistorySwitch');
     cy.get('[id=show_coming_switch]').as('showComingSwitch');
     cy.get('[id=name_info]').as('nameInfoTable');
     cy.get('[id=display_name_info]').as('displayNameInfoTable');
     cy.get('[id=codes]').as('codeAttributes');
     cy.get('[id=subunits]').as('children');
     cy.get('[id=upper_units]').as('parents');
     cy.get('[id=predecessors]').as('predecessors');
     cy.get('[id=other_attributes').as('otherAttributes');

     cy.get('@nameInfoTable').children('tbody').children().should('not.exist');
     cy.get('@displayNameInfoTable').children('tbody').children().should('not.exist');

     cy.get('@codeAttributes').contains('unique_id').should('exist');
     cy.get('@codeAttributes').children('tbody').children().should('have.length', 1);

     cy.get('@children').children('tbody').children().should('not.exist');
     cy.get('@parents').children('tbody').children().should('not.exist');
     cy.get('@otherAttributes').children('tbody').children().should('not.exist');

     cy.get('@predecessors').children('tbody').children().should('have.length', 1);

     cy.get('@showHistorySwitch').click();
     cy.get('@codeAttributes').contains('ALWAYS_VALID').should('exist');
     cy.get('@codeAttributes').contains('PAST').should('exist');
     cy.get('@nameInfoTable').children('tbody').children().should('not.have.length', 0);
     cy.get('@displayNameInfoTable').children('tbody').children().should('not.have.length', 0);

     cy.get('@children').contains('talous').should('exist');
     cy.get('@children').contains('tutkimus').should('exist');
     cy.get('@children').contains('opetus').should('not.exist');

     cy.get('@parents').contains('talous').should('exist');
     cy.get('@parents').contains('tutkimus').should('exist');
     cy.get('@parents').contains('opetus').should('not.exist');
     cy.get('@predecessors').children('tbody').children().should('have.length', 1);

     cy.get('@showHistorySwitch').click();
     cy.get('@nameInfoTable').children('tbody').children().should('not.exist');
     cy.get('@displayNameInfoTable').children('tbody').children().should('not.exist');

     cy.get('@codeAttributes').contains('unique_id').should('exist');
     cy.get('@codeAttributes').children('tbody').children().should('have.length', 1);

     cy.get('@children').children('tbody').children().should('not.exist');
     cy.get('@parents').children('tbody').children().should('not.exist');
     cy.get('@otherAttributes').children('tbody').children().should('not.exist');

     cy.get('@predecessors').children('tbody').children().should('have.length', 1);

     cy.get('@showComingSwitch').click();
     cy.get('@nameInfoTable').contains('Tulevaisuuden yliopisto').should('exist');
     cy.get('@nameInfoTable').contains('Menneisyyden yliopisto').should('not.exist');
     cy.get('@displayNameInfoTable').contains('Tulevaisuuden yliopisto').should('exist');
     cy.get('@displayNameInfoTable').contains('Menneisyyden yliopisto').should('not.exist');

     cy.get('@codeAttributes').contains('FUTURE').should('exist');
     cy.get('@codeAttributes').contains('ALWAYS_VALID').should('exist');
     cy.get('@children').contains('talous').should('not.exist');
     cy.get('@children').contains('tutkimus').should('exist');
     cy.get('@children').contains('opetus').should('exist');
     cy.get('@parents').contains('talous').should('not.exist');
     cy.get('@parents').contains('tutkimus').should('exist');
     cy.get('@parents').contains('opetus').should('exist');

     cy.get('@showComingSwitch').click();
     cy.get('@nameInfoTable').contains('Tulevaisuuden yliopisto').should('not.exist');
     cy.get('@displayNameInfoTable').contains('Tulevaisuuden yliopisto').should('not.exist');
     cy.get('@codeAttributes').contains('FUTURE').should('not.exist');
     cy.get('@codeAttributes').contains('ALWAYS_VALID').should('not.exist');
     cy.get('@children').contains('opetus').should('not.exist');
     cy.get('@parents').contains('opetus').should('not.exist');

     cy.get('@showComingSwitch').click();
     cy.get('@showHistorySwitch').click();
     cy.get('@nameInfoTable').contains('Tulevaisuuden yliopisto').should('exist');
     cy.get('@nameInfoTable').contains('Menneisyyden yliopisto').should('exist');
     cy.get('@displayNameInfoTable').contains('Tulevaisuuden yliopisto').should('exist');
     cy.get('@displayNameInfoTable').contains('Menneisyyden yliopisto').should('exist');

     cy.get('@codeAttributes').contains('FUTURE').should('exist');
     cy.get('@codeAttributes').contains('PAST').should('exist');
     cy.get('@codeAttributes').contains('ALWAYS_VALID').should('exist');
     cy.get('@children').contains('talous').should('exist');
     cy.get('@children').contains('tutkimus').should('exist');
     cy.get('@children').contains('opetus').should('exist');
     cy.get('@parents').contains('talous').should('exist');
     cy.get('@parents').contains('tutkimus').should('exist');
     cy.get('@parents').contains('opetus').should('exist');

     cy.get('@showHistorySwitch').click();
     cy.get('@showComingSwitch').click();
     cy.get('@nameInfoTable').children('tbody').children().should('not.exist');
     cy.get('@displayNameInfoTable').children('tbody').children().should('not.exist');

     cy.get('@codeAttributes').contains('unique_id').should('exist');
     cy.get('@codeAttributes').children('tbody').children().should('have.length', 1);

     cy.get('@children').children('tbody').children().should('not.exist');
     cy.get('@parents').children('tbody').children().should('not.exist');
     cy.get('@otherAttributes').children('tbody').children().should('not.exist');

     cy.get('@predecessors').children('tbody').children().should('have.length', 1);

  });

  it('shows correct information when unit is future in relation to selected day', () => {
      cy.intercept('GET', /.*\/api\/node\/[0-9]+\/[0-9]+\.[0-9]+\.[0-9]+\/attributes/g, { fixture: '2022-06-21/future/attributes.json' });
      cy.intercept('GET', /.*\/api\/node\/parents\/[0-9]+\/[0-9]+\.[0-9]+\.[0-9]+/g, { fixture: '2022-06-21/future/parents.json' });
      cy.intercept('GET', /.*\/api\/node\/children\/[0-9]+\/[0-9]+\.[0-9]+\.[0-9]+/g, { fixture: '2022-06-21/future/children.json' });
      cy.intercept('GET', /.*\/api\/node\/predecessors\/[0-9]+\/[0-9]+\.[0-9]+\.[0-9]+/g, { fixture: '2022-06-21/future/predecessors.json' });
      cy.intercept('GET', /.*\/api\/node\/successors\/[0-9]+\/[0-9]+\.[0-9]+\.[0-9]+/g, { fixture: '2022-06-21/future/successors.json' });
      cy.intercept('GET', /.*\/api\/node\/historyandcurrent\/[0-9]+\/[0-9]+\.[0-9]+\.[0-9]+\/attributes/g, { fixture: '2022-06-21/future/historyAttributes.json' });
      cy.intercept('GET', /.*\/api\/node\/historyandcurrent\/parents\/[0-9]+\/[0-9]+\.[0-9]+\.[0-9]+/g, { fixture: '2022-06-21/future/historyParents.json' });
      cy.intercept('GET', /.*\/api\/node\/historyandcurrent\/children\/[0-9]+\/[0-9]+\.[0-9]+\.[0-9]+/g, { fixture: '2022-06-21/future/historyChildren.json' });
      cy.intercept('GET', /.*\/api\/node\/futureandcurrent\/[0-9]+\/[0-9]+\.[0-9]+\.[0-9]+\/attributes/g, { fixture: '2022-06-21/future/futureAttributes.json' });
      cy.intercept('GET', /.*\/api\/node\/futureandcurrent\/parents\/[0-9]+\/[0-9]+\.[0-9]+\.[0-9]+/g, { fixture: '2022-06-21/future/futureParents.json' });
      cy.intercept('GET', /.*\/api\/node\/futureandcurrent\/children\/[0-9]+\/[0-9]+\.[0-9]+\.[0-9]+/g, { fixture: '2022-06-21/future/futureChildren.json' });

     const node = createNode(new Date('2020-01-01T00:00:00+00:00'), new Date('2030-01-01T00:00:00+00:00'));
     store.dispatch(apiGetNodeSuccessCall(node));
     store.dispatch(changeDaySuccessCall(new Date('1980-01-01T00:00:00+00:00')));

     cy.mount(<NodeDetails />);

     cy.get('[id=show_history_switch]').as('showHistorySwitch');
     cy.get('[id=show_coming_switch]').as('showComingSwitch');
     cy.get('[id=name_info]').as('nameInfoTable');
     cy.get('[id=display_name_info]').as('displayNameInfoTable');
     cy.get('[id=codes]').as('codeAttributes');
     cy.get('[id=subunits]').as('children');
     cy.get('[id=upper_units]').as('parents');
     cy.get('[id=predecessors]').as('predecessors');
     cy.get('[id=other_attributes').as('otherAttributes');

     cy.get('@nameInfoTable').children('tbody').children().should('not.exist');
     cy.get('@displayNameInfoTable').children('tbody').children().should('not.exist');

     cy.get('@codeAttributes').contains('unique_id').should('exist');
     cy.get('@codeAttributes').children('tbody').children().should('have.length', 1);

     cy.get('@children').children('tbody').children().should('not.exist');
     cy.get('@parents').children('tbody').children().should('not.exist');
     cy.get('@otherAttributes').children('tbody').children().should('not.exist');

     cy.get('@predecessors').children('tbody').children().should('have.length', 1);

     cy.get('@showHistorySwitch').click();
     cy.get('@nameInfoTable').contains('Tulevaisuuden yliopisto').should('not.exist');
     cy.get('@nameInfoTable').contains('Menneisyyden yliopisto').should('exist');

     cy.get('@codeAttributes').contains('PAST').should('exist');
     cy.get('@codeAttributes').contains('ALWAYS_VALID').should('exist');
     cy.get('@children').contains('tutkimus').should('exist');
     cy.get('@parents').contains('talous').should('exist');

     cy.get('@children').children('tbody').children().should('have.length', 1);
     cy.get('@parents').children('tbody').children().should('have.length', 1);

     cy.get('@showHistorySwitch').click();
     cy.get('@nameInfoTable').contains('Tulevaisuuden yliopisto').should('not.exist');
     cy.get('@nameInfoTable').contains('Menneisyyden yliopisto').should('not.exist');
     cy.get('@codeAttributes').contains('unique_id').should('exist');
     cy.get('@codeAttributes').contains('PAST').should('not.exist');
     cy.get('@codeAttributes').contains('ALWAYS_VALID').should('not.exist');
     cy.get('@children').contains('tutkimus').should('not.exist');
     cy.get('@parents').contains('talous').should('not.exist');
     cy.get('@children').children('tbody').children().should('have.length', 0);
     cy.get('@parents').children('tbody').children().should('have.length', 0);
     cy.get('@predecessors').children('tbody').children().should('have.length', 1);
     cy.get('@predecessors').contains('IPR University Center').should('exist');

     cy.get('@showComingSwitch').click();
     cy.get('@nameInfoTable').contains('Tulevaisuuden yliopisto').should('exist');
     cy.get('@nameInfoTable').contains('Menneisyyden yliopisto').should('not.exist');
     cy.get('@displayNameInfoTable').contains('Tulevaisuuden yliopisto').should('exist');
     cy.get('@displayNameInfoTable').contains('Menneisyyden yliopisto').should('not.exist');
     cy.get('@codeAttributes').contains('unique_id').should('exist');
     cy.get('@codeAttributes').contains('PAST').should('not.exist');
     cy.get('@codeAttributes').contains('FUTURE').should('exist');
     cy.get('@codeAttributes').contains('ALWAYS_VALID').should('exist');
     cy.get('@showComingSwitch').click();

     cy.get('@displayNameInfoTable').contains('Tulevaisuuden yliopisto').should('not.exist');
     cy.get('@codeAttributes').contains('FUTURE').should('not.exist');
     cy.get('@codeAttributes').contains('ALWAYS_VALID').should('not.exist');
     cy.get('@predecessors').contains('IPR University Center').should('exist');

     cy.get('@showComingSwitch').click();
     cy.get('@showHistorySwitch').click();
     cy.get('@nameInfoTable').contains('Tulevaisuuden yliopisto').should('exist');
     cy.get('@nameInfoTable').contains('Menneisyyden yliopisto').should('exist');
     cy.get('@displayNameInfoTable').contains('Tulevaisuuden yliopisto').should('exist');
     cy.get('@displayNameInfoTable').contains('Menneisyyden yliopisto').should('exist');

     cy.get('@codeAttributes').contains('unique_id').should('exist');
     cy.get('@codeAttributes').contains('PAST').should('exist');
     cy.get('@codeAttributes').contains('FUTURE').should('exist');
     cy.get('@codeAttributes').contains('ALWAYS_VALID').should('exist');

     cy.get('@parents').contains('talous').should('exist');
     cy.get('@parents').contains('tutkimus').should('exist');
     cy.get('@parents').contains('opetus').should('exist');

     cy.get('@children').contains('tutkimus').should('exist');
     cy.get('@children').contains('tutkimus').should('exist');
     cy.get('@children').contains('opetus').should('exist');

     cy.get('@showHistorySwitch').click();
     cy.get('@showComingSwitch').click();
     cy.get('@nameInfoTable').children('tbody').children().should('not.exist');
     cy.get('@displayNameInfoTable').children('tbody').children().should('not.exist');

     cy.get('@codeAttributes').contains('unique_id').should('exist');
     cy.get('@codeAttributes').children('tbody').children().should('have.length', 1);

     cy.get('@children').children('tbody').children().should('not.exist');
     cy.get('@parents').children('tbody').children().should('not.exist');
     cy.get('@otherAttributes').children('tbody').children().should('not.exist');

     cy.get('@predecessors').children('tbody').children().should('have.length', 1);

  });
});