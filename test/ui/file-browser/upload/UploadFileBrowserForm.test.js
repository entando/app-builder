import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { UploadFileBrowserBody } from 'ui/file-browser/upload/UploadFileBrowserForm';

const handleSubmit = jest.fn();

const props = {
  submitting: false,
  invalid: false,
  handleSubmit,

};

describe('UploadFileBrowserBody', () => {
  let component;
  beforeEach(() => {
    component = shallow(<UploadFileBrowserBody {...props} />);
  });

  it('root component renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('has a Field file', () => {
    expect(component.find('[name="file"]').exists()).toBe(true);
  });

  it('has a FormGroup', () => {
    expect(component.find('FormGroup').exists()).toBe(true);
  });

  it('has a Buttons  save and cancel', () => {
    expect(component.find('Button')).toHaveLength(2);
    expect(component.find('Button').first().hasClass('UploadFileBrowserForm__btn-save')).toBe(true);
    expect(component.find('Button').last().hasClass('UploadFileBrowserForm__btn-cancel')).toBe(true);
  });
});
