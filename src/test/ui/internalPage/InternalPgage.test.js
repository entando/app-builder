
import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import InternalPage from 'ui/internalPage/InternalPage';


it('renders without crashing', () => {
  const component = shallow(<InternalPage />);
  expect(component.exists()).toEqual(true);
});
