import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import { SettingsFragmentFormBody } from 'ui/fragments/list/SettingsFragmentForm';

const handleSubmit = jest.fn();
const onWillMount = jest.fn();

describe('ui/fragments/list/SettingsFragmentForm', () => {
  let component;
  beforeEach(() => {
    component = shallow(<SettingsFragmentFormBody
      handleSubmit={handleSubmit}
      onWillMount={onWillMount}
    />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('call onWillMount', () => {
    expect(onWillMount).toHaveBeenCalled();
  });

  it('has class SettingsFragmentForm', () => {
    expect(component.hasClass('SettingsFragmentForm')).toBe(true);
  });

  it('has component name property enableEditingWhenEmptyDefaultGui', () => {
    expect(component.find('[name="enableEditingWhenEmptyDefaultGui"]').exists()).toBe(true);
  });

  it('has component Button ', () => {
    expect(component.find('Button')).toHaveLength(1);
  });

  it('on form submit calls handleSubmit', () => {
    const preventDefault = jest.fn();
    component.find('form').simulate('submit', { preventDefault });
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('if there is a error show Alter message', () => {
    component = shallow(<SettingsFragmentFormBody alert="error" handleSubmit={handleSubmit} />);
    expect(component.find('Alert').prop('type')).toBe('error');
  });
});
