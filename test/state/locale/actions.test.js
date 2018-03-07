
import { setLanguage, setCurrentLanguage } from 'state/locale/actions';
import { SET_LANGUAGE } from 'state/locale/types';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const DEFAULT_LANG = {
  type: SET_LANGUAGE,
  payload: {
    locale: 'en',
  },
};

it('test setLanguage action', () => {
  expect(setLanguage('en')).toEqual(DEFAULT_LANG);
});

it('test thunk action', () => {
  const store = mockStore(DEFAULT_LANG);
  store.dispatch(setCurrentLanguage('it'));
  const actions = store.getActions();
  expect(actions[0].payload.locale).toEqual('it');
});
