import React from 'react';
import PageTitle from 'ui/internal-page/PageTitle';
import InternalPage from 'ui/internal-page/InternalPage';
import WidgetFormContainer from 'ui/widgets/common/WidgetFormContainer';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';
import { ROUTE_WIDGET_LIST } from 'app-init/router';
import withPermissions from 'ui/auth/withPermissions';
import { SUPERUSER_PERMISSION } from 'state/permissions/const';

import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';

export const AddWidgetPageBody = () => (
  <InternalPage className="AddWidgetPage WidgetPage">
    <HeaderBreadcrumb breadcrumbs={[
      { label: 'menu.uxComponents' },
      { label: 'menu.uxComponents.widget', to: ROUTE_WIDGET_LIST },
      { label: 'widgets.addWidget', active: true },
    ]}
    />
    <div className="WidgetPage__header">
      <PageTitle titleId="widgets.addWidget" helpId="widget.help">
        <div id="widget-button-holder" />
      </PageTitle>
    </div>
    <div className="WidgetPage__body">
      <ErrorsAlertContainer />
      <WidgetFormContainer />
    </div>
  </InternalPage>
);

export default withPermissions(SUPERUSER_PERMISSION)(AddWidgetPageBody);
