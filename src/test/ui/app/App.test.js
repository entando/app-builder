import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from 'ui/app/components/App';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const component = shallow(<App />);
  expect(component.exists()).toEqual(true);
});
