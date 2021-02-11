import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { Grid, Row, Col, Breadcrumb, Tabs, Tab } from 'patternfly-react';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';
import AccountFormContainer from 'ui/users/my-profile/AccountFormContainer';
import MyProfileEditFormContainer from 'ui/users/my-profile/MyProfileEditFormContainer';
import AppSettingsFormContainer from 'ui/users/my-profile/AppSettingsFormContainer';

const msgs = defineMessages({
  profile: {
    id: 'menu.profile',
    defaultMessage: 'Profile',
  },
  preferences: {
    id: 'user.myProfile.appSettingsSection',
    defaultMessage: 'Preferences',
  },
});

const MyProfilePage = ({ onTabSelect, intl }) => {
  const handleTabSelect = () => {
    onTabSelect();
  };

  return (
    <InternalPage className="MyProfilePage">
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <Breadcrumb>
              <BreadcrumbItem active>
                <FormattedMessage id="app.myProfile" />
              </BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>
        <PageTitle
          titleId="app.myProfile"
          helpId="user.myProfile.help"
        />
        <Tabs
          id="my-profile-tabs"
          defaultActiveKey="account"
          onSelect={handleTabSelect}
        >
          <Tab
            className="MyProfilePage__tab"
            eventKey="account"
            title="Account"
          >
            <Row>
              <Col xs={12}>
                <AccountFormContainer />
              </Col>
            </Row>
          </Tab>
          <Tab
            className="MyProfilePage__tab"
            eventKey="profile"
            title={intl.formatMessage(msgs.profile)}
          >
            <Row>
              <Col xs={12}>
                <ErrorsAlertContainer />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <MyProfileEditFormContainer />
              </Col>
            </Row>
          </Tab>
          <Tab
            className="MyProfilePage__tab"
            eventKey="preferences"
            title={intl.formatMessage(msgs.preferences)}
          >
            <Row>
              <Col xs={12}>
                <ErrorsAlertContainer />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <AppSettingsFormContainer />
              </Col>
            </Row>
          </Tab>
        </Tabs>
      </Grid>
    </InternalPage>
  );
};

MyProfilePage.propTypes = {
  onTabSelect: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(MyProfilePage);
