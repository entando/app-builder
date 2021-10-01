import React from 'react';
import { configEnzymeAdapter } from 'testutils/helpers';
import { shallow } from 'enzyme';
import AttributeCheckIcon from 'ui/common/contenttype-attributes/AttributeCheckIcon';

configEnzymeAdapter();

describe('AttributeCheckIcon', () => {
  it('renders without crashing', () => {
    const component = shallow(<AttributeCheckIcon isChecked />);
    expect(component.exists()).toEqual(true);
  });

  it('if isChecked = true, has class ContTypeAttributeCheckIcon--checked', () => {
    const component = shallow(<AttributeCheckIcon isChecked />);
    expect(component.hasClass('ContTypeAttributeCheckIcon--checked')).toBe(true);
  });

  it('if isChecked = false, has class ContTypeAttributeCheckIcon--unchecked', () => {
    const component = shallow(<AttributeCheckIcon isChecked={false} />);
    expect(component.hasClass('ContTypeAttributeCheckIcon--unchecked')).toBe(true);
  });
});
