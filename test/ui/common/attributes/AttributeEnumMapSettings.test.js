import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import AttributeEnumMapSettings from 'ui/common/attributes/AttributeEnumMapSettings';

describe('AttributeEnumMapSettings', () => {
  let component;
  beforeEach(() => {
    component = shallow(<AttributeEnumMapSettings {...this.props} />);
  });

  it(' gives errors without passing props', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    shallow(<AttributeEnumMapSettings />);
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockReset();
    consoleError.mockRestore();
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });
});
