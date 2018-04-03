import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { AddLabelsPageFormBody } from 'ui/labels/common/AddLabelsPageForm';
import { LANGUAGES_LIST } from 'test/mocks/languages';

const ON_SUBMIT = jest.fn();
const HANDLE_SUBMIT = jest.fn();
const LANGUAGES = LANGUAGES_LIST;
const ON_WILL_MOUNT = jest.fn();


describe('LabelsForm', () => {
  beforeEach(jest.clearAllMocks);

  describe('basic rendering', () => {
    let component;
    beforeEach(() => {
      component = shallow((
        <AddLabelsPageFormBody
          onSubmit={ON_SUBMIT}
          handleSubmit={HANDLE_SUBMIT}
          languages={LANGUAGES}

        />
      ));
    });

    it('renders without crashing', () => {
      expect(component.exists()).toBe(true);
    });

    it('has class PageForm', () => {
      expect(component.hasClass('AddLabelsPageForm')).toBe(true);
    });
  });

  describe('with onWillMount callback', () => {
    beforeEach(() => {
      shallow((
        <AddLabelsPageFormBody
          onSubmit={ON_SUBMIT}
          handleSubmit={HANDLE_SUBMIT}
          languages={LANGUAGES}
          onWillMount={ON_WILL_MOUNT}
        />
      ));
    });

    it('calls onWillMount', () => {
      expect(ON_WILL_MOUNT).toHaveBeenCalled();
    });
  });
  describe('save button is disabled', () => {
    let component;
    beforeEach(() => {
      component = shallow((
        <AddLabelsPageFormBody
          onSubmit={ON_SUBMIT}
          handleSubmit={HANDLE_SUBMIT}
          languages={LANGUAGES}
          invalid
        />
      ));
    });
    it('Save button is disabled', () => {
      expect(component.find('.AddLabelsPageForm__save-btn').prop('disabled')).toBe(true);
    });
  });
  describe('save button is disabled', () => {
    let component;
    beforeEach(() => {
      component = shallow((
        <AddLabelsPageFormBody
          onSubmit={ON_SUBMIT}
          handleSubmit={HANDLE_SUBMIT}
          languages={LANGUAGES}
        />
      ));
    });
    it('Save button is disabled', () => {
      expect(component.find('.AddLabelsPageForm__save-btn').prop('disabled')).toBe(false);
    });
  });
  describe('save button is disabled', () => {
    let component;
    const preventDefault = jest.fn();
    beforeEach(() => {
      component = shallow((
        <AddLabelsPageFormBody
          onSubmit={ON_SUBMIT}
          handleSubmit={HANDLE_SUBMIT}
          languages={LANGUAGES}
        />
      ));
    });
    it('on form submit calls handleSubmit', () => {
      component.find('form').simulate('submit', { preventDefault });
      expect(HANDLE_SUBMIT).toHaveBeenCalled();
    });
  });
});
