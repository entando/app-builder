import {
  getDashboard,
  getIntegrations,
  getApis,
  getPlugins,
} from 'state/dashboard/selectors';

const STATE = {
  dashboard: {
    integrations: {
      apis: 1,
      plugins: 2,
    },
  },
};

describe('state/dashboard/selectors', () => {
  it('getDashboard returns the full state', () => {
    expect(getDashboard(STATE)).toEqual(STATE.dashboard);
  });

  it('getIntegrations returns the full state', () => {
    expect(getIntegrations(STATE)).toEqual(STATE.dashboard.integrations);
  });

  it('getApis returns the apis', () => {
    expect(getApis(STATE)).toEqual(STATE.dashboard.integrations.apis);
  });

  it('getPlugins returns the plugins', () => {
    expect(getPlugins(STATE)).toEqual(STATE.dashboard.integrations.plugins);
  });
});
