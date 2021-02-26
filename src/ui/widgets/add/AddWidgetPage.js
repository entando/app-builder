import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Breadcrumb } from 'patternfly-react';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import PageTitle from 'ui/internal-page/PageTitle';
import InternalPage from 'ui/internal-page/InternalPage';
import WidgetFormContainer from 'ui/widgets/common/WidgetFormContainer';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';
import { ROUTE_WIDGET_LIST } from 'app-init/router';
import withPermissions from 'ui/auth/withPermissions';
import { ROLE_SUPERUSER } from 'state/permissions/const';

export const AddWidgetPageBody = () => (
  <InternalPage className="AddWidgetPage WidgetPage">
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
      <div>
        <PageTitle titleId="app.add" helpId="widget.help" />
      </div>
    </div>

    <div className="WidgetPage__body">
      <ErrorsAlertContainer />
      <WidgetFormContainer />
    </div>
  </InternalPage>
);

export default withPermissions(ROLE_SUPERUSER)(AddWidgetPageBody);
