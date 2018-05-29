import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { DataModelFormBody } from 'ui/data-models/common/DataModelForm';

const handleSubmit = jest.fn();
const onWillMount = jest.fn();

describe('DataModelForm', () => {
  beforeEach(jest.clearAllMocks);

  let dataModelForm;
  let submitting;
  let invalid;

  beforeEach(() => {
    submitting = false;
    invalid = false;
  });
  const buildDataModelForm = () => {
    const props = {
      submitting,
      invalid,
      handleSubmit,
      onWillMount,
    };

    return shallow(<DataModelFormBody {...props} />);
  };

  it('root component renders without crashing', () => {
    dataModelForm = buildDataModelForm();
    expect(dataModelForm.exists()).toEqual(true);
  });

  it('disables submit button while submitting', () => {
    submitting = true;
    dataModelForm = buildDataModelForm();
    const submitButton = dataModelForm.find('Button');
    expect(submitButton.prop('disabled')).toEqual(true);
  });

  it('disables submit button if form is invalid', () => {
    invalid = true;
    dataModelForm = buildDataModelForm();
    const submitButton = dataModelForm.find('Button');
    expect(submitButton.prop('disabled')).toEqual(true);
  });

  it('on form submit calls handleSubmit', () => {
    dataModelForm = buildDataModelForm();
    dataModelForm.find('Form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });
});
