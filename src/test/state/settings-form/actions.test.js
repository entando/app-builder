
import { GET_OPTIONS } from 'state/settings-form/types';
import { SELECT_OPTIONS_OK, PAGE_SETTINGS } from 'test/mocks/pageSettings';
import { getOptions, fetchSelectOptions, fetchPageSettings, mapItem } from 'state/settings-form/actions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.unmock('api/pageSettings');

const GET_OPTIONS_MOCKED = {
  type: GET_OPTIONS,
  payload: {
    options: [],
  },
};

const PAGE_SETTINGS_MOCKED = {
  form: {
    settings: {
      initial: {},
    },
  },
};

describe('test settings-form/actions', () => {
  it('test GET_OPTIONS_MOCKED for empty object on initial state', () => {
    expect(getOptions([])).toEqual(GET_OPTIONS_MOCKED);
  });

  it('checks action type', () => {
    const action = getOptions();
    expect(action.type).toBe(GET_OPTIONS);
  });
  it('search for the payload to be defined', () => {
    const action = getOptions();
    expect(action.payload).toBeDefined();
  });

  describe('test fetchSelectOptions', () => {
    const store = mockStore(GET_OPTIONS_MOCKED);
    it('fetchSelectOptions calls getOptions action', (done) => {
      store.dispatch(fetchSelectOptions()).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(GET_OPTIONS);
        done();
      });
    });
    it('options array is defined and properly valued', (done) => {
      store.dispatch(fetchSelectOptions()).then(() => {
        const actions = store.getActions();
        expect(actions[0].payload.options).toBeDefined();
        expect(actions[0].payload.options).toEqual(SELECT_OPTIONS_OK.payload);
        done();
      });
    });
  });

  describe('test fetchPageSettings', () => {
    const store = mockStore(PAGE_SETTINGS_MOCKED);
    it('fetchPageSettings', (done) => {
      store.dispatch(fetchPageSettings()).then(() => {
        const actions = store.getActions();
        expect(actions[0].payload).toEqual(mapItem(PAGE_SETTINGS.payload.param));
        done();
      });
    });
  });
});
