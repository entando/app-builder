import React from 'react';

import 'test/enzyme-init';
import { mount, shallow } from 'enzyme';
import { Spinner } from 'patternfly-react';
import ListWidgetPage from 'ui/widgets/list/ListWidgetPage';
import { WIDGET_ONE_LIST } from 'test/mocks/widgets';
import { ROUTE_WIDGET_ADD } from 'app-init/router';
import { MemoryRouter } from 'react-router-dom';

describe('ListWidgetPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<ListWidgetPage title="Widgets" />);
  });

  it('renders component without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  xit('should open edit widget screen when clicking ', () => {
    const cmp = mount(<MemoryRouter><ListWidgetPage title="Widgets" /></MemoryRouter>);
    cmp.find('Button.ListWidgetPage__add').simulate('click');
    expect(window.location.href).toMatch(ROUTE_WIDGET_ADD);
  });

  it('has a Spinner without child', () => {
    expect(component.find(Spinner).children()).toHaveLength(0);
  });

  it('has a Spinner with child WidgetListTable', () => {
    component = shallow(<ListWidgetPage title="Widgets" loading widgetList={WIDGET_ONE_LIST} />);
    expect(component.find(Spinner).children()).toHaveLength(1);
  });
});
