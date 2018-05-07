import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { BreadcrumbItem } from 'frontend-common-components';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import UserAuthorityPageFormContainer from 'ui/users/common/UserAuthorityPageFormContainer';
import { ROUTE_USER_LIST } from 'app-init/router';

const UserAuthorityPage = ({ username }) => (
  <InternalPage className="authorityPage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <FormattedMessage id="menu.userManagement" />
            </BreadcrumbItem>
            <BreadcrumbItem route={ROUTE_USER_LIST}>
              <FormattedMessage id="menu.users" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="menu.users.authority" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <PageTitle
            titleId="user.authority.title"
            helpId="user.help"
            titleParam={username}
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
