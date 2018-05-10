import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import AttributeEnumMapSettings from 'ui/common/attributes/AttributeEnumMapSettings';

describe('AttributeEnumMapSettings', () => {
  let component;
  beforeEach(() => {
    component = shallow(<AttributeEnumMapSettings />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('has one Row', () => {
    expect(component.find('Row').exists()).toBe(true);
    expect(component.find('Row')).toHaveLength(1);
  });

  it('has two Fields and one RenderSelectInput', () => {
    expect(component.find('Field').exists()).toBe(true);
    expect(component.find('Field')).toHaveLength(2);
    expect(component.find('RenderSelectInput').exists()).toBe(true);
    expect(component.find('RenderSelectInput')).toHaveLength(1);
  });
});
