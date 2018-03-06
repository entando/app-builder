
import { setFragments, fetchFragments } from 'state/fragment-list/actions';
import { SET_FRAGMENTS } from 'state/fragment-list/types';
import { LIST_FRAGMENTS_OK } from 'test/mocks/fragments';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const FRAGMENT_MOCK = LIST_FRAGMENTS_OK.payload;

const SET_FRAGMENT_MOCK_INITIAL_STATE = {
  type: SET_FRAGMENTS,
  payload: [],
};

describe('fragment-list actions', () => {
  describe('setFragments', () => {
    it('test setFragments action sets the correct type', () => {
      const action = setFragments(FRAGMENT_MOCK);
      expect(action.type).toEqual(SET_FRAGMENTS);
    });
  });

  describe('fetchFragments', () => {
    const store = mockStore(SET_FRAGMENT_MOCK_INITIAL_STATE);

    it('fetchFragments calls setFragmentS action', (done) => {
      store.dispatch(fetchFragments()).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(SET_FRAGMENTS);
        done();
      });
    });

    it('fragments is defined and properly valued', (done) => {
      store.dispatch(fetchFragments()).then(() => {
        const actionPayload = store.getActions()[0].payload;
        expect(actionPayload.fragments).toHaveLength(1);
        const fragment = actionPayload.fragments[0];
        expect(fragment).toHaveProperty('code');
        expect(fragment).toHaveProperty('isLocked');
        expect(fragment).toHaveProperty('widgetType');
        expect(fragment).toHaveProperty('pluginCode');
        done();
      });
    });
  });
});
