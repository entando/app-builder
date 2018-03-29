import { isFSA } from 'flux-standard-action';
import { toggleLoading } from 'state/loading/actions';
import { TOGGLE_LOADING } from 'state/loading/types';

const MOCK_PARAMETER = 'test';

describe('state/loading/actions', () => {
  describe('toggleLoading', () => {
    let action;
    beforeEach(() => {
      action = toggleLoading(MOCK_PARAMETER);
    });

    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it('is of type TOGGLE_LOADING', () => {
      expect(action.type).toBe(TOGGLE_LOADING);
    });

    it('defines the "id" payload property', () => {
      expect(action.payload.id).toBe(MOCK_PARAMETER);
    });
  });
});
