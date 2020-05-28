import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Spinner } from 'patternfly-react';
import { PermissionCheck, routeConverter, hasAccess } from '@entando/utils';
import { NoAccessPage } from '@entando/pages';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '@entando/apimanager';
import { ROUTE_DASHBOARD } from 'app-init/router';
import {
  ADMINISTRATION_AREA_PERMISSION,
  ROLE_SUPERUSER,
} from 'state/permissions/const';
import { getLoggedUserPermissions } from 'state/permissions/selectors';

const injectPermissionValues = WrappedComponent => (props) => {
  // eslint-disable-next-line react/prop-types
  const { userPermissions, ...otherProps } = props;

  const isSuperuser = hasAccess(ROLE_SUPERUSER, userPermissions || []);

  const newProps = {
    ...otherProps,
    userPermissions,
    isSuperuser,
  };

  return (
    <WrappedComponent {...newProps} />
  );
};

export const withPermissionValues = compose(
  connect(state => ({
    userPermissions: getLoggedUserPermissions(state),
  }), null),
  injectPermissionValues,
);

/**
 * HOC that Handles whether or not the user is allowed to see the page.
 * @param {array} requiredPermissions - user permissions that are necessary
 * to exist to be allowed to see the page.
 * @returns {Component}
 */
const withPermissions = requiredPermissions => (WrappedComponent) => {
  const AppBuilderPermissionCheck = ({
    userPermissions,
    gotoLogout,
    gotoHomepage,
    ...rest
  }) => (
    <Spinner loading={!!(userPermissions === null)}>
      <PermissionCheck
        page403={<NoAccessPage
          gotoHome={requiredPermissions === ADMINISTRATION_AREA_PERMISSION
            ? gotoLogout : gotoHomepage}
        />}
        requiredPermissions={requiredPermissions}
        userPermissions={userPermissions || []}
      >
        <WrappedComponent
          userPermissions={userPermissions || []}
          {...rest}
        />
      </PermissionCheck>
    </Spinner>
  );

  AppBuilderPermissionCheck.propTypes = {
    userPermissions: PropTypes.arrayOf(PropTypes.string),
    gotoLogout: PropTypes.func.isRequired,
    gotoHomepage: PropTypes.func.isRequired,
  };

  AppBuilderPermissionCheck.defaultProps = {
    userPermissions: [],
  };

  const mapDispatchToProps = (dispatch, { history }) => ({
    gotoLogout: () => dispatch(logoutUser()),
    gotoHomepage: () => history.push(routeConverter(ROUTE_DASHBOARD)),
  });

  const AppBuilderPermissionCheckContainer = connect(
    null,
    mapDispatchToProps,
  )(AppBuilderPermissionCheck);

  return withRouter(withPermissionValues(AppBuilderPermissionCheckContainer));
};

export default withPermissions;
