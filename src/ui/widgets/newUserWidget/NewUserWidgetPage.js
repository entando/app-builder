import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Row, Col, Breadcrumb } from 'patternfly-react';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import PageTitle from 'ui/internal-page/PageTitle';
import InternalPage from 'ui/internal-page/InternalPage';
import NewUserWidgetFormContainer from 'ui/widgets/newUserWidget/NewUserWidgetFormContainer';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';
import { ROUTE_WIDGET_LIST } from 'app-init/router';
import withPermissions from 'ui/auth/withPermissions';
import { SUPERUSER_PERMISSION } from 'state/permissions/const';

export const NewUserWidgetPageBody = () => (
  <InternalPage className="EditWidgetPage WidgetPage">
    <div className="WidgetPage__header">
      <div className="WidgetPage__top">
        <div>
          <Breadcrumb>
            <BreadcrumbItem>
              <FormattedMessage id="menu.uxComponents" />
            </BreadcrumbItem>
            <BreadcrumbItem to={ROUTE_WIDGET_LIST}>
              <FormattedMessage id="menu.uxComponents.widget" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="app.add" />
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div>
          <div id="widget-button-holder" />
        </div>
      </div>
      <Row>
        <Col xs={12}>
          <PageTitle titleId="app.add" helpId="widget.help" />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <ErrorsAlertContainer />
          <NewUserWidgetFormContainer />
        </Col>
      </Row>
    </div>
  </InternalPage>
);

export default withPermissions(SUPERUSER_PERMISSION)(NewUserWidgetPageBody);
