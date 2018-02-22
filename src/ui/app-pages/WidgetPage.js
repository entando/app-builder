import React from 'react';
import { FormattedMessage } from 'react-intl';
import InternalPage from 'ui/internal-page/InternalPage';
import WidgetForm from 'ui/widgets/WidgetForm';
import { Grid, Breadcrumb } from 'patternfly-react';

import { BreadcrumbItem } from 'frontend-common-components';

const WidgetPage = () => (
  <InternalPage className="WidgetPage">
    <Grid fluid>
      <Breadcrumb>
        <BreadcrumbItem route="home" active>
          <FormattedMessage id="menu.uxPattern" />
        </BreadcrumbItem>
        <BreadcrumbItem route="widgetForm">
          Widgets
        </BreadcrumbItem>
        <BreadcrumbItem route="widgetForm" active>
          Add
        </BreadcrumbItem>
      </Breadcrumb>
      <WidgetForm onSubmit={(values) => {
        console.log('values', values);
      }}
      />
    </Grid>
  </InternalPage>
);

export default WidgetPage;
