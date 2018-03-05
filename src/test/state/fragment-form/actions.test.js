
import { setFragment, fetchFragment } from 'state/fragment-form/actions';
import { SET_FRAGMENT } from 'state/fragment-form/types';
import { GET_FRAGMENT_OK } from 'test/mocks/fragment';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const FRAGMENT_MOCK = GET_FRAGMENT_OK.payload;

const FRAGMENT_CODE = 'test_fragment';

const SET_FRAGMENT_MOCK_INITIAL_STATE = {
  type: SET_FRAGMENT,
  payload: {
    widgetValues: {},
  },
};

it('test setFragment action sets the correct type', () => {
  const action = setFragment(FRAGMENT_MOCK);
  expect(action.type).toEqual(SET_FRAGMENT);
});

describe('test fetchFragment', () => {
  const store = mockStore(SET_FRAGMENT_MOCK_INITIAL_STATE);
  it('fetchWidget calls setFragment action', (done) => {
    store.dispatch(fetchFragment(FRAGMENT_CODE)).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(SET_FRAGMENT);
      done();
    });
  });
  it('fragmentValues is defined and properly valued', (done) => {
    store.dispatch(fetchFragment(FRAGMENT_CODE)).then(() => {
      const actions = store.getActions();
      expect(actions[0].payload.fragmentValues).toBeDefined();
      expect(actions[0].payload.fragmentValues).toEqual(FRAGMENT_MOCK);
      done();
    });
  });
});
