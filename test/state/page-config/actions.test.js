import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import rootReducer from 'state/rootReducer';
import { initConfigPage } from 'state/page-config/actions';

import { ADD_ERRORS } from 'state/errors/types';
import { SET_SELECTED_PAGE_MODEL } from 'state/page-models/types';

import { HOMEPAGE_RESPONSE, ERROR } from 'test/mocks/pages';
import { COMPLEX_RESPONSE } from 'test/mocks/pageModels';

// mocked
import { fetchPage } from 'api/pages';
import { getPageModel } from 'api/pageModels';
import { addErrors } from 'state/errors/actions';
import { setSelectedPageModel } from 'state/page-models/actions';

jest.mock('api/pages', () => ({
  fetchPage: jest.fn(),
}));

jest.mock('api/pageModels', () => ({
  getPageModel: jest.fn(),
}));

jest.mock('state/errors/actions', () => ({
  addErrors: jest.fn().mockImplementation(require.requireActual('state/errors/actions').addErrors),
}));

jest.mock('state/page-models/actions', () => ({
  setSelectedPageModel: jest.fn()
    .mockImplementation(require.requireActual('state/page-models/actions').setSelectedPageModel),
}));


const resolve = arg => new Promise(r => r(arg));

const mockStore = configureStore([thunk]);
const INITIAL_STATE = rootReducer();
const ERROR_MESSAGES = ERROR.errors.map(err => err.message);


describe('state/page-config/actions', () => {
  beforeEach(jest.clearAllMocks);

  let store;

  describe('initConfigPage()', () => {
    beforeEach(() => {
      store = mockStore(INITIAL_STATE);
    });

    it('when GET /page/<code> returns errors, it will dispatch ADD_ERRORS', () => {
      fetchPage.mockReturnValue(resolve(ERROR));
      store.dispatch(initConfigPage()).then(() => {
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes).toEqual([ADD_ERRORS]);
        expect(addErrors).toHaveBeenCalledWith(ERROR_MESSAGES);
      });
    });

    it('when GET /pagemodels/<code> returns errors, it will dispatch ADD_ERRORS', () => {
      fetchPage.mockReturnValue(resolve(HOMEPAGE_RESPONSE));
      getPageModel.mockReturnValue(resolve(ERROR));
      store.dispatch(initConfigPage()).then(() => {
        expect(getPageModel).toHaveBeenCalledWith(HOMEPAGE_RESPONSE.payload.pageModel);
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes).toEqual([ADD_ERRORS]);
        expect(addErrors).toHaveBeenCalledWith(ERROR_MESSAGES);
      });
    });

    it('when API responses are ok', () => {
      fetchPage.mockReturnValue(resolve(HOMEPAGE_RESPONSE));
      getPageModel.mockReturnValue(resolve(COMPLEX_RESPONSE));
      store.dispatch(initConfigPage()).then(() => {
        expect(getPageModel).toHaveBeenCalledWith(HOMEPAGE_RESPONSE.payload.pageModel);
        expect(getPageModel).toHaveBeenCalledWith(HOMEPAGE_RESPONSE.payload.pageModel);
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes).toEqual([SET_SELECTED_PAGE_MODEL]);
        expect(setSelectedPageModel).toHaveBeenCalledWith(COMPLEX_RESPONSE.payload);
      });
    });
  });
});
