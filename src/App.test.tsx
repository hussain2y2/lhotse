import React from 'react';
import { mount } from '@cypress/react';

import App from './App';

const initialStates = {
  name: 'Volkswagenzentrum Berlin GmbH'
}
describe('Render app', () => {
  it('mounts', () => {
    mount(<App />);
    cy.get('h1').contains(initialStates.name);
    cy.get('h1').should('have.class', 'inline-flex items-center text-2xl border-b-2 border-b-gray-200 pb-1');
  });
});
