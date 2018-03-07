import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import DataModelListPage from 'ui/data-models/list/DataModelListPage';

const eventMock = {
  preventDefault: jest.fn(),
};

describe('DataModelListPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<DataModelListPage />);
  });
  it('renders component without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('should call onClickCreate when clicking ', () => {
    component.find('.Datamodel__add').simulate('click', eventMock);
    expect(eventMock.preventDefault).toHaveBeenCalled();
  });
});
