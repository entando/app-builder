import React from 'react';
import InternalPage from 'ui/internal-page/InternalPage';
import { Breadcrumb, OverlayTrigger, Popover, Grid } from 'patternfly-react';
import { BreadcrumbItem } from 'frontend-common-components';
import { FormattedMessage } from 'react-intl';
import WidgetEditFormContainer from 'ui/widgets/WidgetEditFormContainer';

const WIDGET_EDIT_HELP = 'widget.page.edit.help';

const popover = () => (
  <Popover id="popover-admin-app-switch" title="">
    <p>
      <FormattedMessage id={WIDGET_EDIT_HELP} />
    </p>
  </Popover>
);

const WidgetEditPage = () => (
  <InternalPage className="WidgetEditPage">
    <Grid fluid>
      <Breadcrumb>
        <BreadcrumbItem route="home">
          <FormattedMessage id="menu.uxPattern" />
        </BreadcrumbItem>
        <BreadcrumbItem route="home">
          <FormattedMessage id="menu.widgets" />
        </BreadcrumbItem>
        <BreadcrumbItem active>
          <FormattedMessage id="menu.widgetEdit" />
        </BreadcrumbItem>
      </Breadcrumb>
      <div className="WidgetEditPage__header">
        <h1>
          <span><FormattedMessage id="widget.page.edit.pageTitle" /></span>
          <span className="pull-right">
            <OverlayTrigger
              overlay={popover()}
              placement="left"
              trigger={['click']}
              rootClose
            >
              <i className="WidgetListPage__icon fa pficon-help" />
            </OverlayTrigger>
          </span>
        </h1>
      </div>
      <WidgetEditFormContainer />
    </Grid>
  </InternalPage>
);

export default WidgetEditPage;
