import 'state/page-models/customJestExpects';

import { getPageModels, getPageModelsList, getSelectedPageModel } from 'state/page-models/selectors';

import { GET_LIST_RESPONSE, COMPLEX_PAYLOAD } from 'test/mocks/pageModels';

const PAGE_MODELS = GET_LIST_RESPONSE.payload;

const STATE = {
  pageModels: {
    list: PAGE_MODELS,
    selected: COMPLEX_PAYLOAD,
  },
};


describe('state/page-models/selectors', () => {
  it('getPageModels returns the page models state', () => {
    expect(getPageModels(STATE)).toEqual(STATE.pageModels);
  });

  it('getPageModelsList returns the page models list', () => {
    expect(getPageModelsList(STATE)).toEqual(PAGE_MODELS);
  });

  it('getSelectedPageModel returns the selected page models', () => {
    expect(getSelectedPageModel(STATE)).toEqual(COMPLEX_PAYLOAD);
  });
});
