import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import PageLayout from 'ui/app/PageLayout';

jest.mock('@entando/utils');

describe('PageLayout', () => {
  const component = shallow(<PageLayout />);

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });
});
