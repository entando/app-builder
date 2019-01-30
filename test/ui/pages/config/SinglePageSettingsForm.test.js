import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { required } from '@entando/utils';
import { SinglePageSettingsFormBody, maxLength70 } from 'ui/pages/config/SinglePageSettingsForm';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import SwitchRenderer from 'ui/common/form/SwitchRenderer';
import MultiSelectRenderer from 'ui/pages/common/MultiSelectRenderer';

const ACTIVE_NON_DEFAULT_LANGUAGES = [
  {
    code: 'it',
    name: 'italiano',
    isActive: true,
    isDefault: false,
  },
  {
    code: 'es',
    name: 'espanol',
    isActive: true,
    isDefault: false,
  },
];
const DEFAULT_LANGUAGE = 'en';
const CHARSETS = [];
const CONTENT_TYPES = [];
const GROUPS = [];
const HANDLE_SUBMIT = jest.fn();
const ON_RESET = jest.fn();
const ON_WILL_MOUNT = jest.fn();
const INTL = { formatMessage: jest.fn() };

describe('SinglePageSettingsForm', () => {
  let component;
  beforeEach(() => {
    jest.clearAllMocks();
    component = shallow((
      <SinglePageSettingsFormBody
        intl={INTL}
        defaultLanguage={DEFAULT_LANGUAGE}
        activeNonDefaultLanguages={ACTIVE_NON_DEFAULT_LANGUAGES}
        charsets={CHARSETS}
        contentTypes={CONTENT_TYPES}
        groups={GROUPS}
        handleSubmit={HANDLE_SUBMIT}
        onReset={ON_RESET}
        onWillMount={ON_WILL_MOUNT}
      />
    ));
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('will call onWillMount on componentWillMount', () => {
    expect(ON_WILL_MOUNT).toHaveBeenCalled();
  });

  it('has title section', () => {
    expect(component.exists('FormSection[name="titles"]')).toBeTruthy();
  });

  it('has required default title field', () => {
    const element = component.find('Field[name="en"]');
    expect(element).toExist();
    const props = element.props();
    expect(props).toHaveProperty('component', RenderTextInput);
    expect(props).toHaveProperty('validate', [required, maxLength70]);
  });

  it('has non-default title fields', () => {
    const itField = component.find('Field[name="it"]');
    expect(itField).toExist();
    const itProps = itField.props();
    expect(itProps).toHaveProperty('validate', maxLength70);

    const esField = component.find('Field[name="es"]');
    expect(esField).toExist();
    const esProps = esField.props();
    expect(esProps).toHaveProperty('validate', maxLength70);
  });

  it('has disabled "owner group" field', () => {
    const element = component.find('Field[name="ownerGroup"]');
    expect(element).toExist();
    const props = element.props();
    expect(props).toHaveProperty('disabled');
    expect(props).toHaveProperty('component', RenderSelectInput);
    expect(props).toHaveProperty('validate', required);
  });

  it('has "join groups" field', () => {
    const element = component.find('FieldArray[name="joinGroups"]');
    expect(element).toExist();
    const props = element.props();
    expect(props).toHaveProperty('component', MultiSelectRenderer);
  });

  it('has "displayed in menu" field', () => {
    const element = component.find('Field[name="displayedInMenu"]');
    expect(element).toExist();
    const props = element.props();
    expect(props).toHaveProperty('component', SwitchRenderer);
  });

  it('has charset field', () => {
    const element = component.find('Field[name="charset"]');
    expect(element).toExist();
    const props = element.props();
    expect(props).toHaveProperty('component', RenderSelectInput);
  });

  it('has content type field', () => {
    const element = component.find('Field[name="contentType"]');
    expect(element).toExist();
    const props = element.props();
    expect(props).toHaveProperty('component', RenderSelectInput);
  });
});
