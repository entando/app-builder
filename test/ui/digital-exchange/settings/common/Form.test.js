import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { required, isNumber } from '@entando/utils';

import RenderTextInput from 'ui/common/form/RenderTextInput';
import SwitchRenderer from 'ui/common/form/SwitchRenderer';
import { SettingsFormBody as SettingsForm, maxLength50 } from 'ui/digital-exchange/settings/common/Form';

const onWillMount = jest.fn();

jest.unmock('react-redux');
jest.unmock('redux-form');

const mockIntl = {
  formatMessage: () => {},
  defineMessages: () => {},
  intlShape: () => {},
  formatDate: () => {},
  formatTime: () => {},
  formatRelative: () => {},
  formatNumber: () => {},
  formatPlural: () => {},
  formatHTMLMessage: () => {},
  now: () => {},
};

describe('SettingsFormBody', () => {
  const component = shallow(<SettingsForm
    onWillMount={onWillMount}
    handleSubmit={() => {}}
    intl={mockIntl}
  />);

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('does not invoke onWillMount by default', () => {
    expect(onWillMount).not.toHaveBeenCalled();
  });

  it('contains the name field', () => {
    const element = component.find('Field[name="name"]');
    expect(element.exists()).toBe(true);
    const props = element.props();
    expect(props).toHaveProperty('validate', [required, maxLength50]);
    expect(props).toHaveProperty('component', RenderTextInput);
  });

  it('contains the url field', () => {
    const element = component.find('Field[name="url"]');
    expect(element.exists()).toBe(true);
    const props = element.props();
    expect(props).toHaveProperty('validate', [required]);
    expect(props).toHaveProperty('component', RenderTextInput);
  });

  it('contains the key field', () => {
    const element = component.find('Field[name="clientId"]');
    expect(element.exists()).toBe(true);
    const props = element.props();
    expect(props).toHaveProperty('component', RenderTextInput);
  });

  it('contains the secret field', () => {
    const element = component.find('Field[name="clientSecret"]');
    expect(element.exists()).toBe(true);
    const props = element.props();
    expect(props).toHaveProperty('component', RenderTextInput);
  });

  it('contains the timeout field', () => {
    const element = component.find('Field[name="timeout"]');
    expect(element.exists()).toBe(true);
    const props = element.props();
    expect(props).toHaveProperty('validate', [required, isNumber]);
    expect(props).toHaveProperty('component', RenderTextInput);
  });

  it('contains the active field', () => {
    const element = component.find('Field[name="active"]');
    expect(element.exists()).toBe(true);
    const props = element.props();
    expect(props).toHaveProperty('component', SwitchRenderer);
  });

  it('calls onWillMount when the id is set', () => {
    shallow(<SettingsForm
      onWillMount={onWillMount}
      id={12}
      handleSubmit={() => {}}
      intl={mockIntl}
    />);
    expect(onWillMount).toHaveBeenCalledWith(12);
  });
});
