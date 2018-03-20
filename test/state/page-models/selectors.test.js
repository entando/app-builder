
import {
  getPageModels, getPageModelsList, getSelectedPageModel,
  getSelectedPageModelCellMap,
} from 'state/page-models/selectors';

import { GET_LIST_RESPONSE } from 'test/mocks/pageModels';
import { PAYLOAD as COMPLEX_PAYLOAD, CELL_MAP as COMPLEX_CELL_MAP } from 'test/mocks/page-models/complex';
import { PAYLOAD as SIDEBAR_HOLES_PAYLOAD, CELL_MAP as SIDEBAR_HOLES_CELL_MAP } from 'test/mocks/page-models/sidebarHoles';
import { PAYLOAD as SINGLE_CELL_PAYLOAD, CELL_MAP as SINGLE_CELL_CELL_MAP } from 'test/mocks/page-models/singleCell';
import { PAYLOAD as MISSING_SKETCH_PAYLOAD, CELL_MAP as MISSING_SKETCH_CELL_MAP } from 'test/mocks/page-models/missingSketch';
import { PAYLOAD as WRONG_POS_PAYLOAD, CELL_MAP as WRONG_POS_CELL_MAP } from 'test/mocks/page-models/wrongPos';
import { PAYLOAD as OVERLAPPING_FRAMES_PAYLOAD, CELL_MAP as OVERLAPPING_FRAMES_CELL_MAP } from 'test/mocks/page-models/overlappingFrames';

const PAGE_MODELS = GET_LIST_RESPONSE.payload;

const STATE = {
  pageModels: {
    list: PAGE_MODELS,
    selected: COMPLEX_PAYLOAD,
  },
};

const buildStateWithSelectedPageModel = pageModel => ({
  pageModels: {
    list: PAGE_MODELS,
    selected: pageModel,
  },
});


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

  describe('getSelectedPageModelCellMap', () => {
    it('with COMPLEX page model', () => {
      const state = buildStateWithSelectedPageModel(COMPLEX_PAYLOAD);
      expect(getSelectedPageModelCellMap(state)).toEqual(COMPLEX_CELL_MAP);
    });

    it('with SIDEBAR_HOLES page model', () => {
      const state = buildStateWithSelectedPageModel(SIDEBAR_HOLES_PAYLOAD);
      expect(getSelectedPageModelCellMap(state)).toEqual(SIDEBAR_HOLES_CELL_MAP);
    });

    it('with SINGLE_CELL page model', () => {
      const state = buildStateWithSelectedPageModel(SINGLE_CELL_PAYLOAD);
      expect(getSelectedPageModelCellMap(state)).toEqual(SINGLE_CELL_CELL_MAP);
    });

    it('with MISSING_SKETCH page model', () => {
      const state = buildStateWithSelectedPageModel(MISSING_SKETCH_PAYLOAD);
      expect(getSelectedPageModelCellMap(state)).toEqual(MISSING_SKETCH_CELL_MAP);
    });

    it('with WRONG_POS page model', () => {
      const state = buildStateWithSelectedPageModel(WRONG_POS_PAYLOAD);
      expect(getSelectedPageModelCellMap(state)).toEqual(WRONG_POS_CELL_MAP);
    });

    it('with OVERLAPPING_FRAMES page model', () => {
      const state = buildStateWithSelectedPageModel(OVERLAPPING_FRAMES_PAYLOAD);
      expect(getSelectedPageModelCellMap(state)).toEqual(OVERLAPPING_FRAMES_CELL_MAP);
    });

    it('with no page model', () => {
      const state = buildStateWithSelectedPageModel();
      expect(getSelectedPageModelCellMap(state)).toEqual(null);
    });
  });
});
