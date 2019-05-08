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

  it('Renders CMS menu without crashing', () => {
    if (process.env.DIGITAL_EXCHANGE_UI_ENABLED) {
      expect(component.find('#menu-cms').exists()).toBe(true);
    } else {
      expect(component.find('#menu-cms').exists()).toBe(false);
    }
  });
});
