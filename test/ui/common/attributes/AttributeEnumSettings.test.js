import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import AttributeEnumSettings from 'ui/common/attributes/AttributeEnumSettings';

describe('AttributeEnumSettings', () => {
  let component;
  beforeEach(() => {
    component = shallow(<AttributeEnumSettings {...this.props} />);
  });

  it(' gives errors without passing props', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    shallow(<AttributeEnumSettings />);
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockReset();
    consoleError.mockRestore();
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });
});
