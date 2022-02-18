import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { hasAccess } from '@entando/utils';
import { withPermissionValues } from 'ui/auth/withPermissions';

const ViewPermissionNoticeOverlay = ({ viewPermissions, userPermissions, children }) => {
  const canView = hasAccess(viewPermissions, userPermissions);
  return (
    <div className={`ViewPermissionNoticeOverlay${!canView ? ' ViewPermissionNoticeOverlay__noPermission' : ''}`}>
      <div className="ViewPermissionNoticeOverlay__content">
        {children}
      </div>
      <div className="ViewPermissionNoticeOverlay__permissionNotice">
        <strong><span className="fa fa-exclamation-triangle" /> <FormattedMessage id="dashboard.cards.noPermission" /></strong>
      </div>
    </div>
  );
};

ViewPermissionNoticeOverlay.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  viewPermissions: PropTypes.arrayOf(PropTypes.string).isRequired,
  userPermissions: PropTypes.arrayOf(PropTypes.string),
};

ViewPermissionNoticeOverlay.defaultProps = {
  userPermissions: [],
};

export default withPermissionValues(ViewPermissionNoticeOverlay);
