import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { CategoryFormBody } from 'ui/categories/common/CategoryForm';

const handleSubmit = jest.fn();
const onSubmit = jest.fn();
const onWillMount = jest.fn();
const activeLanguages = [];

describe('CategoryForm', () => {
  let categoryForm;
  let submitting;
  let invalid;
  let permissions;

  beforeEach(() => {
    submitting = false;
    invalid = false;
  });
  const buildCategoryForm = (mode) => {
    const props = {
      activeLanguages,
      permissions,
      submitting,
      invalid,
      handleSubmit,
      onWillMount,
      onSubmit,
      mode,
    };

    return shallow(<CategoryFormBody {...props} />);
  };

  it('root component renders without crashing', () => {
    categoryForm = buildCategoryForm();
    expect(categoryForm.exists()).toEqual(true);
  });

  describe('test with mode = add', () => {
    it('root component renders code field', () => {
      categoryForm = buildCategoryForm();
      const name = categoryForm.find('[name="code"]');
      expect(name.exists()).toBe(true);
    });

    it('root component renders parentCode field', () => {
      categoryForm = buildCategoryForm();
      const code = categoryForm.find('[name="parentCode"]');
      expect(code.exists()).toBe(true);
    });
  });

  describe('test with mode = edit', () => {
    it('code field has property \'disabled\'', () => {
      categoryForm = buildCategoryForm('edit');
      const code = categoryForm.find('[name="code"]');
      expect(code.prop('disabled')).toBe(true);
    });
  });

  describe('test buttons and handlers', () => {
    it('disables submit button while submitting', () => {
      submitting = true;
      categoryForm = buildCategoryForm();
      const submitButton = categoryForm.find('Button');
      expect(submitButton.prop('disabled')).toEqual(true);
    });

    it('disables submit button if form is invalid', () => {
      invalid = true;
      categoryForm = buildCategoryForm();
      const submitButton = categoryForm.find('Button');
      expect(submitButton.prop('disabled')).toEqual(true);
    });

    it('on form submit calls handleSubmit', () => {
      categoryForm = buildCategoryForm();
      const preventDefault = jest.fn();
      categoryForm.find('form').simulate('submit', { preventDefault });
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
