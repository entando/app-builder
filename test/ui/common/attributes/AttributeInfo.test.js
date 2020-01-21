import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import AttributeInfo from 'ui/common/attributes/AttributeInfo';
import { mockRenderWithIntl } from '../../../test/testUtils';

jest.unmock('react-intl');
jest.unmock('react-redux');

describe('AttributeInfo', () => {
  it('renders without crashing', () => {
    const component = shallow(mockRenderWithIntl(<AttributeInfo />));
    expect(component.exists()).toEqual(true);
  });
});
