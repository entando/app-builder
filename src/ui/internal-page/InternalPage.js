import React from 'react';
import PropTypes from 'prop-types';
import ActivityStreamContainer from 'ui/activity-stream/ActivityStreamContainer';
import NotificationListContainer from 'ui/activity-stream/NotificationListContainer';
import BrandMenuContainer from 'ui/internal-page/BrandMenuContainer';
import LegacyAdminConsoleMenuContainer from 'ui/internal-page/LegacyAdminConsoleMenuContainer';
import getRuntimeEnv from 'helpers/getRuntimeEnv';

const InternalPage = ({ className, children }) => {
  const { LEGACY_ADMINCONSOLE_INTEGRATION_ENABLED } = getRuntimeEnv();
  return (
    <div
      data-testid="internal-page"
      className={['InternalPage', className, LEGACY_ADMINCONSOLE_INTEGRATION_ENABLED ?
      'layout-pf-fixed' : ''].join(' ').trim()}
    >
      {
      LEGACY_ADMINCONSOLE_INTEGRATION_ENABLED ?
        <LegacyAdminConsoleMenuContainer /> : <BrandMenuContainer />
      }
      <ActivityStreamContainer >
        <NotificationListContainer />
      </ActivityStreamContainer>
      {
      LEGACY_ADMINCONSOLE_INTEGRATION_ENABLED ? (
        <div className="container-fluid container-cards-pf container-pf-nav-pf-vertical">
          {children}
        </div>
      ) : children
      }
    </div>
  );
};

InternalPage.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

InternalPage.defaultProps = {
  children: null,
  className: '',
};

export default InternalPage;
