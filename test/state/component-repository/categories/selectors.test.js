import { LIST_ECR_CATEGORIES_OK } from 'test/mocks/component-repository/categories';

import { getECRCategories, getSelectedECRCategory, getECRCategoryList } from 'state/component-repository/categories/selectors';

const list = LIST_ECR_CATEGORIES_OK;

const MOCK_STATE = {
  componentRepositoryCategories: {
    list,
    selected: list[0],
  },
};

describe('state/component-repository/categories/selectors', () => {
  it('getECRCategories(state) returns the componentRepositoryCategories object', () => {
    const componentRepositoryCategories = getECRCategories(MOCK_STATE);
    expect(componentRepositoryCategories).toBe(MOCK_STATE.componentRepositoryCategories);
  });

  it('getSelectedECRCategory(state) returns the selected object', () => {
    const selected = getSelectedECRCategory(MOCK_STATE);
    expect(selected).toBe(MOCK_STATE.componentRepositoryCategories.selected);
  });

  it('verify getECRCategoryList selector', () => {
    expect(getECRCategoryList(MOCK_STATE)).toEqual(MOCK_STATE.componentRepositoryCategories.list);
  });
});
