import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { MenuItem } from 'react-bootstrap';
import { Icon } from 'patternfly-react';
import { UserDropdown } from '@entando/menu';
import LinkMenuItem from 'ui/common/LinkMenuItem';
import { ROUTE_USER_MY_PROFILE } from 'app-init/router';

const UserMenu = ({ username, logout }) => (
  <UserDropdown key="userDropdown" userName={username}>
    <LinkMenuItem
      id="my-profile"
      to={ROUTE_USER_MY_PROFILE}
      label={<span><Icon name="user" /> <FormattedMessage id="app.myProfile" /></span>}
    />
    <MenuItem onClick={logout}><Icon name="sign-out" /> <FormattedMessage id="app.logout" /></MenuItem>
  </UserDropdown>
);

UserMenu.propTypes = {
  username: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
};


export default UserMenu;
