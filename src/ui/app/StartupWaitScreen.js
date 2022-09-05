import React from 'react';
import NewSpinner from 'ui/pages/common/NewSpinner';

const StartupWaitScreen = () => (
  <div data-testid="startup-wait-screen" className="StartupWaitScreen">
    <NewSpinner loading />
    <h2>Entando is installing</h2>
    <p>Wait a few more minutes for the installation to complete</p>
  </div>
);

export default StartupWaitScreen;
