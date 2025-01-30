import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from 'patternfly-react';
import { getSelectedRegistry } from 'state/component-repository/hub/selectors';
import { ECR_LOCAL_REGISTRY_NAME } from 'state/component-repository/hub/reducer';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';
import withPermissions from 'ui/auth/withPermissions';
import { ENTER_ECR_PERMISSION, SUPERUSER_PERMISSION } from 'state/permissions/const';
import { ROUTE_ECR_COMPONENT_LIST, ROUTE_ECR_CONFIG_LIST } from 'app-init/router';
import InstallationPlanModal from 'ui/component-repository/components/InstallationPlanModal';
import AddNewRegistryModal from 'ui/component-repository/components/list/AddNewRegistryModal';
import DeleteRegistryModalContainer from 'ui/component-repository/components/list/DeleteRegistryModalContainer';
import EditRegistryModal from 'ui/component-repository/components/list/EditRegistryModal';
import ComponentUninstallManagerModal from 'ui/component-repository/components/item/install-controls/ComponentUninstallManagerModal';
import HubBundleList from 'ui/component-repository/components/list/HubBundleList';
import ComponentListActionsWrapper from './ComponentListActionsWrapper';
import ComponentListContainer from './ComponentListContainer';
import HubRegistrySwitcher from './HubRegistrySwitcher';


export const ComponentListPageBody = () => {
  const activeRegistry = useSelector(getSelectedRegistry);
  const isLocalRegistry = activeRegistry.name === ECR_LOCAL_REGISTRY_NAME;

  return (
    <InternalPage className="ComponentListPage">
      <HeaderBreadcrumb breadcrumbs={[
      { label: 'componentRepository.menuButton.title', to: ROUTE_ECR_COMPONENT_LIST },
    ]}
      />
      <Grid fluid>
        <div className="ComponentListPage__header">
          <PageTitle
            titleId="componentRepository.component.list.title"
            helpId="componentRepository.component.help"
            configLink={ROUTE_ECR_CONFIG_LIST}
            hideConfigLink
          >
            <ComponentListActionsWrapper />
          </PageTitle>
        </div>
        <div className="ComponentListPage__container-body">
          <HubRegistrySwitcher />
          { isLocalRegistry ? <ComponentListContainer /> : <HubBundleList />}
        </div>
      </Grid>
      <InstallationPlanModal />
      <ComponentUninstallManagerModal />
      <AddNewRegistryModal />
      <EditRegistryModal />
      <DeleteRegistryModalContainer />
    </InternalPage>
  );
};

export default withPermissions([SUPERUSER_PERMISSION, ENTER_ECR_PERMISSION])(ComponentListPageBody);
