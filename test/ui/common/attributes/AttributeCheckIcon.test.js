import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import AttributeCheckIcon from 'ui/common/attributes/AttributeCheckIcon';

describe('AttributeCheckIcon', () => {
  it('renders without crashing', () => {
    const component = shallow(<AttributeCheckIcon isChecked />);
    expect(component.exists()).toEqual(true);
  });

  it('if isChecked = true, has class AttributeCheckIcon--checked', () => {
    const component = shallow(<AttributeCheckIcon isChecked />);
    expect(component.hasClass('AttributeCheckIcon--checked')).toBe(true);
  });

  it('if isChecked = false, has class AttributeCheckIcon--unchecked', () => {
    const component = shallow(<AttributeCheckIcon isChecked={false} />);
    expect(component.hasClass('AttributeCheckIcon--unchecked')).toBe(true);
  });
});
