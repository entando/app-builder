import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { MenuItem } from 'react-bootstrap';
import { Icon } from 'patternfly-react';
import { UserDropdown } from 'frontend-common-components';

const UserMenu = ({ username, logout }) => (
  <UserDropdown key="userDropdown" userName={username}>
    <MenuItem><Icon name="user" /> <FormattedMessage id="app.myProfile" /></MenuItem>
    <MenuItem onClick={logout}><Icon name="sign-out" /> <FormattedMessage id="app.logout" /></MenuItem>
  </UserDropdown>
);

UserMenu.propTypes = {
  username: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
};


export default UserMenu;
