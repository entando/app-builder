import React from 'react';

// eslint-disable-next-line import/prefer-default-export
export function useForceUpdate() {
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = React.useState(0); // integer state
  // eslint-disable-next-line no-shadow
  return () => setValue(value => value + 1); // update state to force render
}
