import { getPages } from 'state/pages/selectors';


const MOCK_STATE = {
  pages: { homepage: {} },
};

describe('state/pages/selectors', () => {
  describe('getPages', () => {
    it('returns the pages object', () => {
      const state = getPages(MOCK_STATE);
      expect(state).toBe(MOCK_STATE.pages);
    });
  });
});
