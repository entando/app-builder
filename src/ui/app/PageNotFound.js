import React from 'react';
import PropTypes from 'prop-types';
import { NotFoundPage } from '@entando/pages';
import { hasAccess } from '@entando/utils';
import { withPermissionValues } from 'ui/auth/withPermissions';
import { ADMINISTRATION_AREA_PERMISSION } from 'state/permissions/const';

const PageNotFound = ({ userPermissions, gotoLogout, gotoHomepage }) => {
  const gotoHome = hasAccess(ADMINISTRATION_AREA_PERMISSION, userPermissions)
    ? gotoHomepage : gotoLogout;

  return (
    <NotFoundPage gotoHome={gotoHome} />
  );
};

PageNotFound.propTypes = {
  userPermissions: PropTypes.arrayOf(PropTypes.string),
  gotoLogout: PropTypes.func.isRequired,
  gotoHomepage: PropTypes.func.isRequired,
};

PageNotFound.defaultProps = {
  userPermissions: [],
};

export default withPermissionValues(PageNotFound);
