import { getSystemReport } from 'state/system/selectors';

describe('state/system/selectors', () => {
  const state = {
    system: {
      report: {
        testKey: 'testVal',
      },
    },
  };

  describe('getSystemReport', () => {
    it('should return the correct object from state', () => {
      const result = getSystemReport(state);
      expect(result).toBe(state.system.report);
    });
  });
});
