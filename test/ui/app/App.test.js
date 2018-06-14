
import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { gotoRoute } from '@entando/router';
import { NotFoundPage } from '@entando/pages';

import App from 'ui/app/App';
import ToastsContainer from 'ui/app/ToastsContainer';
import DashboardPage from 'ui/dashboard/DashboardPage';
import PageTreePageContainer from 'ui/pages/list/PageTreePageContainer';
import ListWidgetPageContainer from 'ui/widgets/list/ListWidgetPageContainer';
import AddWidgetPage from 'ui/widgets/add/AddWidgetPage';
import EditWidgetPageContainer from 'ui/widgets/edit/EditWidgetPageContainer';
import WidgetConfigPageContainer from 'ui/widgets/config/WidgetConfigPageContainer';
import ListFragmentPage from 'ui/fragments/list/ListFragmentPage';
import AddFragmentPage from 'ui/fragments/add/AddFragmentPage';
import EditFragmentPageContainer from 'ui/fragments/edit/EditFragmentPageContainer';
import DetailFragmentPageContainer from 'ui/fragments/detail/DetailFragmentPageContainer';
import PagesAddPageContainer from 'ui/pages/add/PagesAddPageContainer';
import PagesEditPage from 'ui/pages/edit/PagesEditPage';
import PageSettingsPage from 'ui/pages/settings/PageSettings';
import PageConfigPageContainer from 'ui/pages/config/PageConfigPageContainer';
import AddDataModelPage from 'ui/data-models/add/AddDataModelPage';
import EditDataModelPage from 'ui/data-models/edit/EditDataModelPage';
import ListDataTypePage from 'ui/data-types/list/ListDataTypePage';
import UserListPage from 'ui/users/list/UserListPage';
import UserAuthorityPageContainer from 'ui/users/authority/UserAuthorityPageContainer';
import UserRestrictionsPage from 'ui/users/restrictions/UserRestrictionsPage';
import MyProfilePage from 'ui/users/my-profile/MyProfilePage';
import AddUserPage from 'ui/users/add/AddUserPage';
import EditUserPage from 'ui/users/edit/EditUserPage';
import DetailUserPage from 'ui/users/detail/DetailUserPage';
import ListGroupPage from 'ui/groups/list/ListGroupPage';
import AddGroupPage from 'ui/groups/add/AddGroupPage';
import EditGroupPage from 'ui/groups/edit/EditGroupPage';
import DataModelListPage from 'ui/data-models/list/DataModelListPage';
import LabelsAndLanguagesPageContainer from 'ui/labels/list/LabelsAndLanguagesPageContainer';
import PageModelAddPage from 'ui/page-models/add/PageModelAddPage';
import PageModelEditPage from 'ui/page-models/edit/PageModelEditPage';
import PageModelDetailPageContainer from 'ui/page-models/detail/PageModelDetailPageContainer';
import FileBrowserPageContainer from 'ui/file-browser/list/ListFilesPage';
import CreateFolderFormContainer from 'ui/file-browser/add/CreateFolderPage';

import {
  ROUTE_HOME,
  ROUTE_DASHBOARD,
  ROUTE_PAGE_TREE,
  ROUTE_WIDGET_LIST,
  ROUTE_WIDGET_ADD,
  ROUTE_WIDGET_EDIT,
  ROUTE_WIDGET_CONFIG,
  ROUTE_FRAGMENT_LIST,
  ROUTE_FRAGMENT_ADD,
  ROUTE_FRAGMENT_EDIT,
  ROUTE_FRAGMENT_DETAIL,
  ROUTE_PAGE_ADD,
  ROUTE_PAGE_EDIT,
  ROUTE_PAGE_SETTINGS,
  ROUTE_PAGE_CONFIG,
  ROUTE_DATA_MODEL_ADD,
  ROUTE_DATA_MODEL_EDIT,
  ROUTE_DATA_MODEL_LIST,
  ROUTE_DATA_TYPE_LIST,
  ROUTE_USER_LIST,
  ROUTE_USER_AUTHORITY,
  ROUTE_USER_ADD,
  ROUTE_USER_EDIT,
  ROUTE_USER_DETAIL,
  ROUTE_USER_RESTRICTIONS,
  ROUTE_USER_MY_PROFILE,
  ROUTE_GROUP_LIST,
  ROUTE_GROUP_ADD,
  ROUTE_GROUP_EDIT,
  ROUTE_LABELS_AND_LANGUAGES,
  ROUTE_PAGE_MODEL_ADD,
  ROUTE_PAGE_MODEL_EDIT,
  ROUTE_PAGE_MODEL_DETAIL,
  ROUTE_FILE_BROWSER,
  ROUTE_FILE_BROWSER_CREATE_FOLDER,
} from 'app-init/router';

describe('App', () => {
  it('renders without crashing', () => {
    const component = shallow(<App route={ROUTE_HOME} />);
    expect(component.exists()).toBe(true);
  });

  it('always contains the ToastsContainer', () => {
    let component = shallow(<App route={ROUTE_HOME} />);
    expect(component.find(ToastsContainer).exists()).toBe(true);
    component = shallow(<App route={ROUTE_DASHBOARD} username="admin" />);
    expect(component.find(ToastsContainer).exists()).toBe(true);
  });

  it('redirects to login page if the user is not logged in', () => {
    jest.mock('frontend-common-components', () => ({
      gotoRoute: jest.fn(),
    }));
    const component = shallow(<App route={ROUTE_DASHBOARD} />);
    expect(component.contains(<DashboardPage />)).toBe(false);
    expect(component.contains(<h1>401</h1>)).toBe(true);
    expect(gotoRoute).toHaveBeenCalledWith(ROUTE_HOME);
  });

  it('route to dashboard', () => {
    const component = shallow(<App route={ROUTE_DASHBOARD} username="admin" />);
    expect(component.contains(<DashboardPage />)).toBe(true);
  });

  it('route to page tree page', () => {
    const component = shallow(<App route={ROUTE_PAGE_TREE} username="admin" />);
    expect(component.contains(<PageTreePageContainer />)).toBe(true);
  });

  it('route to widget list page', () => {
    const component = shallow(<App route={ROUTE_WIDGET_LIST} username="admin" />);
    expect(component.contains(<ListWidgetPageContainer />)).toBe(true);
  });

  it('route to widget entry page', () => {
    const component = shallow(<App route={ROUTE_WIDGET_ADD} username="admin" />);
    expect(component.contains(<AddWidgetPage />)).toBe(true);
  });

  it('route to widget edit page', () => {
    const component = shallow(<App route={ROUTE_WIDGET_EDIT} username="admin" />);
    expect(component.contains(<EditWidgetPageContainer />)).toBe(true);
  });

  it('route to widget edit page', () => {
    const component = shallow(<App route={ROUTE_WIDGET_CONFIG} username="admin" />);
    expect(component.contains(<WidgetConfigPageContainer />)).toBe(true);
  });

  it('route to add fragment page', () => {
    const component = shallow(<App route={ROUTE_FRAGMENT_ADD} username="admin" />);
    expect(component.contains(<AddFragmentPage />)).toBe(true);
  });

  it('route to edit fragment page', () => {
    const component = shallow(<App route={ROUTE_FRAGMENT_EDIT} username="admin" />);
    expect(component.contains(<EditFragmentPageContainer />)).toBe(true);
  });

  it('route to detail fragment page', () => {
    const component = shallow(<App route={ROUTE_FRAGMENT_DETAIL} username="admin" />);
    expect(component.contains(<DetailFragmentPageContainer />)).toBe(true);
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
    expect(component.contains(<ListFragmentPage />)).toBe(true);
  });

  it('route to page config page', () => {
    const component = shallow(<App route={ROUTE_PAGE_CONFIG} username="admin" />);
    expect(component.contains(<PageConfigPageContainer />)).toBe(true);
  });

  it('route to add data model page', () => {
    const component = shallow(<App route={ROUTE_DATA_MODEL_ADD} username="admin" />);
    expect(component.contains(<AddDataModelPage />)).toBe(true);
  });

  it('route to edit data model page', () => {
    const component = shallow(<App route={ROUTE_DATA_MODEL_EDIT} username="admin" />);
    expect(component.contains(<EditDataModelPage />)).toBe(true);
  });

  it('route to data model list page', () => {
    const component = shallow(<App route={ROUTE_DATA_MODEL_LIST} username="admin" />);
    expect(component.contains(<DataModelListPage />)).toBe(true);
  });

  it('route to data type list page', () => {
    const component = shallow(<App route={ROUTE_DATA_TYPE_LIST} username="admin" />);
    expect(component.contains(<ListDataTypePage />)).toBe(true);
  });

  it('route to user list page', () => {
    const component = shallow(<App route={ROUTE_USER_LIST} username="admin" />);
    expect(component.contains(<UserListPage />)).toBe(true);
  });

  it('route to user authority page', () => {
    const component = shallow(<App route={ROUTE_USER_AUTHORITY} username="admin" />);
    expect(component.contains(<UserAuthorityPageContainer />)).toBe(true);
  });

  it('route to user add page', () => {
    const component = shallow(<App route={ROUTE_USER_ADD} username="admin" />);
    expect(component.contains(<AddUserPage />)).toBe(true);
  });

  it('route to user edit page', () => {
    const component = shallow(<App route={ROUTE_USER_EDIT} username="admin" />);
    expect(component.contains(<EditUserPage />)).toBe(true);
  });

  it('route to user detail page', () => {
    const component = shallow(<App route={ROUTE_USER_DETAIL} username="admin" />);
    expect(component.contains(<DetailUserPage />)).toBe(true);
  });

  it('route to user restrictions page', () => {
    const component = shallow(<App route={ROUTE_USER_RESTRICTIONS} username="admin" />);
    expect(component.contains(<UserRestrictionsPage />)).toBe(true);
  });

  it('route to user restrictions page', () => {
    const component = shallow(<App route={ROUTE_USER_MY_PROFILE} username="admin" />);
    expect(component.contains(<MyProfilePage />)).toBe(true);
  });

  it('route to group list page', () => {
    const component = shallow(<App route={ROUTE_GROUP_LIST} username="admin" />);
    expect(component.contains(<ListGroupPage />)).toBe(true);
  });

  it('route to group add page', () => {
    const component = shallow(<App route={ROUTE_GROUP_ADD} username="admin" />);
    expect(component.contains(<AddGroupPage />)).toBe(true);
  });

  it('route to group edit page', () => {
    const component = shallow(<App route={ROUTE_GROUP_EDIT} username="admin" />);
    expect(component.contains(<EditGroupPage />)).toBe(true);
  });

  it('route to labels and languages page', () => {
    const component = shallow(<App route={ROUTE_LABELS_AND_LANGUAGES} username="admin" />);
    expect(component.contains(<LabelsAndLanguagesPageContainer />)).toBe(true);
  });

  it('route to add page model page', () => {
    const component = shallow(<App route={ROUTE_PAGE_MODEL_ADD} username="admin" />);
    expect(component.contains(<PageModelAddPage />)).toBe(true);
  });

  it('route to edit page model page', () => {
    const component = shallow(<App route={ROUTE_PAGE_MODEL_EDIT} username="admin" />);
    expect(component.contains(<PageModelEditPage />)).toBe(true);
  });

  it('route to page model detail page', () => {
    const component = shallow(<App route={ROUTE_PAGE_MODEL_DETAIL} username="admin" />);
    expect(component.contains(<PageModelDetailPageContainer />)).toBe(true);
  });

  it('route to page file browser page', () => {
    const component = shallow(<App route={ROUTE_FILE_BROWSER} username="admin" />);
    expect(component.contains(<FileBrowserPageContainer />)).toBe(true);
  });

  it('route to page file browser page create folder', () => {
    const component = shallow(<App route={ROUTE_FILE_BROWSER_CREATE_FOLDER} username="admin" />);
    expect(component.contains(<CreateFolderFormContainer />)).toBe(true);
  });

  it('default route', () => {
    const component = shallow(<App route="test" username="admin" />);
    expect(component.contains(<NotFoundPage />)).toBe(true);
  });

  it('default route if the user is not logged in and the route is falsy', () => {
    const component = shallow(<App route="" />);
    expect(component.contains(<NotFoundPage />)).toBe(true);
  });
});
