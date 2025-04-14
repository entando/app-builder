
import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { waitFor } from '@testing-library/react';

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
import UserListPage from 'ui/users/list/UserListPage';
import UserAuthorityPageContainer from 'ui/users/authority/UserAuthorityPageContainer';
import UserRestrictionsPage from 'ui/users/restrictions/UserRestrictionsPage';
import MyProfilePageContainer from 'ui/users/my-profile/MyProfilePageContainer';
import AddUserPage from 'ui/users/add/AddUserPage';
import EditUserPage from 'ui/users/edit/EditUserPage';
import DetailUserPage from 'ui/users/detail/DetailUserPage';
import ListGroupPage from 'ui/groups/list/ListGroupPage';
import AddGroupPage from 'ui/groups/add/AddGroupPage';
import EditGroupPage from 'ui/groups/edit/EditGroupPage';
import LabelsAndLanguagesPageContainer from 'ui/labels/list/LabelsAndLanguagesPageContainer';
import PageTemplateAddPage from 'ui/page-templates/add/PageTemplateAddPage';
import PageTemplateEditPage from 'ui/page-templates/edit/PageTemplateEditPage';
import PageTemplateDetailPageContainer from 'ui/page-templates/detail/PageTemplateDetailPageContainer';
import FileBrowserPageContainer from 'ui/file-browser/list/ListFilesPage';
import CreateFolderFormContainer from 'ui/file-browser/add/CreateFolderPage';
import PluginsPageContainer from 'ui/plugins/PluginsPageContainer';
import PluginConfigPageContainer from 'ui/plugins/PluginConfigPageContainer';
import PagesClonePage from 'ui/pages/clone/PagesClonePage';
import PagesDetailPageContainer from 'ui/pages/detail/PagesDetailPageContainer';
import PageTemplateListPage from 'ui/page-templates/list/PageTemplateListPage';
import PageTemplateClonePage from 'ui/page-templates/clone/PageTemplateClonePage';
// component repository
import ComponentListPage from 'ui/component-repository/components/list/ComponentListPage';
import ComponentListPageDisabled from 'ui/component-repository/components/list/ComponentListPageDisabled';
import SettingsListPage from 'ui/component-repository/settings/list/SettingsListPage';
import SettingsEditPage from 'ui/component-repository/settings/edit/SettingsEditPage';
import SettingsAddPage from 'ui/component-repository/settings/add/SettingsAddPage';
import PageNotFoundContainer from 'ui/app/PageNotFoundContainer';
import ListDatabasePage from 'ui/database/list/ListDatabasePage';
import AddDatabasePageContainer from 'ui/database/add/AddDatabasePageContainer';
import ReportDatabasePageContainer from 'ui/database/report/ReportDatabasePageContainer';
import AddProfileTypeAttributePage from 'ui/profile-types/attributes/AddProfileTypeAttributePage';
import EditProfileTypeAttributePage from 'ui/profile-types/attributes/EditProfileTypeAttributePage';
import ReloadConfigPage from 'ui/reload-configuration/ReloadConfigPage';
import ReloadConfirmPage from 'ui/reload-configuration/ReloadConfirmPage';
import MonolistProfilePageContainer from 'ui/profile-types/attributes/monolist/MonolistProfilePageContainer';
import DetailWidgetPageContainer from 'ui/widgets/detail/DetailWidgetPageContainer';
import CloneWidgetPage from 'ui/widgets/clone/CloneWidgetPage';
import CloneFragmentPageContainer from 'ui/fragments/clone/CloneFragmentPageContainer';
import NewUserWidgetPage from 'ui/widgets/newUserWidget/NewUserWidgetPage';

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
  ROUTE_PAGE_TEMPLATE_ADD,
  ROUTE_PAGE_TEMPLATE_EDIT,
  ROUTE_PAGE_TEMPLATE_DETAIL,
  ROUTE_FILE_BROWSER,
  ROUTE_FILE_BROWSER_CREATE_FOLDER,
  ROUTE_PLUGINS,
  ROUTE_PLUGIN_CONFIG_PAGE,
  ROUTE_PAGE_CLONE,
  ROUTE_PAGE_DETAIL,
  ROUTE_PAGE_TEMPLATE_LIST,
  ROUTE_PAGE_TEMPLATE_CLONE,
  // component repository
  ROUTE_ECR_COMPONENT_LIST,
  ROUTE_ECR_CONFIG_LIST,
  ROUTE_ECR_CONFIG_EDIT,
  ROUTE_ECR_CONFIG_ADD,
  ROUTE_DATABASE_LIST,
  ROUTE_DATABASE_ADD,
  ROUTE_DATABASE_REPORT,
  ROUTE_PROFILE_TYPE_ATTRIBUTE_ADD,
  ROUTE_PROFILE_TYPE_ATTRIBUTE_EDIT,
  ROUTE_RELOAD_CONFIG,
  ROUTE_RELOAD_CONFIRM,
  ROUTE_ATTRIBUTE_MONOLIST_PROFILE_ADD,
  ROUTE_WIDGET_DETAIL,
  ROUTE_CLONE_WIDGET,
  ROUTE_FRAGMENT_CLONE,
  ROUTE_WIDGET_NEW_USERWIDGET,
} from 'app-init/router';
import { mountWithIntl } from 'test/legacyTestUtils';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

jest.mock('auth/default/withDefaultAuth', () => WrappedComponent => props => (
  <WrappedComponent {...props} isReady auth={{ enabled: false, authenticated: false }} />
));

const mountWithRoute = route => mountWithIntl((
  <MemoryRouter initialEntries={[route]}>
    <App currentRoute={ROUTE_DASHBOARD} username="admin" loggedUserPrefloading />
  </MemoryRouter>
));

describe('App', () => {
  beforeAll(() => {
    useSelector.mockImplementation(callback => callback({
      mfe: {
        mfeList: [],
      },
    }));
  });

  it('renders without crashing', () => {
    const component = shallow(<App currentRoute={ROUTE_HOME} loggedUserPrefloading />);
    expect(component.exists()).toBe(true);
  });

  it('always contains the ToastsContainer', () => {
    let component = shallow(<App currentRoute={ROUTE_HOME} loggedUserPrefloading />).dive();
    expect(component.find(ToastsContainer).exists()).toBe(true);
    component = shallow(<App currentRoute={ROUTE_DASHBOARD} username="admin" loggedUserPrefloading />).dive();
    expect(component.find(ToastsContainer).exists()).toBe(true);
  });

  it('redirects to login page if the user is not logged in', () => {
    const component = shallow(<App currentRoute={ROUTE_DASHBOARD} loggedUserPrefloading />).dive();
    expect(component.contains(<DashboardPage />)).toBe(false);
  });

  it('falls back to default route if wrong route', async () => {
    await waitFor(async () => {
      const component = mountWithRoute('wrongRoute');
      expect(component.find(PageNotFoundContainer).exists()).toBe(true);
    });
  });

  it('route to dashboard', () => {
    const component = mountWithRoute(ROUTE_DASHBOARD);
    expect(component.find(DashboardPage).exists()).toBe(true);
  });

  it('route to page tree page', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_PAGE_TREE);
      expect(component.find(PageTreePageContainer).exists()).toBe(true);
    });
  });

  it('route to widget list page', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_WIDGET_LIST);
      expect(component.find(ListWidgetPageContainer).exists()).toBe(true);
    });
  });

  it('route to widget entry page', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_WIDGET_ADD);
      expect(component.find(AddWidgetPage).exists()).toBe(true);
    });
  });

  it('route to widget edit page', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_WIDGET_EDIT);
      expect(component.find(EditWidgetPageContainer).exists()).toBe(true);
    });
  });

  it('route to widget edit page', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_WIDGET_CONFIG);
      expect(component.find(WidgetConfigPageContainer).exists()).toBe(true);
    });
  });

  it('route to add fragment page', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_FRAGMENT_ADD);
      expect(component.find(AddFragmentPage).exists()).toBe(true);
    });
  });

  it('route to edit fragment page', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_FRAGMENT_EDIT);
      expect(component.find(EditFragmentPageContainer).exists()).toBe(true);
    });
  });

  it('route to detail fragment page', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_FRAGMENT_DETAIL);
      expect(component.find(DetailFragmentPageContainer).exists()).toBe(true);
    });
  });

  it('route to add page page', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_PAGE_ADD);
      expect(component.find(PagesAddPageContainer).exists()).toBe(true);
    });
  });

  it('route to edit page page', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_PAGE_EDIT);
      expect(component.find(PagesEditPage).exists()).toBe(true);
    });
  });

  it('route to page clone', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_PAGE_CLONE);
      expect(component.find(PagesClonePage).exists()).toBe(true);
    });
  });
  it('route to page detail', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_PAGE_DETAIL);
      expect(component.find(PagesDetailPageContainer).exists()).toBe(true);
    });
  });

  it('route to page settings page', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_PAGE_SETTINGS);
      expect(component.find(PageSettingsPage).exists()).toBe(true);
    });
  });

  it('route to list fragment page', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_FRAGMENT_LIST);
      expect(component.find(ListFragmentPage).exists()).toBe(true);
    });
  });

  it('route to page config page', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_PAGE_CONFIG);
      expect(component.find(PageConfigPageContainer).exists()).toBe(true);
    });
  });

  it('route to page template list', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_PAGE_TEMPLATE_LIST);
      expect(component.find(PageTemplateListPage).exists()).toBe(true);
    });
  });

  it('route to user list page', async () => {
    await waitFor(async () => {
      const component = await mountWithRoute(ROUTE_USER_LIST);
      expect(component.find(UserListPage).exists()).toBe(true);
    });
  });

  it('route to user authority page', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_USER_AUTHORITY);
      expect(component.find(UserAuthorityPageContainer).exists()).toBe(true);
    });
  });

  it('route to user add page', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_USER_ADD);
      expect(component.find(AddUserPage).exists()).toBe(true);
    });
  });

  it('route to user edit page', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_USER_EDIT);
      expect(component.find(EditUserPage).exists()).toBe(true);
    });
  });

  it('route to user detail page', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_USER_DETAIL);
      expect(component.find(DetailUserPage).exists()).toBe(true);
    });
  });

  it('route to user restrictions page', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_USER_RESTRICTIONS);
      expect(component.find(UserRestrictionsPage).exists()).toBe(true);
    });
  });

  it('route to user restrictions page', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_USER_MY_PROFILE);
      expect(component.find(MyProfilePageContainer).exists()).toBe(true);
    });
  });

  it('route to group list page', () => {
    const component = mountWithRoute(ROUTE_GROUP_LIST);
    expect(component.find(ListGroupPage).exists()).toBe(true);
  });

  it('route to group add page', () => {
    const component = mountWithRoute(ROUTE_GROUP_ADD);
    expect(component.find(AddGroupPage).exists()).toBe(true);
  });

  it('route to group edit page', () => {
    const component = mountWithRoute(ROUTE_GROUP_EDIT);
    expect(component.find(EditGroupPage).exists()).toBe(true);
  });

  it('route to labels and languages page', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_LABELS_AND_LANGUAGES);
      expect(component.find(LabelsAndLanguagesPageContainer).exists()).toBe(true);
    });
  });

  it('route to add page template page', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_PAGE_TEMPLATE_ADD);
      expect(component.find(PageTemplateAddPage).exists()).toBe(true);
    });
  });

  it('route to edit page template page', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_PAGE_TEMPLATE_EDIT);
      expect(component.find(PageTemplateEditPage).exists()).toBe(true);
    });
  });

  it('route to page template clone page', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_PAGE_TEMPLATE_CLONE);
      expect(component.find(PageTemplateClonePage).exists()).toBe(true);
    });
  });

  it('route to page template detail page', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_PAGE_TEMPLATE_DETAIL);
      expect(component.find(PageTemplateDetailPageContainer).exists()).toBe(true);
    });
  });

  it('route to page file browser page', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_FILE_BROWSER);
      expect(component.find(FileBrowserPageContainer).exists()).toBe(true);
    });
  });

  it('route to page file browser page create folder', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_FILE_BROWSER_CREATE_FOLDER);
      expect(component.find(CreateFolderFormContainer).exists()).toBe(true);
    });
  });

  it('route to database list', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_DATABASE_LIST);
      expect(component.find(ListDatabasePage).exists()).toBe(true);
    });
  });

  it('route to database add page', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_DATABASE_ADD);
      expect(component.find(AddDatabasePageContainer).exists()).toBe(true);
    });
  });

  it('route to database report', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_DATABASE_REPORT);
      expect(component.find(ReportDatabasePageContainer).exists()).toBe(true);
    });
  });

  it('route to database list', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_DATABASE_LIST);
      expect(component.find(ListDatabasePage).exists()).toBe(true);
    });
  });

  it('route to database add page', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_DATABASE_ADD);
      expect(component.find(AddDatabasePageContainer).exists()).toBe(true);
    });
  });

  it('route to database report', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_DATABASE_REPORT);
      expect(component.find(ReportDatabasePageContainer).exists()).toBe(true);
    });
  });

  it('route to plugins page', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_PLUGINS);
      expect(component.find(PluginsPageContainer).exists()).toBe(true);
    });
  });

  it('route to plugins page', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_PLUGINS);
      expect(component.find(PluginsPageContainer).exists()).toBe(true);
    });
  });

  it('route to plugin config page', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_PLUGIN_CONFIG_PAGE);
      expect(component.find(PluginConfigPageContainer).exists()).toBe(true);
    });
  });

  it('route to add profile type attribute page', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_PROFILE_TYPE_ATTRIBUTE_ADD);
      expect(component.find(AddProfileTypeAttributePage).exists()).toBe(true);
    });
  });

  it('route to reload config page', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_RELOAD_CONFIG);
      expect(component.find(ReloadConfigPage).exists()).toBe(true);
    });
  });

  it('route to reload config page', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_RELOAD_CONFIRM);
      expect(component.find(ReloadConfirmPage).exists()).toBe(true);
    });
  });

  it('route to profile add monolist attribute page', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_ATTRIBUTE_MONOLIST_PROFILE_ADD);
      expect(component.find(MonolistProfilePageContainer).exists()).toBe(true);
    });
  });

  it('route to edit profile type attribute page', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_PROFILE_TYPE_ATTRIBUTE_EDIT);
      expect(component.find(EditProfileTypeAttributePage).exists()).toBe(true);
    });
  });

  it('route to new user widget page', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_WIDGET_NEW_USERWIDGET);
      expect(component.find(NewUserWidgetPage).exists()).toBe(true);
    });
  });

  it('route to widget detail page', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_WIDGET_DETAIL);
      expect(component.find(DetailWidgetPageContainer).exists()).toBe(true);
    });
  });

  it('route to clone widget page', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_CLONE_WIDGET);
      expect(component.find(CloneWidgetPage).exists()).toBe(true);
    });
  });

  it('route to fragment page', async () => {
    await waitFor(async () => {
      const component = mountWithRoute(ROUTE_FRAGMENT_CLONE);
      expect(component.find(CloneFragmentPageContainer).exists()).toBe(true);
    });
  });

  describe('component repository', () => {
    describe('component repository disabled', () => {
      it('routes to the disable page on ROUTE_ECR_COMPONENT_LIST', async () => {
        await waitFor(async () => {
          const component = mountWithRoute(ROUTE_ECR_COMPONENT_LIST);
          expect(component.find(ComponentListPageDisabled).exists()).toBe(true);
        });
      });

      it('routes to the disable page on ROUTE_ECR_CONFIG_LIST', async () => {
        await waitFor(async () => {
          const component = mountWithRoute(ROUTE_ECR_CONFIG_LIST);
          expect(component.find(ComponentListPageDisabled).exists()).toBe(true);
        });
      });

      it('routes to the disable page on ROUTE_ECR_CONFIG_EDIT', async () => {
        await waitFor(async () => {
          const component = mountWithRoute(ROUTE_ECR_CONFIG_EDIT);
          expect(component.find(ComponentListPageDisabled).exists()).toBe(true);
        });
      });

      it('routes to the disable page on ROUTE_ECR_CONFIG_ADD', async () => {
        await waitFor(async () => {
          const component = mountWithRoute(ROUTE_ECR_CONFIG_ADD);
          expect(component.find(ComponentListPageDisabled).exists()).toBe(true);
        });
      });
    });

    describe('component repository enabled', () => {
      beforeAll(() => {
        process.env.COMPONENT_REPOSITORY_UI_ENABLED = true;
      });

      it('routes to the component list page page on ROUTE_ECR_COMPONENT_LIST', async () => {
        await waitFor(async () => {
          const component = mountWithRoute(ROUTE_ECR_COMPONENT_LIST);
          expect(component.find(ComponentListPage).exists()).toBe(true);
        });
      });

      it('routes to the component list page page on ROUTE_ECR_CONFIG_LIST', async () => {
        await waitFor(async () => {
          const component = mountWithRoute(ROUTE_ECR_CONFIG_LIST);
          expect(component.find(SettingsListPage).exists()).toBe(true);
        });
      });

      it('routes to the component list page page on ROUTE_ECR_CONFIG_EDIT', async () => {
        await waitFor(async () => {
          const component = mountWithRoute(ROUTE_ECR_CONFIG_EDIT);
          expect(component.find(SettingsEditPage).exists()).toBe(true);
        });
      });

      it('routes to the component list page page on ROUTE_ECR_CONFIG_ADD', async () => {
        await waitFor(() => {
          const component = mountWithRoute(ROUTE_ECR_CONFIG_ADD);
          expect(component.find(SettingsAddPage).exists()).toBe(true);
        });
      });
    });
  });
});
