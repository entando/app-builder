import reducer from 'state/component-repository/categories/reducer';
import {
  setSelectedECRCategory,
  setECRCategories,
} from 'state/component-repository/categories/actions';
import {
  LIST_ECR_CATEGORIES_OK,
  GET_ECR_CATEGORY_OK,
} from 'test/mocks/component-repository/categories';


describe('component-repository/categories/reducer', () => {
  const state = reducer();

  it('should return an object', () => {
    expect(typeof state).toBe('object');
  });

  describe('after action setSelectedECRCategory', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setSelectedECRCategory(GET_ECR_CATEGORY_OK));
    });

    it('should define the category payload', () => {
      expect(newState).toHaveProperty('selected', GET_ECR_CATEGORY_OK);
    });
  });

  describe('list reducer', () => {
    it('should return an object', () => {
      expect(typeof state.list).toBe('object');
      expect(state.list instanceof Array).toBe(true);
    });

    describe('after action setECRCategirues', () => {
      it('should define category list', () => {
        const newState = reducer({}, setECRCategories(LIST_ECR_CATEGORIES_OK));
        expect(newState.list).toHaveLength(7);
      });
    });
  });
});
