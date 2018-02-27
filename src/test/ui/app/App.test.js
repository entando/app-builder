
import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import App from 'ui/app/App';
import DashboardPage from 'ui/dashboard/DashboardPage';
import WidgetPage from 'ui/app-pages/WidgetPage';
import FragmentPage from 'ui/app-pages/FragmentPage';
import WidgetEditPageContainer from 'ui/widgets/WidgetEditPageContainer';
import { NotFoundPage } from 'frontend-common-components';


it('renders without crashing', () => {
  const component = shallow(<App route="home" />);
  expect(component.exists()).toEqual(true);
});

it('route to dashboard', () => {
  const component = shallow(<App route="dashboard" />);
  expect(component.contains(<DashboardPage />)).toEqual(true);
});

it('route to widget entry page', () => {
  const component = shallow(<App route="widgetForm" />);
  expect(component.contains(<WidgetPage />)).toEqual(true);
});

it('route to widget entry page', () => {
  const component = shallow(<App route="widgetForm" />);
  expect(component.contains(<WidgetPage />)).toEqual(true);
});

it('route to widget edit page', () => {
  const component = shallow(<App route="widgetEdit" />);
  expect(component.contains(<WidgetEditPageContainer />)).toEqual(true);
});

it('route to fragment entry page', () => {
  const component = shallow(<App route="fragment" />);
  expect(component.contains(<FragmentPage />)).toEqual(true);
});

it('default route', () => {
  const component = shallow(<App route="test" />);
  expect(component.contains(<NotFoundPage />)).toEqual(true);
});
