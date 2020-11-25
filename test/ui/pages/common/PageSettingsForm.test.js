import React from 'react';

import 'test/enzyme-init';
import { Spinner } from 'patternfly-react';
import { PageSettingsFormBody } from 'ui/pages/common/PageSettingsForm';
import { shallowWithIntl, mockIntl } from 'test/testUtils';

const ON_SUBMIT = jest.fn();
const HANDLE_SUBMIT = jest.fn();

const OPTIONS = [
  {
    code: 'homepage',
    fullTitles: 'title',
  },
  {
    code: 'service',
    fullTitles: 'title',
  },
];

describe('PageSettingsForm', () => {
  beforeEach(jest.clearAllMocks);

  describe('basic rendering', () => {
    let component;
    beforeEach(() => {
      component = shallowWithIntl((
        <PageSettingsFormBody
          onSubmit={ON_SUBMIT}
          handleSubmit={HANDLE_SUBMIT}
          options={OPTIONS}
          intl={mockIntl}
        />
      ));
    });
    it('renders without crashing', () => {
      expect(component.exists()).toBe(true);
    });
    it('component is Spinner', () => {
      expect(component.type()).toBe(Spinner);
    });
    it('test if RenderSelectInput options on Field are properly valued', () => {
      const selectComponent = component.find('Field').first();
      const { options } = selectComponent.props();
      expect(options).toHaveLength(OPTIONS.length);
      options.forEach((option, i) => {
        expect(option.value).toEqual(OPTIONS[i].code);
        expect(option.text).toEqual(OPTIONS[i].fullTitles);
      });
    });
  });
  describe('form fields rendering', () => {
    let component;
    beforeEach(() => {
      component = shallowWithIntl((
        <PageSettingsFormBody
          onSubmit={ON_SUBMIT}
          handleSubmit={HANDLE_SUBMIT}
          options={OPTIONS}
          intl={mockIntl}
        />
      ));
    });

    it('renders homePageCode field', () => {
      const homePageCode = component.find('[name="homePageCode"]');
      expect(homePageCode.exists()).toBe(true);
    });

    it('renders errorPageCode field', () => {
      const errorPageCode = component.find('[name="errorPageCode"]');
      expect(errorPageCode.exists()).toBe(true);
    });

    it('renders loginPageCode field', () => {
      const loginPageCode = component.find('[name="loginPageCode"]');
      expect(loginPageCode.exists()).toBe(true);
    });

    it('renders notFoundPageCode field', () => {
      const notFoundPageCode = component.find('[name="notFoundPageCode"]');
      expect(notFoundPageCode.exists()).toBe(true);
    });

    it('renders baseUrl field', () => {
      const notFoundPageCode = component.find('[name="baseUrl"]');
      expect(notFoundPageCode.exists()).toBe(true);
    });

    it('renders baseUrlContext field', () => {
      const baseUrlContext = component.find('[name="baseUrlContext"]');
      expect(baseUrlContext.exists()).toBe(true);
    });

    it('renders useJsessionId field', () => {
      const useJsessionId = component.find('[name="useJsessionId"]');
      expect(useJsessionId.exists()).toBe(true);
    });

    it('renders startLangFromBrowser field', () => {
      const startLangFromBrowser = component.find('[name="startLangFromBrowser"]');
      expect(startLangFromBrowser.exists()).toBe(true);
    });

    it('renders urlStyle field', () => {
      const urlStyle = component.find('[name="urlStyle"]');
      expect(urlStyle.exists()).toBe(true);
    });
  });

  describe('test form actions', () => {
    const component = shallowWithIntl((
      <PageSettingsFormBody
        onSubmit={ON_SUBMIT}
        handleSubmit={HANDLE_SUBMIT}
        options={OPTIONS}
        intl={mockIntl}
      />
    ));
    it('on form submit calls handleSubmit', () => {
      const preventDefault = jest.fn();
      component.find('form').simulate('submit', { preventDefault });
      expect(HANDLE_SUBMIT).toHaveBeenCalled();
    });
  });
});
