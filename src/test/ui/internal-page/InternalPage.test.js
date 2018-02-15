
import React from 'react';

import 'test/enzyme-init';
import 'test/mocks/mockContainers';
import { shallow } from 'enzyme';
import InternalPage from 'ui/internal-page/InternalPage';

it('renders without crashing', () => {
  const component = shallow(<InternalPage />);
  expect(component.exists()).toEqual(true);
});
