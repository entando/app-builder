import { getStatus, getConfiguration } from 'state/reload-configuration/selectors';

const MOCK_STATE = {
  configuration: {
    status: 'success',
  },
};

describe('state/reload-configuration/selectors', () => {
  it('getConfiguration(state) returns the configuration object', () => {
    const selected = getConfiguration(MOCK_STATE);
    expect(selected).toBe(MOCK_STATE.configuration);
  });

  it('verify getStatus selector', () => {
    const selected = getStatus(MOCK_STATE);
    expect(selected).toBe(MOCK_STATE.configuration.status);
  });
});
