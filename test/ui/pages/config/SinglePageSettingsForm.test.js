import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { SinglePageSettingsFormBody } from 'ui/pages/config/SinglePageSettingsForm';

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
});
