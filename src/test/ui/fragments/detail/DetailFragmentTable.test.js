import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import DetailFragmentTable from 'ui/fragments/detail/DetailFragmentTable';


describe('DetailFragmentTable', () => {
  let component;
  let handleEdit;
  let code;
  let title;
  let pluginCode;

  beforeEach(() => {
    code = 'code_test';
    title = 'title_test';
    pluginCode = 'plugincode_test';
    handleEdit = jest.fn();
  });

  const buildDetailFragmentTable = () => {
    const props = {
      handleEdit,
      code,
      title,
      pluginCode,
    };
    return shallow(<DetailFragmentTable {...props} />);
  };

  it('renders without crashing', () => {
    component = buildDetailFragmentTable();
    expect(component.exists()).toEqual(true);
  });

  it('verify click edit button', () => {
    component = buildDetailFragmentTable();
    const preventDefault = jest.fn();
    component.find('Button').simulate('click', { preventDefault });
    expect(handleEdit).toHaveBeenCalled();
    expect(handleEdit).toHaveBeenCalledWith('code_test');
  });
});
