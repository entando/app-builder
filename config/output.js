/* eslint-disable no-console */

'use strict';

const consoleWarning = console.warn;

global.console = {
  // we want to filter out some warnings to have a clear console
  warn: jest.fn().mockImplementation((message) => {
    if (
    // Filtering out the above warning as it is throw by a deprecated library called `Recompose`
    // which is being used by v3-patternfly which is also deprecated:
    // React.createFactory() is deprecated and will be removed in a future major release.
    // Consider using JSX or use React.createElement() directly instead.
      !message.includes('React.createFactory()')
    // we are aware of unsafe lifecycles methods
    && !message.includes('react-unsafe-component-lifecycles')
    ) {
      consoleWarning(message);
    }
  }),

  error: console.error,
  log: console.log,
  info: console.info,
  debug: console.debug,
};
