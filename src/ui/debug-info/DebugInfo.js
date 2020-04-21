import React from 'react';

const DebugInfo = () => (
  <div className="EntBlueViewPage" style={{ backgroundImage: 'url(images/login-bg.png)' }}>
    <div className="EntBlueViewPage__center-box">
      <div className="EntBlueViewPage__brand">
        <div className="EntBlueViewPage__logo" style={{ backgroundImage: 'url(images/login-logo.svg)' }} />
        <div className="EntBlueViewPage__description">Debug Information</div>
      </div>
      <div className="EntBlueViewPage__values">
        <p>App Builder version: <strong>{process.env.APP_BUILDER_VERSION}</strong></p>
        <p>Browser Info: <strong>{window.navigator.userAgent}</strong></p>
        <p>OS Info: <strong>{window.navigator.platform}</strong></p>
      </div>
    </div>
  </div>
);

export default DebugInfo;
