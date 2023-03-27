import { selectCurrentSystemConfiguration, selectCurrSystemConfigAdvancedSearch } from 'state/current-system-configuration/selectors';

describe('state/system/selectors', () => {
  const state = {
    currentSystemConfiguration: {
      currentSystemConfiguration: {
        advancedSearch: {
          enabled: true,
        },
      },
    },
  };

  describe('selectCurrentSystemConfiguration', () => {
    it('should return the correct object from state', () => {
      const result = selectCurrentSystemConfiguration(state);
      expect(result).toBe(state.currentSystemConfiguration.currentSystemConfiguration);
    });
  });

  describe('selectCurrSystemConfigAdvancedSearch', () => {
    it('should return the correct object from state', () => {
      const result = selectCurrSystemConfigAdvancedSearch(state);
      expect(result).toBe(state.currentSystemConfiguration
        .currentSystemConfiguration.advancedSearch.enabled);
    });
  });
});
