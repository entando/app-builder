import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { PageSettingsFormBody } from 'ui/pages/common/PageSettingsForm';

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
      component = shallow((
        <PageSettingsFormBody
          onSubmit={ON_SUBMIT}
          handleSubmit={HANDLE_SUBMIT}
          options={OPTIONS}
        />
      ));
    });
    it('renders without crashing', () => {
      expect(component.exists()).toBe(true);
    });
    it('has class PageSettingsForm', () => {
      expect(component.hasClass('PageSettingsForm')).toBe(true);
    });
    it('test if RenderSelectInput options are properly valued', () => {
      const selectComponent = component.find('RenderSelectInput').first();
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
      component = shallow((
        <PageSettingsFormBody
          onSubmit={ON_SUBMIT}
          handleSubmit={HANDLE_SUBMIT}
          options={OPTIONS}
        />
      ));
    });

    it('renders homePageCode field', () => {
      const homePageCode = component.find('[fieldName="homePageCode"]');
      expect(homePageCode.exists()).toBe(true);
    });

    it('renders errorPageCode field', () => {
      const errorPageCode = component.find('[fieldName="errorPageCode"]');
      expect(errorPageCode.exists()).toBe(true);
    });

    it('renders loginPageCode field', () => {
      const loginPageCode = component.find('[fieldName="loginPageCode"]');
      expect(loginPageCode.exists()).toBe(true);
    });

    it('renders notFoundPageCode field', () => {
      const notFoundPageCode = component.find('[fieldName="notFoundPageCode"]');
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
    const component = shallow((
      <PageSettingsFormBody
        onSubmit={ON_SUBMIT}
        handleSubmit={HANDLE_SUBMIT}
        options={OPTIONS}
      />
    ));
    it('on form submit calls handleSubmit', () => {
      const preventDefault = jest.fn();
      component.find('form').simulate('submit', { preventDefault });
      expect(HANDLE_SUBMIT).toHaveBeenCalled();
    });
  });
});
