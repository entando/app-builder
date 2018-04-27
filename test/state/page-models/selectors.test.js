import { cloneDeep } from 'lodash';

import { getLocale } from 'state/locale/selectors';
import { getPageModelForm } from 'state/forms/selectors';
import {
  getPageModels, getPageModelsList, getSelectedPageModel, getSelectedPageModelDefaultConfig,
  getSelectedPageModelCellMap, getSelectedPageModelCanBeOnTheFly, getSelectedPageModelMainFrame,
  getPageModelsIdList, getPageModelsMap, getFormPageModel, getPageModelFormCellMap,
  getPageModelFormErrors, getSelectedPageModelPageRefs, getLocalizedPageModelPageRefs,
  getPageModelsTotal,
} from 'state/page-models/selectors';

import { PAGE_MODELS_LIST, PAGE_MODELS_MAP, PAGE_MODELS_ID_LIST, PAGE_REFS } from 'test/mocks/pageModels';
import { PAYLOAD as COMPLEX_PAYLOAD, CELL_MAP as COMPLEX_CELL_MAP } from 'test/mocks/page-models/complex';
import { PAYLOAD as SIDEBAR_HOLES_PAYLOAD, CELL_MAP as SIDEBAR_HOLES_CELL_MAP } from 'test/mocks/page-models/sidebarHoles';
import { PAYLOAD as SINGLE_CELL_PAYLOAD, CELL_MAP as SINGLE_CELL_CELL_MAP } from 'test/mocks/page-models/singleCell';
import { PAYLOAD as MISSING_SKETCH_PAYLOAD, CELL_MAP as MISSING_SKETCH_CELL_MAP } from 'test/mocks/page-models/missingSketch';
import { PAYLOAD as WRONG_POS_PAYLOAD, CELL_MAP as WRONG_POS_CELL_MAP } from 'test/mocks/page-models/wrongPos';
import { PAYLOAD as OVERLAPPING_FRAMES_PAYLOAD, CELL_MAP as OVERLAPPING_FRAMES_CELL_MAP } from 'test/mocks/page-models/overlappingFrames';


const STATE = {
  pageModels: {
    idList: PAGE_MODELS_ID_LIST,
    map: PAGE_MODELS_MAP,
    selected: COMPLEX_PAYLOAD,
    total: 0,
  },
};

const buildStateWithSelectedPageModel = pageModel => ({
  pageModels: {
    idList: PAGE_MODELS_ID_LIST,
    map: PAGE_MODELS_MAP,
    selected: pageModel,
  },
});

const toFormData = (pageModel) => {
  const formData = cloneDeep(pageModel);
  formData.configuration = JSON.stringify(formData.configuration);
  return formData;
};

jest.mock('state/locale/selectors', () => ({
  getLocale: jest.fn(),
}));

describe('state/page-models/selectors', () => {
  it('getPageModels returns the page models state', () => {
    expect(getPageModels(STATE)).toEqual(STATE.pageModels);
  });

  it('getPageModelsTotal returns the page models total state', () => {
    expect(getPageModelsTotal(STATE)).toEqual(STATE.pageModels.total);
  });

  it('getPageModelsIdList returns the page models list', () => {
    expect(getPageModelsIdList(STATE)).toEqual(PAGE_MODELS_ID_LIST);
  });

  it('getPageModelsMap returns the page models list', () => {
    expect(getPageModelsMap(STATE)).toEqual(PAGE_MODELS_MAP);
  });

  it('getPageModelsList returns the page models list', () => {
    expect(getPageModelsList(STATE)).toEqual(PAGE_MODELS_LIST);
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

  describe('getSelectedPageModelCanBeOnTheFly', () => {
    it('returns true if the selected page model can be on the fly', () => {
      const state = buildStateWithSelectedPageModel(COMPLEX_PAYLOAD);
      expect(getSelectedPageModelCanBeOnTheFly(state)).toBe(true);
    });

    it('returns false if the selected page model cannot be on the fly', () => {
      const state = buildStateWithSelectedPageModel(SINGLE_CELL_PAYLOAD);
      expect(getSelectedPageModelCanBeOnTheFly(state)).toBe(false);
    });

    it('returns false if there is no selected page model', () => {
      const state = buildStateWithSelectedPageModel(null);
      expect(getSelectedPageModelCanBeOnTheFly(state)).toBe(false);
    });
  });

  describe('getSelectedPageModelMainFrame', () => {
    it('returns the main frame object if the selected page model has a main frame', () => {
      const state = buildStateWithSelectedPageModel(COMPLEX_PAYLOAD);
      expect(getSelectedPageModelMainFrame(state)).toEqual(expect.objectContaining({
        descr: expect.any(String),
        pos: expect.any(Number),
        mainFrame: true,
      }));
    });

    it('returns null if the selected page model does not have a main frame', () => {
      const state = buildStateWithSelectedPageModel(SINGLE_CELL_PAYLOAD);
      expect(getSelectedPageModelMainFrame(state)).toBe(null);
    });

    it('returns null if there is no selected page model', () => {
      const state = buildStateWithSelectedPageModel(null);
      expect(getSelectedPageModelMainFrame(state)).toBe(null);
    });
  });

  describe('getSelectedPageModelDefaultConfig', () => {
    it('returns null if there is no selected page model', () => {
      const state = buildStateWithSelectedPageModel(null);
      expect(getSelectedPageModelDefaultConfig(state)).toBe(null);
    });

    it('returns a page config array containing null for frames with no default widget', () => {
      const state = buildStateWithSelectedPageModel(SINGLE_CELL_PAYLOAD);
      expect(getSelectedPageModelDefaultConfig(state)).toEqual([null]);
    });

    it('returns a page config array containing config items for frames with default widget', () => {
      const state = buildStateWithSelectedPageModel(COMPLEX_PAYLOAD);
      expect(getSelectedPageModelDefaultConfig(state)).toEqual(expect.arrayContaining([
        null,
        null,
        null,
        null,
        null,
        { type: 'login_form' },
      ]));
    });
  });

  describe('getFormPageModel', () => {
    it('if there is no page model form data, returns null', () => {
      getPageModelForm.mockReturnValue(null);
      expect(getFormPageModel({})).toEqual(null);
    });

    it('if configuration is not a valid json, returns a default configuration', () => {
      getPageModelForm.mockReturnValue({
        code: 'page_model',
        configuration: 'definitely not a valid json',
      });
      expect(getFormPageModel({})).toEqual({
        code: 'page_model',
        configuration: { frames: [] },
      });
    });

    it('if configuration is a valid json, returns the parsed configuration', () => {
      getPageModelForm.mockReturnValue({
        code: 'page_model',
        configuration: '{ "frames": [{ "pos": 0 }] }',
      });
      expect(getFormPageModel({})).toEqual({
        code: 'page_model',
        configuration: { frames: [{ pos: 0 }] },
      });
    });
  });

  describe('getPageModelFormCellMap', () => {
    it('returns a cell map from the form page model', () => {
      getPageModelForm.mockReturnValue(toFormData(SINGLE_CELL_PAYLOAD));
      expect(getPageModelFormCellMap({})).toEqual(SINGLE_CELL_CELL_MAP);
    });
  });

  describe('getPageModelFormErrors', () => {
    it('if there are no errors, returns an empty array', () => {
      getPageModelForm.mockReturnValue(toFormData(SINGLE_CELL_PAYLOAD));
      expect(getPageModelFormErrors({})).toEqual([]);
    });

    it('if there are errors, returns the page model errors', () => {
      getPageModelForm.mockReturnValue(toFormData(OVERLAPPING_FRAMES_PAYLOAD));
      expect(getPageModelFormErrors({})).toHaveLength(1);
    });
  });

  describe('getPageModelFormCellMap', () => {
    it('returns a cell map from the form page model', () => {
      getPageModelForm.mockReturnValue(toFormData(SINGLE_CELL_PAYLOAD));
      expect(getPageModelFormCellMap({})).toEqual(SINGLE_CELL_CELL_MAP);
    });
  });

  describe('getSelectedPageModelPageRefs', () => {
    it('returns the selected page model pageReferences', () => {
      const state = buildStateWithSelectedPageModel({
        ...COMPLEX_PAYLOAD,
        pageReferences: PAGE_REFS,
      });
      expect(getSelectedPageModelPageRefs(state)).toEqual(PAGE_REFS);
    });
  });

  describe('getLocalizedPageModelPageRefs', () => {
    it('returns the selected page model pageReferences', () => {
      const state = buildStateWithSelectedPageModel({
        ...COMPLEX_PAYLOAD,
        pageReferences: PAGE_REFS,
      });
      getLocale.mockReturnValue('en');
      const localizedRefs = getLocalizedPageModelPageRefs(state);
      expect(localizedRefs).toHaveLength(PAGE_REFS.length);
      localizedRefs.forEach((ref, i) => {
        expect(ref.title).toBe(PAGE_REFS[i].titles.en);
        expect(ref.fullTitle).toBe(PAGE_REFS[i].fullTitles.en);
      });
    });
  });
});
