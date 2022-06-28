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

describe('Certificates <Comobo>', () => {
  const suggestedTagsCertifications = ['ISO 9001', 'Vegan', 'Organic'];
  it('Should render certificates component!', function () {
    mount(<Combo
      title={'Certificates'}
      tags={initialStates['tags-certificates']}
      tagType={'tags-certificates'}
      suggestions={suggestedTagsCertifications}
      addItemHandler={() => console.log('addItemHandler is called')}
      removeItemHandler={() => console.log('removeItemHandler is called')}/>);
  });
});

describe('Portfolio <Comobo>', () => {
  const suggestedTagsPortfolio = ['European', 'Eco-friendly', 'German'];
  it('Should render portfolio component!', function () {
    mount(<Combo
      title={'Portfolio'}
      tags={initialStates['tags-portfolio']}
      tagType={'tags-portfolio'}
      suggestions={suggestedTagsPortfolio}
      addItemHandler={() => console.log('addItemHandler is called')}
      removeItemHandler={() => console.log('removeItemHandler is called')}/>);
  });
});
