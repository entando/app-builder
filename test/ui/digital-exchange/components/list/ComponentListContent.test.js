import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import ComponentListContent from 'ui/digital-exchange/components/list/ComponentListContent';

describe('ComponentListContent', () => {
  let component;
  beforeEach(() => {
    component = shallow(<ComponentListContent />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('has class ComponentListContent', () => {
    expect(component.hasClass('ComponentListContent')).toBe(true);
  });
});
