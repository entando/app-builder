import React from 'react';
import PropTypes from 'prop-types';
import ActivityStreamContainer from 'ui/activity-stream/ActivityStreamContainer';
import NotificationListContainer from 'ui/activity-stream/NotificationListContainer';
import VerticalMenuContainer from 'ui/internal-page/VerticalMenuContainer';
import AboutInfoModal from 'ui/about/AboutInfoModal';
import LicenseInfoModal from 'ui/license/LicenseInfoModal';

const PageLayout = ({ className, children }) => (
  <div
    data-testid="page-layout"
    className={[className, 'layout-pf-fixed'].join(' ').trim()}
  >
    <VerticalMenuContainer />
    <ActivityStreamContainer >
      <NotificationListContainer />
    </ActivityStreamContainer>
    <AboutInfoModal />
    <LicenseInfoModal />
    <div className="container-fluid container-cards-pf container-pf-nav-pf-vertical">
      {children}
    </div>
  </div>
);

PageLayout.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

PageLayout.defaultProps = {
  children: null,
  className: '',
};

export default PageLayout;
