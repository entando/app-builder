import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import AttributeInfo from 'ui/common/attributes/AttributeInfo';
import { mockRenderWithIntlAndStore } from 'test/legacyTestUtils';

jest.unmock('react-intl');
jest.unmock('react-redux');

describe('AttributeInfo', () => {
  it('renders without crashing', () => {
    const component = shallow(mockRenderWithIntlAndStore(<AttributeInfo />));
    expect(component.exists()).toEqual(true);
  });
});
