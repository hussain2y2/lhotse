import React from 'react';
import { mount } from '@cypress/react';

import Combo from './Combo';

const initialStates = {
  'tags-certificates': [
    {
      id: 1,
      name: 'ISO 9001',
      type: 'supplierBranch-certificates'
    }],
  'tags-portfolio': []
};

// Certificates
describe('Certificates <Comobo>', () => {
  const suggestedTagsCertifications = ['ISO 9001', 'Vegan', 'Organic'];
  it('Should render certificates component!',  () => {
    mount(<Combo
      title={'Certificates'}
      tags={initialStates['tags-certificates']}
      tagType={'tags-certificates'}
      suggestions={suggestedTagsCertifications}
      addItemHandler={() => console.log('addItemHandler is called')}
      removeItemHandler={() => console.log('removeItemHandler is called')}/>);

    cy.get('h4').should('have.class', 'text-slate-500').contains('Certificates');
    cy.get('div').find('.tag').should('have.length', initialStates['tags-certificates'].length);
    cy.get('button').should('have.class', 'inline-flex items-center').contains('New Tag');
  });
});

// Portfolio
describe('Portfolio <Comobo>', () => {
  const suggestedTagsPortfolio = ['European', 'Eco-friendly', 'German'];
  it('Should render portfolio component!', () => {
    mount(<Combo
      title={'Portfolio'}
      tags={initialStates['tags-portfolio']}
      tagType={'tags-portfolio'}
      suggestions={suggestedTagsPortfolio}
      addItemHandler={() => console.log('addItemHandler is called')}
      removeItemHandler={() => console.log('removeItemHandler is called')}/>);

    cy.get('h4').should('have.class', 'text-slate-500').contains('Portfolio');
    cy.get('div').find('.tag').should('have.length', initialStates['tags-portfolio'].length);
    cy.get('button').should('have.class', 'inline-flex items-center').contains('New Tag');
  });
});
