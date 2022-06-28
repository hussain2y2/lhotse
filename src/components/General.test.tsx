import React from 'react';
import { mount } from '@cypress/react';

import General from './General';

const initialStates = {
  'tags-general': [
    {
      id: 1,
      name: 'volkswagen',
      type: 'supplierBranch-general'
    }, {
      id: 2,
      name: 'cars',
      type: 'supplierBranch-general'
    }],
};

describe('Mount <General>', () => {
  it('should render General component', function () {
    mount(<General
      tags={initialStates['tags-general']}
      tagType={'tags-general'}
      addItemHandler={() => console.log('addItemHandler')}
      removeItemHandler={() => console.log('removeItemHandler')}
    />);
  });
});
