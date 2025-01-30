import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { Grid, Row, Col } from 'patternfly-react';
import InternalPage from 'ui/internal-page/InternalPage';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';
import PageTitle from 'ui/internal-page/PageTitle';
import AddFormContainer from 'ui/profile-types/attributes/AddFormContainer';
import { ROUTE_PROFILE_TYPE_LIST } from 'app-init/router';
import withPermissions from 'ui/auth/withPermissions';
import { SUPERUSER_PERMISSION } from 'state/permissions/const';

const msgs = defineMessages({
  appAdd: {
    id: 'app.add',
    defaultMessage: 'Add',
  },
});

const AddProfileTypeAttributePage = ({ intl }) => (
  <InternalPage className="AttributePage">
    <HeaderBreadcrumb breadcrumbs={[
      { label: 'menu.profile' },
      { label: 'menu.profileTypes', to: ROUTE_PROFILE_TYPE_LIST },
      { label: 'app.add', active: true },
    ]}
    />
    <Grid fluid>
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

export default withPermissions(SUPERUSER_PERMISSION)(AddProfileTypeAttributePageWithIntl);
