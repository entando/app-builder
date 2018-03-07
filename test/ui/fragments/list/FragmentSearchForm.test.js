import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { FragmentSearchFormBody, renderSelectOptgroup } from 'ui/fragments/list/FragmentSearchForm';

const handleSubmit = jest.fn();

const WIDGET_TYPES_OPTIONS = [
  {
    optgroup: 'CMS',
    options: [
      {
        code: 'row_content_viewer_list',
        title: 'Contents - Publish Contents',
      },
      {
        code: 'content_viewer',
        title: 'Contents - Publish a Content',
      },
      {
        code: 'content_viewer_list',
        title: 'Contents - Publish a List of Contents',
      },
      {
        code: 'search_result',
        title: 'Search - Search Result',
      },
    ],
  },
  {
    optgroup: 'User widgets',
    options: [
      {
        code: 'user_widget_test',
        title: 'Test Widget',
      },
    ],
  },
];

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

    return shallow(<FragmentSearchFormBody {...props} />);
  };

  describe('basic render tests', () => {
    beforeEach(() => {
      fragmentSearchForm = buildFragmentSearchForm();
    });
    it('root component renders without crashing', () => {
      expect(fragmentSearchForm.exists()).toEqual(true);
    });

    it('root component renders code field', () => {
      const code = fragmentSearchForm.find('[name="code"]');
      expect(code.exists()).toEqual(true);
    });

    it('root component renders widgetType field', () => {
      const widgetType = fragmentSearchForm.find('[name="widgetType"]');
      expect(widgetType.exists()).toEqual(true);
    });
    it('root component renders plugin Field', () => {
      const plugin = fragmentSearchForm.find('[name="plugin"]');
      expect(plugin.exists()).toEqual(true);
    });

    it('root component renders options for select input', () => {
      const optgroups = renderSelectOptgroup(WIDGET_TYPES_OPTIONS);
      expect(optgroups.length).toBe(2);
    });
  });

  it('on form submit calls handleSubmit', () => {
    fragmentSearchForm = buildFragmentSearchForm();
    const preventDefault = jest.fn();
    fragmentSearchForm.find('form').simulate('submit', { preventDefault });
    expect(handleSubmit).toHaveBeenCalled();
  });
});
