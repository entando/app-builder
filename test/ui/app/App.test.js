
import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import App from 'ui/app/App';
import DashboardPage from 'ui/dashboard/DashboardPage';
import PageTreePageContainer from 'ui/pages/list/PageTreePageContainer';
import ListWidgetPageContainer from 'ui/widgets/list/ListWidgetPageContainer';
import AddWidgetPage from 'ui/widgets/add/AddWidgetPage';
import EditWidgetPageContainer from 'ui/widgets/edit/EditWidgetPageContainer';
import ListFragmentPage from 'ui/fragments/list/ListFragmentPage';
import AddFragmentPage from 'ui/fragments/add/AddFragmentPage';
import EditFragmentPageContainer from 'ui/fragments/edit/EditFragmentPageContainer';
import DetailFragmentPageContainer from 'ui/fragments/detail/DetailFragmentPageContainer';
import PagesAddPageContainer from 'ui/pages/add/PagesAddPageContainer';
import PagesEditPage from 'ui/pages/edit/PagesEditPage';
import PageSettingsPage from 'ui/pages/settings/PageSettings';
import PageConfigPageContainer from 'ui/pages/config/PageConfigPageContainer';
import AddDataModelPage from 'ui/data-models/add/AddDataModelPage';
import ListDataTypePage from 'ui/data-types/list/ListDataTypePage';
import UserListPage from 'ui/users/list/UserListPage';
import { NotFoundPage, gotoRoute } from 'frontend-common-components';

import {
  ROUTE_HOME,
  ROUTE_DASHBOARD,
  ROUTE_PAGE_TREE,
  ROUTE_WIDGET_LIST,
  ROUTE_WIDGET_ADD,
  ROUTE_WIDGET_EDIT,
  ROUTE_FRAGMENT_LIST,
  ROUTE_FRAGMENT_ADD,
  ROUTE_FRAGMENT_EDIT,
  ROUTE_FRAGMENT_DETAIL,
  ROUTE_PAGE_ADD,
  ROUTE_PAGE_EDIT,
  ROUTE_PAGE_SETTINGS,
  ROUTE_PAGE_CONFIG,
  ROUTE_DATA_MODEL_ADD,
  ROUTE_DATA_TYPE_LIST,
  ROUTE_USER_LIST,
} from 'app-init/router';

describe('App', () => {
  it('renders without crashing', () => {
    const component = shallow(<App route={ROUTE_HOME} />);
    expect(component.exists()).toEqual(true);
  });

  it('redirects to login page if the user is not logged in', () => {
    jest.mock('frontend-common-components', () => ({
      gotoRoute: jest.fn(),
    }));
    const component = shallow(<App route={ROUTE_DASHBOARD} />);
    expect(component.contains(<DashboardPage />)).toEqual(false);
    expect(component.contains(<h1>401</h1>)).toEqual(true);
    expect(gotoRoute).toHaveBeenCalledWith(ROUTE_HOME);
  });

  it('route to dashboard', () => {
    const component = shallow(<App route={ROUTE_DASHBOARD} username="admin" />);
    expect(component.contains(<DashboardPage />)).toEqual(true);
  });

  it('route to page tree page', () => {
    const component = shallow(<App route={ROUTE_PAGE_TREE} username="admin" />);
    expect(component.contains(<PageTreePageContainer />)).toEqual(true);
  });

  it('route to widget list page', () => {
    const component = shallow(<App route={ROUTE_WIDGET_LIST} username="admin" />);
    expect(component.contains(<ListWidgetPageContainer />)).toEqual(true);
  });

  it('route to widget entry page', () => {
    const component = shallow(<App route={ROUTE_WIDGET_ADD} username="admin" />);
    expect(component.contains(<AddWidgetPage />)).toEqual(true);
  });

  it('route to widget edit page', () => {
    const component = shallow(<App route={ROUTE_WIDGET_EDIT} username="admin" />);
    expect(component.contains(<EditWidgetPageContainer />)).toEqual(true);
  });

  it('route to add fragment page', () => {
    const component = shallow(<App route={ROUTE_FRAGMENT_ADD} username="admin" />);
    expect(component.contains(<AddFragmentPage />)).toEqual(true);
  });

  it('route to edit fragment page', () => {
    const component = shallow(<App route={ROUTE_FRAGMENT_EDIT} username="admin" />);
    expect(component.contains(<EditFragmentPageContainer />)).toEqual(true);
  });

  it('route to detail fragment page', () => {
    const component = shallow(<App route={ROUTE_FRAGMENT_DETAIL} username="admin" />);
    expect(component.contains(<DetailFragmentPageContainer />)).toEqual(true);
  });

  it('route to add page page', () => {
    const component = shallow(<App route={ROUTE_PAGE_ADD} username="admin" />);
    expect(component.contains(<PagesAddPageContainer />)).toBe(true);
  });

  it('route to edit page page', () => {
    const component = shallow(<App route={ROUTE_PAGE_EDIT} username="admin" />);
    expect(component.contains(<PagesEditPage />)).toBe(true);
  });

  it('route to page settings page', () => {
    const component = shallow(<App route={ROUTE_PAGE_SETTINGS} username="admin" />);
    expect(component.contains(<PageSettingsPage />)).toBe(true);
  });

  it('route to list fragment page', () => {
    const component = shallow(<App route={ROUTE_FRAGMENT_LIST} username="admin" />);
    expect(component.contains(<ListFragmentPage />)).toEqual(true);
  });

  it('route to page config page', () => {
    const component = shallow(<App route={ROUTE_PAGE_CONFIG} username="admin" />);
    expect(component.contains(<PageConfigPageContainer />)).toEqual(true);
  });

  it('route to add data model page', () => {
    const component = shallow(<App route={ROUTE_DATA_MODEL_ADD} username="admin" />);
    expect(component.contains(<AddDataModelPage />)).toEqual(true);
  });

  it('route to data type list page', () => {
    const component = shallow(<App route={ROUTE_DATA_TYPE_LIST} username="admin" />);
    expect(component.contains(<ListDataTypePage />)).toEqual(true);
  });

  it('route to user list page', () => {
    const component = shallow(<App route={ROUTE_USER_LIST} username="admin" />);
    expect(component.contains(<UserListPage />)).toEqual(true);
  });

  it('default route', () => {
    const component = shallow(<App route="test" username="admin" />);
    expect(component.contains(<NotFoundPage />)).toEqual(true);
  });

  it('default route if the user is not logged in and the route is falsy', () => {
    const component = shallow(<App route="" />);
    expect(component.contains(<NotFoundPage />)).toEqual(true);
  });
});
