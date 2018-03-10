import 'state/page-models/customJestExpects';

import {
  getPageModels, getPageModelsList, getSelectedPageModel,
  getPageModelStruct,
} from 'state/page-models/selectors';

import { GET_LIST_RESPONSE, COMPLEX_PAYLOAD } from 'test/mocks/pageModels';

const PAGE_MODELS = GET_LIST_RESPONSE.payload;

const STATE = {
  pageModels: {
    list: PAGE_MODELS,
    selected: COMPLEX_PAYLOAD,
  },
};

const buildStateWithSelected = pageModel => ({
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
});

describe('state/page-models/selectors getPageModelStruct()', () => {
  let struct;
  // FIXME decomment when getSelectedPageModel is not mocked anymore
  // it('returns null if there is no selected page model', () => {
  //   const state = buildStateWithSelected(null);
  //   expect(getPageModelStruct(state)).toBe(null);
  // });

  /*
  COMPLEX_PAGE_MODEL structure

  | 2 | 2 | 2 | 2 | 2 | 2 |
  |       8       |   4   |
  |      7      |    5    |
  |   4   |   4   |   4   |
  |           12          |
  |           12          |
  |           12          |
  */
  describe('with COMPLEX_PAGE_MODEL', () => {
    beforeEach(() => {
      const state = buildStateWithSelected(COMPLEX_PAYLOAD);
      struct = getPageModelStruct(state);
    });

    it('root struct should have 7 rows', () => {
      expect(struct.rows).toHaveLength(7);
    });

    it('first row should have 6 leaf cols of width 2', () => {
      const row = struct.rows[0];
      expect(row.cols).toHaveLength(6);
      row.cols.forEach((col) => {
        expect(col).toBeLeafCol();
        expect(col).toBeCellOfWidth(2);
      });
    });

    it('second row should have 2 leaf cols of width 8 and 4', () => {
      const row = struct.rows[1];
      expect(row.cols).toHaveLength(2);
      expect(row.cols[0]).toBeLeafCol();
      expect(row.cols[0]).toBeCellOfWidth(8);
      expect(row.cols[1]).toBeLeafCol();
      expect(row.cols[1]).toBeCellOfWidth(4);
    });

    it('third row should have 2 leaf cols of width 7 and 5', () => {
      const row = struct.rows[2];
      expect(row.cols).toHaveLength(2);
      expect(row.cols[0]).toBeLeafCol();
      expect(row.cols[0]).toBeCellOfWidth(7);
      expect(row.cols[1]).toBeLeafCol();
      expect(row.cols[1]).toBeCellOfWidth(5);
    });

    it('fourth row should have 3 leaf cols of width 4', () => {
      const row = struct.rows[3];
      expect(row.cols).toHaveLength(3);
      row.cols.forEach((col) => {
        expect(col).toBeLeafCol();
        expect(col).toBeCellOfWidth(4);
      });
    });

    it('rows from fifth to seventh to have one single col of width 12', () => {
      for (let i = 4; i < struct.rows.length; i += 1) {
        const row = struct.rows[i];
        expect(row.cols).toHaveLength(1);
        expect(row.cols[0]).toBeLeafCol();
        expect(row.cols[0]).toBeCellOfWidth(12);
      }
    });
  });
});
