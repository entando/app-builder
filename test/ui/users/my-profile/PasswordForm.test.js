import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { Form } from 'patternfly-react';
import { required } from '@entando/utils';

import { PasswordFormBody } from 'ui/users/my-profile/PasswordForm';
import RenderTextInput from 'ui/common/form/RenderTextInput';

describe('PasswordForm', () => {
  let component;
  beforeEach(() => {
    component = shallow(<PasswordFormBody onSubmit={() => {}} username="admin" handleSubmit={() => {}} />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('verify it is a form', () => {
    expect(component.type()).toBe(Form);
  });

  it('has a oldPassword text field', () => {
    const element = component.find('Field[name="oldPassword"]');
    expect(element.exists()).toBe(true);
    const props = element.props();
    expect(props).toHaveProperty('component', RenderTextInput);
    expect(props).toHaveProperty('validate', required);
  });

  it('has a newPassword text field', () => {
    const element = component.find('Field[name="newPassword"]');
    expect(element.exists()).toBe(true);
    const props = element.props();
    expect(props).toHaveProperty('component', RenderTextInput);
    expect(props).toHaveProperty('validate', required);
  });

  it('has a newPasswordConfirm text field', () => {
    const element = component.find('Field[name="newPasswordConfirm"]');
    expect(element.exists()).toBe(true);
    const props = element.props();
    expect(props).toHaveProperty('component', RenderTextInput);
    expect(props).toHaveProperty('validate', [required, expect.any(Function)]);
  });
});
