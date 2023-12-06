import { getSelectedSender } from 'state/email-config/selectors';

describe('state/email-config/selectors', () => {
  describe('getSelectedSender', () => {
    it('should return the correct state value', () => {
      const result = getSelectedSender({ emailConfig: { selectedSender: { code: 'test' } } });

      expect(result).toEqual({ code: 'test' });
    });
  });
});
