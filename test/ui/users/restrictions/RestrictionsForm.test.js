import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { Form } from 'patternfly-react';
import { isNumber } from '@entando/utils';

import { RestrictionsFormBody, montshSinceLogin } from 'ui/users/restrictions/RestrictionsForm';
import SwitchRenderer from 'ui/common/form/SwitchRenderer';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import { shallowWithIntl } from '../../../test/testUtils';

describe('RestrictionsForm', () => {
  const onWillMount = jest.fn();
  let component;
  beforeEach(() => {
    component =
    shallowWithIntl(<RestrictionsFormBody handleSubmit={() => {}} onWillMount={onWillMount} />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('calls onWillMount on mount', () => {
    expect(onWillMount).toHaveBeenCalled();
  });

  it('verify it is a form', () => {
    expect(component.type()).toBe(Form);
  });

  it('has a passwordAlwaysActive toggle', () => {
    const element = component.find('Field[name="passwordAlwaysActive"]');
    expect(element.exists()).toBe(true);
    expect(element.props()).toHaveProperty('component', SwitchRenderer);
  });

  it('has an enabled maxMonthsPasswordValid text field', () => {
    const element = component.find('Field[name="maxMonthsPasswordValid"]');
    expect(element.exists()).toBe(true);
    const props = element.props();
    expect(props).toHaveProperty('component', RenderTextInput);
    expect(props).toHaveProperty('disabled', false);
    expect(props).toHaveProperty('validate', isNumber);
  });

  it('has an enabled lastAccessPasswordExpirationMonths text field', () => {
    const element = component.find('Field[name="lastAccessPasswordExpirationMonths"]');
    expect(element.exists()).toBe(true);
    const props = element.props();
    expect(props).toHaveProperty('component', RenderTextInput);
    expect(props).toHaveProperty('disabled', false);
    expect(props).toHaveProperty('validate', [isNumber, montshSinceLogin]);
  });

  it('has a enableGravatarIntegration toggle', () => {
    const element = component.find('Field[name="enableGravatarIntegration"]');
    expect(element.exists()).toBe(true);
    expect(element.props()).toHaveProperty('component', SwitchRenderer);
  });

  describe('with passwordActive true', () => {
    beforeEach(() => {
      component.setProps({ passwordActive: true });
    });

    it('has a disabled maxMonthsPasswordValid text field', () => {
      const element = component.find('Field[name="maxMonthsPasswordValid"]');
      expect(element.exists()).toBe(true);
      const props = element.props();
      expect(props).toHaveProperty('component', RenderTextInput);
      expect(props).toHaveProperty('disabled', true);
      expect(props).toHaveProperty('validate', isNumber);
    });

    it('has a disabled lastAccessPasswordExpirationMonths text field', () => {
      const element = component.find('Field[name="lastAccessPasswordExpirationMonths"]');
      expect(element.exists()).toBe(true);
      const props = element.props();
      expect(props).toHaveProperty('component', RenderTextInput);
      expect(props).toHaveProperty('disabled', true);
      expect(props).toHaveProperty('validate', [isNumber, montshSinceLogin]);
    });
  });
});
