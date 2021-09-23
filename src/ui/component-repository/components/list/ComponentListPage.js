import React from 'react';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import withPermissions from 'ui/auth/withPermissions';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import { FormattedMessage } from 'react-intl';
import { ENTER_ECR_PERMISSION, SUPERUSER_PERMISSION } from 'state/permissions/const';
import { ROUTE_ECR_COMPONENT_LIST, ROUTE_ECR_CONFIG_LIST } from 'app-init/router';
import InstallationPlanModal from 'ui/component-repository/components/InstallationPlanModal';
import ComponentListWrapper from 'ui/component-repository/components/list/ComponentListWrapper';

export const ComponentListPageBody = () => (
  <InternalPage className="ComponentListPage">
    <Grid fluid>
      <div className="ComponentListPage__header">
        <Row>
          <Col md={12}>
            <Breadcrumb>
              <BreadcrumbItem to={ROUTE_ECR_COMPONENT_LIST}>
                <FormattedMessage id="componentRepository.menuButton.title" />
              </BreadcrumbItem>
            </Breadcrumb>
            <PageTitle
              titleId="componentRepository.component.list.title"
              helpId="componentRepository.component.help"
              configLink={ROUTE_ECR_CONFIG_LIST}
              hideConfigLink
            />
          </Col>
        </Row>
      </div>
      <ComponentListWrapper />
    </Grid>
    <InstallationPlanModal />
  </InternalPage>
);

export default withPermissions([SUPERUSER_PERMISSION, ENTER_ECR_PERMISSION])(ComponentListPageBody);
