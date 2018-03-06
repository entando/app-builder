
import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import SwitchRenderer from 'ui/common/form/SwitchRenderer';

const VALUE = true;
const onChangeMock = jest.fn();

describe('SwitchRenderer', () => {
  beforeEach(jest.clearAllMocks);

  let component;
  let switchComponent;
  beforeEach(() => {
    component = shallow((
      <SwitchRenderer
        input={{ value: VALUE, onChange: onChangeMock }}
      />
    ));
    switchComponent = component.find('Switch');
  });
  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });
  it('renders a Switch', () => {
    expect(switchComponent.exists()).toBe(true);
  });

  it('provides the Switch with a defaultValue prop', () => {
    expect(switchComponent.prop('defaultValue')).toBe(VALUE);
  });

  it('calls onChange on Switch\'s onChange', () => {
    switchComponent.prop('onChange')(null, false);
    expect(onChangeMock).toHaveBeenCalledWith(false);
  });
});
