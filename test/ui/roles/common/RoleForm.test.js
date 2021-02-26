import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { RoleFormBody } from 'ui/roles/common/RoleForm';
import { mockIntl } from 'test/testUtils';

const handleSubmit = jest.fn();
const onSubmit = jest.fn();
const onWillMount = jest.fn();
const changeEvent = { currentTarget: { value: 'changed_name' } };

describe('RoleForm', () => {
  let roleForm;
  let submitting;
  let invalid;
  let permissions;

  beforeEach(() => {
    submitting = false;
    invalid = false;
  });
  const buildRoleForm = (mode) => {
    const props = {
      permissions,
      submitting,
      invalid,
      handleSubmit,
      onWillMount,
      onSubmit,
      mode,
      intl: mockIntl,
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
    it('on name change calls onChangeName if defined on props', () => {
      const onChangeName = jest.fn();
      roleForm = buildRoleForm();
      roleForm.setProps({ onChangeName });
      roleForm.find('[name="name"]').simulate('change', changeEvent);
      expect(onChangeName).toHaveBeenCalled();
    });

    it('on name change do nothing if onChangeName is not defined on props', () => {
      const onChangeName = jest.fn();
      roleForm = buildRoleForm();
      roleForm.find('[name="name"]').simulate('change', changeEvent);
      expect(onChangeName).not.toHaveBeenCalled();
    });

    it('disables submit button while submitting', () => {
      submitting = true;
      roleForm = buildRoleForm();
      const submitButton = roleForm.find('Button').first();
      expect(submitButton.prop('disabled')).toEqual(true);
    });

    it('disables submit button if form is invalid', () => {
      invalid = true;
      roleForm = buildRoleForm();
      const submitButton = roleForm.find('Button').first();
      expect(submitButton.prop('disabled')).toEqual(true);
    });

    it('on form submit calls handleSubmit', () => {
      roleForm = buildRoleForm();
      const preventDefault = jest.fn();
      roleForm.find('form').simulate('submit', { preventDefault });
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
