import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { Grid, Row, Col } from 'patternfly-react';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import EditFormContainer from 'ui/profile-types/attributes/EditFormContainer';
import { ROUTE_PROFILE_TYPE_LIST } from 'app-init/router';
import withPermissions from 'ui/auth/withPermissions';
import { SUPERUSER_PERMISSION } from 'state/permissions/const';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';

const msgs = defineMessages({
  appEdit: {
    id: 'app.edit',
    defaultMessage: 'Edit',
  },
});

const EditProfileTypeAttributePage = ({ intl }) => (

  <InternalPage className="EditProfileTypeAttributePage">
    <HeaderBreadcrumb breadcrumbs={[
      { label: 'menu.profile' },
      { label: 'menu.profileTypes', to: ROUTE_PROFILE_TYPE_LIST },
      { label: 'app.edit', active: true },
    ]}
    />
    <Grid fluid>
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

const EditProfileTypeAttributePageWithIntl = injectIntl(EditProfileTypeAttributePage);

export default withPermissions(SUPERUSER_PERMISSION)(EditProfileTypeAttributePageWithIntl);
