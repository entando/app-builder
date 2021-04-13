import React from 'react';
import PropTypes from 'prop-types';
import ActivityStreamContainer from 'ui/activity-stream/ActivityStreamContainer';
import NotificationListContainer from 'ui/activity-stream/NotificationListContainer';
import VerticalMenuContainer from 'ui/internal-page/VerticalMenuContainer';

const InternalPage = ({ className, children }) => (
  <div
    data-testid="internal-page"
    className={['InternalPage', className, 'layout-pf-fixed'].join(' ').trim()}
  >
    <VerticalMenuContainer />
    <ActivityStreamContainer >
      <NotificationListContainer />
    </ActivityStreamContainer>
    <div className="container-fluid container-cards-pf container-pf-nav-pf-vertical">
      {children}
    </div>
  </div>
);

InternalPage.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

InternalPage.defaultProps = {
  children: null,
  className: '',
};

export default InternalPage;
