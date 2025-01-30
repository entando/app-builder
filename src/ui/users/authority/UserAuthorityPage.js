import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'patternfly-react';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';
import UserAuthorityPageFormContainer from 'ui/users/common/UserAuthorityPageFormContainer';
import { ROUTE_USER_LIST } from 'app-init/router';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';

const UserAuthorityPage = ({ username }) => (
  <InternalPage className="authorityPage">
    <HeaderBreadcrumb breadcrumbs={[
      { label: 'menu.userManagement' },
      { label: 'menu.users', to: ROUTE_USER_LIST },
      { label: 'menu.users.authority', active: true },
    ]}
    />
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <ErrorsAlertContainer />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <PageTitle
            titleId="user.authority.title"
            helpId="user.help"
            titleParam={{ titleParam: username }}
          />
        </Col>
      </Row>
      <Row>
        <UserAuthorityPageFormContainer />
      </Row>
    </Grid>
  </InternalPage>
);

UserAuthorityPage.propTypes = {
  username: PropTypes.string,
};
UserAuthorityPage.defaultProps = {
  username: '',
};
export default UserAuthorityPage;
