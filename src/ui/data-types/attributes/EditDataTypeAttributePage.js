import React from 'react';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';
import EditFormContainer from 'ui/data-types/attributes/EditFormContainer';
import { ROUTE_DATA_TYPE_LIST } from 'app-init/router';
import withPermissions from 'ui/auth/withPermissions';
import { SUPERUSER_PERMISSION } from 'state/permissions/const';

const msgs = defineMessages({
  edit: {
    id: 'app.edit',
    defaultMessage: 'Edit',
  },
});

const EditDataTypeAttributePage = ({ intl }) => (

  <InternalPage className="EditDataTypeAttributePage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <FormattedMessage id="menu.data" />
            </BreadcrumbItem>
            <BreadcrumbItem to={ROUTE_DATA_TYPE_LIST}>
              <FormattedMessage id="menu.dataType" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="app.edit" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <PageTitle
        titleId="app.attribute"
        helpId="dataType.help"
        titleParam={{ mode: intl.formatMessage(msgs.edit) }}
      />
      <Row>
        <Col xs={12}>
          <ErrorsAlertContainer />
        </Col>
      </Row>
      <Row>
        <Col xs={12} >
          <EditFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

EditDataTypeAttributePage.propTypes = {
  intl: intlShape.isRequired,
};

export default withPermissions(SUPERUSER_PERMISSION)(injectIntl(EditDataTypeAttributePage));
