import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HelloWorldMessage from 'ui/hello-world/components/HelloWorldMessage';

configure({ adapter: new Adapter() });


const MESSAGE = 'Hello, test!';


it('renders without crashing', () => {
  const component = shallow(<HelloWorldMessage message="" />);
  expect(component.exists()).toEqual(true);
});

it('should show the specified message', () => {
  const component = shallow(<HelloWorldMessage message={MESSAGE} />);
  expect(component.text()).toEqual(MESSAGE);
});
