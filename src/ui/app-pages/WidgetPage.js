import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import InternalPage from 'ui/internal-page/InternalPage';
import WidgetForm from 'ui/widgets/WidgetForm';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';

import { BreadcrumbItem } from 'frontend-common-components';

const WidgetPage = ({ onSubmit }) => (
  <InternalPage className="WidgetPage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
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
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <WidgetForm onSubmit={onSubmit} />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

WidgetPage.propTypes = {
  onSubmit: PropTypes.func,
};

WidgetPage.defaultProps = {
  onSubmit: () => {},
};

export default WidgetPage;
