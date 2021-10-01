import reducer from 'state/assets/reducer';

import {
  setAssetCategoryFilter,
  setActiveFilters,
  setAssets,
  removeActiveFilter,
  setListFilterParams,
  setAssetChanged,
  setSearchKeyword,
  changeFileType,
  changeAssetsView,
  resetFilteringCategories,
  setAssetsCount,
} from 'state/assets/actions';

const ASSETS = [{
  id: 'a',
  filename: 'dog.png',
}, {
  id: 'b',
  filename: 'cat.png',
}];

describe('state/assets/reducer', () => {
  it('should return an object', () => {
    const state = reducer();
    expect(typeof state).toBe('object');
  });

  describe('after action SET_ASSETS', () => {
    let state;
    beforeEach(() => {
      state = reducer({ filteringCategories: [], assetsCount: {} }, setAssets(ASSETS));
    });

    describe('action setCategoryFilter', () => {
      let newState;
      it('should correctly update filtering category state field', () => {
        newState = reducer(state, setAssetCategoryFilter({ code: 'fifa_18' }));
        expect(newState.filteringCategories).toEqual({ code: 'fifa_18' });

        newState = reducer(newState, setAssetCategoryFilter({ code: 'a' }));
        expect(newState.filteringCategories).toEqual({ code: 'a' });

        newState = reducer(newState, resetFilteringCategories());
        expect(newState.filteringCategories).toEqual([]);
      });

      it('should correctly update assetsCount field', () => {
        newState = reducer(state, setAssetsCount('image', 5));
        expect(newState.assetsCount).toEqual({ image: 5 });
      });

      it('should correctly change assets state field', () => {
        newState = reducer(state, setAssets(ASSETS));
        expect(newState.assets).toEqual(['a', 'b']);
      });

      it('should correctly change active filters state field', () => {
        newState = reducer(state, setActiveFilters([{ code: 'a' }, { code: 'b' }]));
        expect(newState.activeFilters).toEqual([{ code: 'a' }, { code: 'b' }]);
      });
      it('should correctly remove active filters state fields property', () => {
        newState = reducer(state, setActiveFilters([{ code: 'a' }, { code: 'b' }]));
        expect(newState.activeFilters).toEqual([{ code: 'a' }, { code: 'b' }]);

        newState = reducer(newState, removeActiveFilter({ code: 'a' }));
        expect(newState.activeFilters).toEqual([{ code: 'b' }]);
      });
      it('should correctly change file type state field', () => {
        newState = reducer(state, changeFileType('image'));
        expect(newState.fileType).toEqual('image');
      });
      it('should correctly change assets view state field', () => {
        newState = reducer(state, changeAssetsView('grid'));
        expect(newState.assetsView).toEqual('grid');
      });
    });
    describe('list filter reducers', () => {
      let newState;
      it('should correctly change an asset', () => {
        const theAsset = { ...ASSETS[0], filename: 'doggo.png' };
        newState = reducer(state, setAssetChanged(theAsset));
        expect(newState.assetsMap[theAsset.id]).toEqual(theAsset);
      });

      it('should correctly set filterparams', () => {
        const filt = { cat: 1 };
        newState = reducer(state, setListFilterParams(filt));
        expect(newState.filterParams).toEqual(filt);
      });

      it('should correctly set search keyword', () => {
        const keyword = 'oi oi';
        newState = reducer(state, setSearchKeyword(keyword));
        expect(newState.keyword).toEqual(keyword);
      });
    });
  });
});
