import React from 'react';
import InternalPage from 'ui/internal-page/InternalPage';
import { Breadcrumb, OverlayTrigger, Popover, Grid } from 'patternfly-react';
import { BreadcrumbItem } from 'frontend-common-components';
import { FormattedMessage } from 'react-intl';
import WidgetForm from 'ui/widgets/WidgetForm';
import getWidget from 'api/widget';

const WIDGET_EDIT_HELP = 'widget.edit.help';

const WIDGET_CODE_MOCK = 'widget_code';

const popover = () => (
  <Popover id="popover-admin-app-switch" title="">
    <p>
      <FormattedMessage id={WIDGET_EDIT_HELP} />
    </p>
  </Popover>
);

const setInitialValues = () => {
  let initialValues;
  getWidget(WIDGET_CODE_MOCK).then((response) => {
    initialValues = response.payload;
    console.log(initialValues);
  });

  return initialValues;
};

const WidgetEditPage = () => (
  <InternalPage className="WidgetEditPage">
    <Grid fluid>
      <Breadcrumb>
        <BreadcrumbItem route="home">
        Ux Pattern
        </BreadcrumbItem>
        <BreadcrumbItem route="home">
        Widgets
        </BreadcrumbItem>
        <BreadcrumbItem route="home" active>
        Modifica Widget
        </BreadcrumbItem>
        <BreadcrumbItem route="home" active>
        Widget Name
        </BreadcrumbItem>
      </Breadcrumb>
      <div className="WidgetEditPage__header">
        <h1>
          <span><FormattedMessage id="widget.edit.title" /></span>
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
      <WidgetForm onSubmit={() => {}} initialValues={setInitialValues()} />
    </Grid>
  </InternalPage>
);

export default WidgetEditPage;
