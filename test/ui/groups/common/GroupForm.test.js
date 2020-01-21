import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { GroupFormBody } from 'ui/groups/common/GroupForm';

const handleSubmit = jest.fn();
const onSubmit = jest.fn();
const onWillMount = jest.fn();
const changeEvent = { currentTarget: { value: 'changed_name' } };

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

describe('GroupForm', () => {
  let groupForm;
  let submitting;
  let invalid;
  let profileTypes;

  beforeEach(() => {
    submitting = false;
    invalid = false;
  });
  const buildGroupForm = (mode) => {
    const props = {
      profileTypes,
      submitting,
      invalid,
      handleSubmit,
      onWillMount,
      onSubmit,
      mode,
      intl: mockIntl,
    };

    return shallow(<GroupFormBody {...props} />);
  };

  it('root component renders without crashing', () => {
    groupForm = buildGroupForm();
    expect(groupForm.exists()).toBe(true);
  });

  describe('test with mode = new', () => {
    it('root component renders name field', () => {
      groupForm = buildGroupForm();
      const name = groupForm.find('Field[name="name"]');
      expect(name.exists()).toBe(true);
    });

    it('root component renders code field', () => {
      groupForm = buildGroupForm();
      const code = groupForm.find('Field[name="code"]');
      expect(code.exists()).toBe(true);
    });
  });

  describe('test buttons and handlers', () => {
    it('on name change calls onChangeName if defined on props', () => {
      const onChangeName = jest.fn();
      groupForm = buildGroupForm();
      groupForm.setProps({ onChangeName });
      const field = groupForm.find('Field[name="name"]').at(0);
      field.simulate('change', changeEvent);
      expect(onChangeName).toHaveBeenCalled();
    });

    it('on name change do nothing if onChangeName is not defined on props', () => {
      const onChangeName = jest.fn();
      groupForm = buildGroupForm();
      groupForm.find('Field[name="name"]').at(0).simulate('change', changeEvent);
      expect(onChangeName).not.toHaveBeenCalled();
    });

    it('on focus code calls onFocus if defined on props', () => {
      const onFocus = jest.fn();
      groupForm = buildGroupForm();
      groupForm.setProps({ onFocus });
      groupForm.find('Field[name="code"]').simulate('focus', { currentTarget: { name: 'code' } });
      expect(onFocus).toHaveBeenCalled();
    });

    it('on focus code calls onFocus if defined on props', () => {
      const onFocus = jest.fn();
      groupForm = buildGroupForm();
      groupForm.find('Field[name="code"]').simulate('focus', { currentTarget: { name: 'code' } });
      expect(onFocus).not.toHaveBeenCalled();
    });

    it('disables submit button while submitting', () => {
      submitting = true;
      groupForm = buildGroupForm();
      const submitButton = groupForm.find('Button');
      expect(submitButton.prop('disabled')).toEqual(true);
    });

    it('disables submit button if form is invalid', () => {
      invalid = true;
      groupForm = buildGroupForm();
      const submitButton = groupForm.find('Button');
      expect(submitButton.prop('disabled')).toEqual(true);
    });

    it('on form submit calls handleSubmit', () => {
      groupForm = buildGroupForm();
      const preventDefault = jest.fn();
      groupForm.find('form').simulate('submit', { preventDefault });
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
