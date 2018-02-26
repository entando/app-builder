
import { SET_STATE } from 'state/widget-list/types';
import { getWidgetRow, fetchWidgetListRow } from 'state/widget-list/actions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.unmock('api/widgetList');

const SET_STATE_MOCKED = {
  type: SET_STATE,
  payload: {
    tableRow: [],
  },
};

it('test SET_STATE_MOCKED for empty object on initial state', () => {
  expect(getWidgetRow([])).toEqual(SET_STATE_MOCKED);
});

it('checks action type', () => {
  const action = getWidgetRow();
  expect(action.type).toBe(SET_STATE);
});
it('search for the payload to be defined', () => {
  const action = getWidgetRow();
  expect(action.payload).toBeDefined();
});


describe('test fetchWidgetListRow', () => {
  const store = mockStore(SET_STATE_MOCKED);
  it('fetchWidgetListRow calls setWidget action', (done) => {
    store.dispatch(fetchWidgetListRow()).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(SET_STATE);
      done();
    });
  });
  it('fetchWidgetListRow is defined and properly valued', (done) => {
    store.dispatch(fetchWidgetListRow()).then(() => {
      const actions = store.getActions();
      expect(actions[0].payload.tableRow).toBeDefined();
      done();
    });
  });
});
