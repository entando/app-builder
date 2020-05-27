import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Spinner } from 'patternfly-react';
import { PermissionCheck, routeConverter } from '@entando/utils';
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
import { getLoading } from 'state/loading/selectors';

const injectPermissionValues = WrappedComponent => (props) => {
  // eslint-disable-next-line react/prop-types
  const { userPermissions, ...otherProps } = props;

  const canUser = permission => userPermissions.includes(permission);

  const hasSomePermissions = requiredPermissions => (
    requiredPermissions.some(permission => userPermissions.includes(permission))
  );

  const hasEveryPermission = requiredPermissions => (
    requiredPermissions.every(permission => userPermissions.includes(permission))
  );

  const isSuperuser = userPermissions.includes(ROLE_SUPERUSER);

  const newProps = {
    ...otherProps,
    userPermissions,
    isSuperuser,
    canUser,
    hasSomePermissions,
    hasEveryPermission,
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
    loading,
  }) => (
    <Spinner loading={!!loading}>
      <PermissionCheck
        page403={<NoAccessPage
          gotoHome={requiredPermissions === ADMINISTRATION_AREA_PERMISSION
            ? gotoLogout : gotoHomepage}
        />}
        requiredPermissions={requiredPermissions}
        userPermissions={userPermissions}
      >
        <WrappedComponent />
      </PermissionCheck>
    </Spinner>
  );

  AppBuilderPermissionCheck.propTypes = {
    userPermissions: PropTypes.arrayOf(PropTypes.string),
    gotoLogout: PropTypes.func.isRequired,
    gotoHomepage: PropTypes.func.isRequired,
    loading: PropTypes.bool,
  };

  AppBuilderPermissionCheck.defaultProps = {
    userPermissions: [],
    loading: true,
  };

  const mapStateToProps = state => ({
    loading: getLoading(state).loggedUserPermissions,
  });

  const mapDispatchToProps = (dispatch, { history }) => ({
    gotoLogout: () => dispatch(logoutUser()),
    gotoHomepage: () => history.push(routeConverter(ROUTE_DASHBOARD)),
  });

  const AppBuilderPermissionCheckContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AppBuilderPermissionCheck);

  return withRouter(withPermissionValues(AppBuilderPermissionCheckContainer));
};

export default withPermissions;
