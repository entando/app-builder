import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { DataModelSearchFormBody } from 'ui/data-models/list/DataModelSearchForm';

const handleSubmitMock = jest.fn();
const EVENT = { preventDefault: jest.fn() };

describe('PageSearchForm', () => {
  beforeEach(jest.clearAllMocks);

  let component;
  beforeEach(() => {
    component = shallow(<DataModelSearchFormBody handleSubmit={handleSubmitMock} />);
  });
  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });
  it('has the PageSearchForm class', () => {
    expect(component.hasClass('DataModelSearchForm')).toBe(true);
  });
  it('form onSubmit calls handleSubmit', () => {
    component.find('form').prop('onSubmit')(EVENT);
    expect(EVENT.preventDefault).toHaveBeenCalled();
    expect(handleSubmitMock).toHaveBeenCalled();
  });
});
