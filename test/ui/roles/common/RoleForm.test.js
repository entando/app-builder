import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { RoleFormBody } from 'ui/roles/common/RoleForm';
import { mockIntl } from 'test/legacyTestUtils';

const onWillMount = jest.fn();
const submitForm = jest.fn();
const setFieldValue = jest.fn();
const handleChange = jest.fn();
const changeEvent = { currentTarget: { value: 'changed_name' } };

describe('RoleForm', () => {
  let roleForm;
  let isSubmitting;
  let isValid;
  let permissions;
  let values;

  beforeEach(() => {
    isSubmitting = false;
    isValid = true;
    values = {};
  });
  const buildRoleForm = (mode) => {
    const props = {
      permissions,
      isSubmitting,
      isValid,
      onWillMount,
      submitForm,
      mode,
      setFieldValue,
      handleChange,
      intl: mockIntl,
      values,
    };

    return shallow(<RoleFormBody {...props} />);
  };

  it('root component renders without crashing', () => {
    roleForm = buildRoleForm();
    expect(roleForm.exists()).toEqual(true);
  });

  describe('test with mode = new', () => {
    it('root component renders name field', () => {
      roleForm = buildRoleForm();
      const name = roleForm.find('[name="name"]');
      expect(name.exists()).toBe(true);
    });

    it('root component renders code field', () => {
      roleForm = buildRoleForm();
      const code = roleForm.find('[name="code"]');
      expect(code.exists()).toBe(true);
    });
  });

  describe('test with mode = edit', () => {
    it('code field has property \'disabled\'', () => {
      roleForm = buildRoleForm('edit');
      const code = roleForm.find('[name="code"]');
      expect(code.prop('disabled')).toBe(true);
    });
  });

  describe('test buttons and handlers', () => {
    it('on name change do nothing if onChangeName is not defined on props', () => {
      const onChangeName = jest.fn();
      roleForm = buildRoleForm();
      roleForm.find('[name="name"]').simulate('change', changeEvent);
      expect(onChangeName).not.toHaveBeenCalled();
    });

    it('disables submit button while submitting', () => {
      isSubmitting = true;
      roleForm = buildRoleForm();
      const submitButton = roleForm.find('Button').first();
      expect(submitButton.prop('disabled')).toEqual(true);
    });

    it('disables submit button if form is invalid', () => {
      isValid = false;
      roleForm = buildRoleForm();
      const submitButton = roleForm.find('Button').first();
      expect(submitButton.prop('disabled')).toEqual(true);
    });
  });
});
