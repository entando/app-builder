import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import WidgetListPage from 'ui/widget-list-page/WidgetListPage';

const eventMock = {
  preventDefault: jest.fn(),
};

describe('ui/widget-list-page/WidgetListPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<WidgetListPage />);
  });
  it('renders component without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('should call onClickCreate when clicking ', () => {
    component.find('.WidgetListPage__add').simulate('click', eventMock);
    expect(eventMock.preventDefault).toHaveBeenCalled();
  });
});
