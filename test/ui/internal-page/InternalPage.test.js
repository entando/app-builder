
import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import InternalPage from 'ui/internal-page/InternalPage';
import ToastsContainer from 'ui/internal-page/ToastsContainer';

jest.mock('@entando/utils');

describe('InternalPage', () => {
  const component = shallow(<InternalPage />);

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('contains the ToastsContainer', () => {
    expect(component.find(ToastsContainer).exists()).toBe(true);
  });
});
