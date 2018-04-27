import {
  getIntegrations,
  getApis,
  getPlugins,
} from 'state/integrations/selectors';

const STATE = {
  integrations: {
    apis: 1,
    plugins: 2,
  },
};

describe('state/integrations/selectors', () => {
  it('getIntegrations returns the full state', () => {
    expect(getIntegrations(STATE)).toEqual(STATE.integrations);
  });

  it('getApis returns the apis', () => {
    expect(getApis(STATE)).toEqual(STATE.integrations.apis);
  });

  it('getPlugins returns the plugins', () => {
    expect(getPlugins(STATE)).toEqual(STATE.integrations.plugins);
  });
});
