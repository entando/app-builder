import React from 'react';

jest.mock('ui/login/LoginFormContainer', () => () => <span />);
jest.mock('ui/activity-stream/ActivityStreamContainer', () => () => <span />);
jest.mock('ui/activity-stream/ActivityStreamMenuContainer', () => () => <span />);
