import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import ListWidgetPage from 'ui/widgets/list/ListWidgetPage';

const eventMock = {
  preventDefault: jest.fn(),
};

describe('ListWidgetPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<ListWidgetPage />);
  });
  it('renders component without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('should call onClickCreate when clicking ', () => {
    component.find('.ListWidgetPage__add').simulate('click', eventMock);
    expect(eventMock.preventDefault).toHaveBeenCalled();
  });
});
