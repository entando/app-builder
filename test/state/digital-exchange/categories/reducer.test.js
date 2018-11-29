import reducer from 'state/digital-exchange/categories/reducer';
import {
  setSelectedDECategory,
  setDECategories,
} from 'state/digital-exchange/categories/actions';
import {
  LIST_DE_CATEGORIES_OK,
  GET_DE_CATEGORY_OK,
} from 'test/mocks/digital-exchange/categories';


describe('digital-exchange/categories/reducer', () => {
  const state = reducer();

  it('should return an object', () => {
    expect(typeof state).toBe('object');
  });

  describe('after action setSelectedDECategory', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setSelectedDECategory(GET_DE_CATEGORY_OK));
    });

    it('should define the category payload', () => {
      expect(newState).toHaveProperty('selected', GET_DE_CATEGORY_OK);
    });
  });

  describe('list reducer', () => {
    it('should return an object', () => {
      expect(typeof state.list).toBe('object');
      expect(state.list instanceof Array).toBe(true);
    });

    describe('after action setDECategirues', () => {
      it('should define category list', () => {
        const newState = reducer({}, setDECategories(LIST_DE_CATEGORIES_OK));
        expect(newState.list).toHaveLength(5);
      });
    });
  });
});
