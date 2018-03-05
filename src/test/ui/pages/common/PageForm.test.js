
import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { PageFormBody } from 'ui/pages/common/PageForm';
import { GROUPS as GROUPS_RESPONSE } from 'test/mocks/groups';
import { GET_LIST_RESPONSE } from 'test/mocks/pageModels';
import { getContentTypes, getCharsets } from 'state/pages/selectors';

const ON_SUBMIT = jest.fn();
const HANDLE_SUBMIT = jest.fn();
const PAGE_MODELS = GET_LIST_RESPONSE.payload;
const GROUPS = GROUPS_RESPONSE.payload;
const CONTENT_TYPES = getContentTypes();
const CHARSETS = getCharsets();
const ON_WILL_MOUNT = jest.fn();
const ON_CHANGE_EN_TITLE = jest.fn();

const CHANGE_EVENT = {
  currentTarget: { value: 'test' },
};


describe('PageForm', () => {
  beforeEach(jest.clearAllMocks);

  describe('basic rendering', () => {
    let component;
    beforeEach(() => {
      component = shallow((
        <PageFormBody
          onSubmit={ON_SUBMIT}
          handleSubmit={HANDLE_SUBMIT}
          groups={GROUPS}
          pageModels={PAGE_MODELS}
          contentTypes={CONTENT_TYPES}
          charsets={CHARSETS}
          selectedJoinGroups={[]}
        />
      ));
    });

    it('renders without crashing', () => {
      expect(component.exists()).toBe(true);
    });

    it('has class PageForm', () => {
      expect(component.hasClass('PageForm')).toBe(true);
    });

    it('renders the charsets options', () => {
      const options = component.find('.PageForm__charsets-select option');
      expect(options).toHaveLength(CHARSETS.length);
      options.forEach((option, i) => {
        expect(option.prop('value')).toBe(CHARSETS[i]);
        expect(option.text()).toBe(CHARSETS[i]);
      });
    });

    it('renders the content-types options', () => {
      const options = component.find('.PageForm__content-types-select option');
      expect(options).toHaveLength(CONTENT_TYPES.length);
      options.forEach((option, i) => {
        expect(option.prop('value')).toBe(CONTENT_TYPES[i]);
        expect(option.text()).toBe(CONTENT_TYPES[i]);
      });
    });

    it('when changing the en title, it calls nothing', () => {
      component.find('Field[name="titles.en"]').prop('onChange')(CHANGE_EVENT);
      expect(ON_CHANGE_EN_TITLE).not.toHaveBeenCalled();
    });
  });

  describe('with onWillMount callback', () => {
    beforeEach(() => {
      shallow((
        <PageFormBody
          onSubmit={ON_SUBMIT}
          handleSubmit={HANDLE_SUBMIT}
          groups={GROUPS}
          pageModels={PAGE_MODELS}
          contentTypes={CONTENT_TYPES}
          charsets={CHARSETS}
          selectedJoinGroups={[]}
          onWillMount={ON_WILL_MOUNT}
        />
      ));
    });

    it('calls onWillMount', () => {
      expect(ON_WILL_MOUNT).toHaveBeenCalled();
    });
  });

  describe('with onChangeEnTitle callback', () => {
    it('when changing the en title, it calls onChangeEnTitle', () => {
      const component = shallow((
        <PageFormBody
          onSubmit={ON_SUBMIT}
          handleSubmit={HANDLE_SUBMIT}
          groups={GROUPS}
          pageModels={PAGE_MODELS}
          contentTypes={CONTENT_TYPES}
          charsets={CHARSETS}
          selectedJoinGroups={[]}
          onChangeEnTitle={ON_CHANGE_EN_TITLE}
        />
      ));
      component.find('Field[name="titles.en"]').prop('onChange')(CHANGE_EVENT);
      expect(ON_CHANGE_EN_TITLE).toHaveBeenCalledWith(CHANGE_EVENT.currentTarget.value);
    });
  });

  describe('if form is invalid', () => {
    let component;
    beforeEach(() => {
      component = shallow((
        <PageFormBody
          onSubmit={ON_SUBMIT}
          handleSubmit={HANDLE_SUBMIT}
          groups={GROUPS}
          pageModels={PAGE_MODELS}
          contentTypes={CONTENT_TYPES}
          charsets={CHARSETS}
          selectedJoinGroups={[]}
          invalid
        />
      ));
    });
    it('Save button is disabled', () => {
      expect(component.find('.PageForm__save-btn').prop('disabled')).toBe(true);
    });
    it('Save and configure button is disabled', () => {
      expect(component.find('.PageForm__save-and-configure-btn').prop('disabled')).toBe(true);
    });
  });

  describe('if form is submitting', () => {
    let component;
    beforeEach(() => {
      component = shallow((
        <PageFormBody
          onSubmit={ON_SUBMIT}
          handleSubmit={HANDLE_SUBMIT}
          groups={GROUPS}
          pageModels={PAGE_MODELS}
          contentTypes={CONTENT_TYPES}
          charsets={CHARSETS}
          selectedJoinGroups={[]}
          submitting
        />
      ));
    });
    it('Save button is disabled', () => {
      expect(component.find('.PageForm__save-btn').prop('disabled')).toBe(true);
    });
    it('Save and configure button is disabled', () => {
      expect(component.find('.PageForm__save-and-configure-btn').prop('disabled')).toBe(true);
    });
  });

  describe('if form is valid', () => {
    let component;
    beforeEach(() => {
      component = shallow((
        <PageFormBody
          onSubmit={ON_SUBMIT}
          handleSubmit={HANDLE_SUBMIT}
          groups={GROUPS}
          pageModels={PAGE_MODELS}
          contentTypes={CONTENT_TYPES}
          charsets={CHARSETS}
          selectedJoinGroups={[]}
          invalid={false}
        />
      ));
    });
    it('Save button is enabled', () => {
      expect(component.find('.PageForm__save-btn').prop('disabled')).toBe(false);
    });
    it('Save and configure button is enabled', () => {
      expect(component.find('.PageForm__save-and-configure-btn').prop('disabled')).toBe(false);
    });
  });
});
