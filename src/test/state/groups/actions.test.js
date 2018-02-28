
import { addGroups, fetchGroups } from 'state/groups/actions';
import { ADD_GROUPS } from 'state/groups/types';
import { GROUPS } from 'test/mocks/groups';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const ADD_GROUP_MOCK_INITIAL_STATE = {
  type: ADD_GROUPS,
  payload: [],
};

const GROUP_PAYLOAD = GROUPS.payload;

it('test addGroups action sets the correct type', () => {
  const action = addGroups(GROUP_PAYLOAD);
  expect(action.type).toEqual(ADD_GROUPS);
});

describe('test fetchFragment', () => {
  const store = mockStore(ADD_GROUP_MOCK_INITIAL_STATE);
  it('fetchGroups calls ADDgROUPS action', (done) => {
    store.dispatch(fetchGroups()).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(ADD_GROUPS);
      done();
    });
  });
  it('state contains groups', (done) => {
    store.dispatch(fetchGroups()).then(() => {
      const actions = store.getActions();
      expect(actions[0].payload.groups).toBeDefined();
      expect(actions[0].payload.groups).toEqual(GROUP_PAYLOAD);
      done();
    });
  });
});
