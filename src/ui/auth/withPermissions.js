import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'patternfly-react';
import { PermissionCheck, routeConverter } from '@entando/utils';
import { NoAccessPage } from '@entando/pages';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '@entando/apimanager';
import { ROUTE_DASHBOARD } from 'app-init/router';
import { ADMINISTRATION_AREA_PERMISSION } from 'state/permissions/const';
import { getLoggedUserPermissions } from 'state/permissions/selectors';
import { getLoading } from 'state/loading/selectors';

/**
 * HOC that Handles whether or not the user is allowed to see the page.
 * @param {array} requiredPermissions - user permissions that are necessary
 * to exist to be allowed to see the page.
 * @returns {Component}
 */
export default function withPermissions(requiredPermissions) {
  return (WrappedComponent) => {
    const AppBuilderPermissionCheck = ({
      userPermissions, gotoLogout, gotoHomepage, loading,
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
      userPermissions: getLoggedUserPermissions(state),
      loading: getLoading(state).loggedUserPermissions,
    });

    const mapDispatchToProps = (dispatch, { history }) => ({
      gotoLogout: () => dispatch(logoutUser()),
      gotoHomepage: () => history.push(routeConverter(ROUTE_DASHBOARD)),
    });


    return withRouter(connect(mapStateToProps, mapDispatchToProps)(AppBuilderPermissionCheck));
  };
}
