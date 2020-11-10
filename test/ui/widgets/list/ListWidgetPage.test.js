import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { Spinner } from 'patternfly-react';
import ListWidgetPage from 'ui/widgets/list/ListWidgetPage';

describe('ListWidgetPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<ListWidgetPage title="Widgets" />);
  });

  it('renders component without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('has a link to add widget page', () => {
    expect(component.find('.ListWidgetPage__add[to="/widget/add"]').exists()).toBe(true);
  });

  it('has a Spinner without child', () => {
    expect(component.find(Spinner).children()).toHaveLength(0);
  });
});
