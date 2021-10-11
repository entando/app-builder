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
import { SUPERUSER_PERMISSION } from 'state/permissions/const';

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
              <FormattedMessage id="widgets.addWidget" />
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div>
          <div id="widget-button-holder" />
        </div>
      </div>
      <div>
        <PageTitle titleId="widgets.addWidget" helpId="widget.help" />
      </div>
    </div>

    <div className="WidgetPage__body">
      <ErrorsAlertContainer />
      <WidgetFormContainer />
    </div>
  </InternalPage>
);

export default withPermissions(SUPERUSER_PERMISSION)(AddWidgetPageBody);
