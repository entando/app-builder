import { LIST_DE_CATEGORIES_OK } from 'test/mocks/digital-exchange/categories';

import { getDECategories, getDECategorySelected, getDECategoryList } from 'state/digital-exchange/categories/selectors';

const list = LIST_DE_CATEGORIES_OK;

const MOCK_STATE = {
  digitalExchangeCategories: {
    list,
    selected: list[0],
  },
};

describe('state/digital-exchange/categories/selectors', () => {
  it('getDECategories(state) returns the digitalExchangeCategories object', () => {
    const digitalExchangeCategories = getDECategories(MOCK_STATE);
    expect(digitalExchangeCategories).toBe(MOCK_STATE.digitalExchangeCategories);
  });

  it('getDECategorySelected(state) returns the selected object', () => {
    const selected = getDECategorySelected(MOCK_STATE);
    expect(selected).toBe(MOCK_STATE.digitalExchangeCategories.selected);
  });

  it('verify getDECategoryList selector', () => {
    expect(getDECategoryList(MOCK_STATE)).toEqual(MOCK_STATE.digitalExchangeCategories.list);
  });
});
