import { selectCurrentTenant, selectIsPrimaryTenant } from 'state/multi-tenancy/selectors';

describe('state/multi-tenancy/selectors', () => {
  const state = {
    currentTenant: {
      currentTenant: {
        primary: true,
      },
    },
  };

  describe('selectCurrentTenant', () => {
    it('should return the correct object from state', () => {
      const result = selectCurrentTenant(state);
      expect(result).toBe(state.currentTenant.currentTenant);
    });
  });

  describe('selectIsPrimaryTenant when currentTenant is provided and is true', () => {
    it('should return the correct object from state', () => {
      const result = selectIsPrimaryTenant(state);
      expect(result).toBe(state.currentTenant.currentTenant.primary);
    });
  });

  describe('selectIsPrimaryTenant when currentTenant is provided and is false', () => {
    it('should return the correct object from state', () => {
      const appState = {
        currentTenant: {
          currentTenant: {
            primary: false,
          },
        },
      };
      const result = selectIsPrimaryTenant(appState);
      expect(result).toBe(appState.currentTenant.currentTenant.primary);
    });
  });

  describe('selectIsPrimaryTenant when currentTenant is undefined', () => {
    it('should return the correct object from state', () => {
      const appState = {
        currentTenant: {
        },
      };
      const result = selectIsPrimaryTenant(appState);
      expect(result).toBe(false);
    });
  });

  describe('selectIsPrimaryTenant when currentTenant is null', () => {
    it('should return the correct object from state', () => {
      const appState = {
        currentTenant: {
          currentTenant: null,
        },
      };
      const result = selectIsPrimaryTenant(appState);
      expect(result).toBe(true);
    });
  });
});
