import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { DataModelSearchFormBody } from 'ui/data-models/list/DataModelSearchForm';

const handleSubmitMock = jest.fn();

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
});
