import React from 'react';
import 'test/enzyme-init';
import { shallow, mount } from 'enzyme';
import FragmentSearchForm, { renderSelectOptgroup } from 'ui/fragments/list/FragmentSearchForm';
import { mockRenderWithIntl } from 'test/testUtils';

const handleSubmit = jest.fn();

const WIDGET_TYPES_OPTIONS = [
  {
    optgroup: 'User Widget',
    options: [
      { code: 'code1', title: 'title1' },
    ],
  },
];

jest.unmock('react-redux');
jest.unmock('redux-form');

describe('FragmentSearchForm', () => {
  let fragmentSearchForm;
  let submitting;
  let invalid;


  beforeEach(() => {
    submitting = false;
    invalid = false;
  });
  const buildFragmentSearchForm = () => {
    const props = {
      submitting,
      invalid,
      handleSubmit,
    };

    return mount(mockRenderWithIntl(<FragmentSearchForm {...props} />));
  };

  describe('basic render tests', () => {
    beforeEach(() => {
      fragmentSearchForm = buildFragmentSearchForm();
    });
    it('root component renders without crashing', () => {
      expect(fragmentSearchForm.exists()).toBe(true);
    });

    it('root component renders code field', () => {
      const code = fragmentSearchForm.find('[name="code"]');
      expect(code.exists()).toBe(true);
    });

    it('root component renders widgetType field', () => {
      const widgetType = fragmentSearchForm.find('[name="widgetType.code"]');
      expect(widgetType.exists()).toEqual(true);
    });
    it('root component renders plugin Field', () => {
      const plugin = fragmentSearchForm.find('[name="pluginCode"]');
      expect(plugin.exists()).toBe(true);
    });

    it('root component renders options for select input', () => {
      const optgroups = renderSelectOptgroup(WIDGET_TYPES_OPTIONS);
      expect(optgroups).toHaveLength(1);
    });
  });

  it('on form submit calls handleSubmit', () => {
    fragmentSearchForm = buildFragmentSearchForm();
    const preventDefault = jest.fn();
    fragmentSearchForm.find('form').simulate('submit', { preventDefault });
    expect(handleSubmit).toHaveBeenCalled();
  });
});
