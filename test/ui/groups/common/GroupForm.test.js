import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { DEFAULT_FORM_VALUES } from 'state/groups/const';
import { GroupFormBody } from 'ui/groups/common/GroupForm';
import { mockIntl } from 'test/legacyTestUtils';

const handleSubmit = jest.fn();
const onSubmit = jest.fn();
const onWillMount = jest.fn();


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
      values: DEFAULT_FORM_VALUES,
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
    it('disables submit button while submitting', () => {
      submitting = true;
      groupForm = buildGroupForm();
      const submitButton = groupForm.find('Button').first();
      expect(submitButton.prop('disabled')).toEqual(true);
    });

    it('disables submit button if form is invalid', () => {
      invalid = true;
      groupForm = buildGroupForm();
      const submitButton = groupForm.find('Button').first();
      expect(submitButton.prop('disabled')).toEqual(true);
    });
  });
});
