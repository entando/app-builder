import {
  getDashboard,
  getIntegrations,
  getApis,
  getPlugins,
  getPageStatus,
} from 'state/dashboard/selectors';

const STATE = {
  dashboard: {
    integrations: {
      apis: 1,
      plugins: 2,
    },
  },
  pageStatus: {
    draft: 1,
    published: 2,
    unpublished: 3,
  },
};

describe('state/dashboard/selectors', () => {
  it('getDashboard returns the full state', () => {
    expect(getDashboard(STATE)).toEqual(STATE.dashboard);
  });

  describe('integrations', () => {
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

  describe('pageStatus', () => {
    it('getPageStatus returns the full state', () => {
      expect(getPageStatus(STATE)).toEqual(STATE.dashboard.pageStatus);
    });
  });
});
