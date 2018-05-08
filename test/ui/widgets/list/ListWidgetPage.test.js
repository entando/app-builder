import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { Spinner } from 'patternfly-react';
import ListWidgetPage from 'ui/widgets/list/ListWidgetPage';
import { WIDGET_ONE_LIST } from 'test/mocks/widgets';

const eventMock = {
  preventDefault: jest.fn(),
};

describe('ListWidgetPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<ListWidgetPage title="Widgets" />);
  });
  it('renders component without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('should call onClickCreate when clicking ', () => {
    component.find('.ListWidgetPage__add').simulate('click', eventMock);
    expect(eventMock.preventDefault).toHaveBeenCalled();
  });

  it('has a Spinner without child', () => {
    expect(component.find(Spinner).children()).toHaveLength(0);
  });

  it('has a Spinner with child WidgetListTable', () => {
    component = shallow(<ListWidgetPage title="Widgets" loading widgetList={WIDGET_ONE_LIST} />);
    expect(component.find(Spinner).children()).toHaveLength(1);
  });
});
