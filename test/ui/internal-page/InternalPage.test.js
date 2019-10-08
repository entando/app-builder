import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import InternalPage from 'ui/internal-page/InternalPage';

jest.mock('@entando/utils');

describe('InternalPage', () => {
  const component = shallow(<InternalPage />);

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });
});
