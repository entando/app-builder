import React from 'react';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import EditFormContainer from 'ui/profile-types/attributes/EditFormContainer';
import { ROUTE_PROFILE_TYPE_LIST } from 'app-init/router';
import withPermissions from 'ui/auth/withPermissions';
import { ROLE_SUPERUSER } from 'state/permissions/const';

const msgs = defineMessages({
  appEdit: {
    id: 'app.edit',
    defaultMessage: 'Edit',
  },
});

const EditProfileTypeAttributePage = ({ intl }) => (

  <InternalPage className="EditProfileTypeAttributePage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <FormattedMessage id="menu.profile" />
            </BreadcrumbItem>
            <BreadcrumbItem to={ROUTE_PROFILE_TYPE_LIST}>
              <FormattedMessage id="menu.profileTypes" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="app.edit" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <PageTitle
        titleId="app.attribute"
        helpId="profileType.help"
        titleParam={{ mode: intl.formatMessage(msgs.appEdit) }}
      />
      <Row>
        <Col xs={12} >
          <EditFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

EditProfileTypeAttributePage.propTypes = {
  intl: intlShape.isRequired,
};

export default withPermissions(ROLE_SUPERUSER)(injectIntl(EditProfileTypeAttributePage));
