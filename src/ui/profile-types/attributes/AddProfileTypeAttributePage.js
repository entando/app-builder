import React from 'react';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import AddFormContainer from 'ui/profile-types/attributes/AddFormContainer';
import { ROUTE_PROFILE_TYPE_LIST } from 'app-init/router';
import withPermissions from 'ui/auth/withPermissions';
import { ROLE_SUPERUSER } from 'state/permissions/const';

const msgs = defineMessages({
  appAdd: {
    id: 'app.add',
    defaultMessage: 'Add',
  },
});

const AddProfileTypeAttributePage = ({ intl }) => (
  <InternalPage className="AttributePage">
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
              <FormattedMessage id="app.add" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <PageTitle
        titleId="app.attribute"
        helpId="profileType.help"
        titleParam={{ mode: intl.formatMessage(msgs.appAdd) }}
      />
      <Row>
        <Col xs={12} >
          <AddFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

AddProfileTypeAttributePage.propTypes = {
  intl: intlShape.isRequired,
};

const AddProfileTypeAttributePageWithIntl = injectIntl(AddProfileTypeAttributePage);

export default withPermissions(ROLE_SUPERUSER)(AddProfileTypeAttributePageWithIntl);
