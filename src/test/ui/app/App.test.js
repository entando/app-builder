
import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import App from 'ui/app/App';
import DashboardPage from 'ui/dashboard/DashboardPage';
import AddWidgetPage from 'ui/widgets/add/AddWidgetPage';
import AddFragmentPage from 'ui/fragments/add/AddFragmentPage';
import EditFragmentPageContainer from 'ui/fragments/edit/EditFragmentPageContainer';
import EditWidgetPageContainer from 'ui/widgets/edit/EditWidgetPageContainer';
import PageTreePageContainer from 'ui/pages/list/PageTreePageContainer';
import ListWidgetPageContainer from 'ui/widgets/list/ListWidgetPageContainer';
import PagesAddPageContainer from 'ui/pages/add/PagesAddPageContainer';
import PagesEditPage from 'ui/pages/edit/PagesEditPage';
import { NotFoundPage } from 'frontend-common-components';

import {
  ROUTE_HOME,
  ROUTE_DASHBOARD,
  ROUTE_PAGE_TREE,
  ROUTE_WIDGET_LIST,
  ROUTE_WIDGET_ADD,
  ROUTE_WIDGET_EDIT,
  ROUTE_FRAGMENT_ADD,
  ROUTE_FRAGMENT_EDIT,
  ROUTE_PAGE_ADD,
  ROUTE_PAGE_EDIT,
} from 'app-init/router';

describe('App', () => {
  it('renders without crashing', () => {
    const component = shallow(<App route={ROUTE_HOME} />);
    expect(component.exists()).toEqual(true);
  });

  it('route to dashboard', () => {
    const component = shallow(<App route={ROUTE_DASHBOARD} />);
    expect(component.contains(<DashboardPage />)).toEqual(true);
  });

  it('route to page tree page', () => {
    const component = shallow(<App route={ROUTE_PAGE_TREE} />);
    expect(component.contains(<PageTreePageContainer />)).toEqual(true);
  });

  it('route to widget list page', () => {
    const component = shallow(<App route={ROUTE_WIDGET_LIST} />);
    expect(component.contains(<ListWidgetPageContainer />)).toEqual(true);
  });

  it('route to widget entry page', () => {
    const component = shallow(<App route={ROUTE_WIDGET_ADD} />);
    expect(component.contains(<AddWidgetPage />)).toEqual(true);
  });

  it('route to widget edit page', () => {
    const component = shallow(<App route={ROUTE_WIDGET_EDIT} />);
    expect(component.contains(<EditWidgetPageContainer />)).toEqual(true);
  });

  it('route to add fragment page', () => {
    const component = shallow(<App route={ROUTE_FRAGMENT_ADD} />);
    expect(component.contains(<AddFragmentPage />)).toEqual(true);
  });

  it('route to edit fragment page', () => {
    const component = shallow(<App route={ROUTE_FRAGMENT_EDIT} />);
    expect(component.contains(<EditFragmentPageContainer />)).toEqual(true);
  });

  it('route to add page page', () => {
    const component = shallow(<App route={ROUTE_PAGE_ADD} />);
    expect(component.contains(<PagesAddPageContainer />)).toBe(true);
  });

  it('route to edit page page', () => {
    const component = shallow(<App route={ROUTE_PAGE_EDIT} />);
    expect(component.contains(<PagesEditPage />)).toBe(true);
  });

  it('default route', () => {
    const component = shallow(<App route="test" />);
    expect(component.contains(<NotFoundPage />)).toEqual(true);
  });
});
