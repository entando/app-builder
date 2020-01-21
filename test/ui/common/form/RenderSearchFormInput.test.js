import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { mockRenderWithIntl } from 'test/testUtils';

import RenderSearchFormInput from 'ui/common/form/RenderSearchFormInput';

jest.unmock('react-redux');

describe('RenderSearchFormInput', () => {
  let component;
  beforeEach(() => {
    component = shallow(mockRenderWithIntl(<RenderSearchFormInput />));
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });
});
