import { cloneDeep } from 'lodash';

import { getLocale } from 'state/locale/selectors';
import { getPageTemplateForm } from 'state/forms/selectors';
import {
  getPageTemplates, getPageTemplatesList, getSelectedPageTemplate, getSelectedPageTemplateDefaultConfig,
  getSelectedPageTemplateCellMap, getSelectedPageTemplateCanBeOnTheFly, getSelectedPageTemplateMainFrame,
  getPageTemplatesIdList, getPageTemplatesMap, getFormPageTemplate, getPageTemplateFormCellMap,
  getPageTemplateFormErrors, getSelectedPageTemplatePageRefs, getLocalizedPageTemplatePageRefs,
  getPageTemplatesTotal,
} from 'state/page-templates/selectors';

import { PAGE_TEMPLATES_LIST, PAGE_TEMPLATES_MAP, PAGE_TEMPLATES_ID_LIST, PAGE_REFS } from 'test/mocks/pageTemplates';
import { PAYLOAD as COMPLEX_PAYLOAD, CELL_MAP as COMPLEX_CELL_MAP } from 'test/mocks/page-templates/complex';
import { PAYLOAD as SIDEBAR_HOLES_PAYLOAD, CELL_MAP as SIDEBAR_HOLES_CELL_MAP } from 'test/mocks/page-templates/sidebarHoles';
import { PAYLOAD as SINGLE_CELL_PAYLOAD, CELL_MAP as SINGLE_CELL_CELL_MAP } from 'test/mocks/page-templates/singleCell';
import { PAYLOAD as MISSING_SKETCH_PAYLOAD, CELL_MAP as MISSING_SKETCH_CELL_MAP } from 'test/mocks/page-templates/missingSketch';
import { PAYLOAD as WRONG_POS_PAYLOAD, CELL_MAP as WRONG_POS_CELL_MAP } from 'test/mocks/page-templates/wrongPos';
import { PAYLOAD as OVERLAPPING_FRAMES_PAYLOAD, CELL_MAP as OVERLAPPING_FRAMES_CELL_MAP } from 'test/mocks/page-templates/overlappingFrames';


const STATE = {
  pageTemplates: {
    idList: PAGE_TEMPLATES_ID_LIST,
    map: PAGE_TEMPLATES_MAP,
    selected: COMPLEX_PAYLOAD,
    total: 0,
  },
};

const buildStateWithSelectedPageTemplate = pageTemplate => ({
  pageTemplates: {
    idList: PAGE_TEMPLATES_ID_LIST,
    map: PAGE_TEMPLATES_MAP,
    selected: pageTemplate,
  },
});

const toFormData = (pageTemplate) => {
  const formData = cloneDeep(pageTemplate);
  formData.configuration = JSON.stringify(formData.configuration);
  return formData;
};

jest.mock('state/locale/selectors', () => ({
  getLocale: jest.fn(),
}));

describe('state/page-templates/selectors', () => {
  it('getPageTemplates returns the page templates state', () => {
    expect(getPageTemplates(STATE)).toEqual(STATE.pageTemplates);
  });

  it('getPageTemplatesTotal returns the page templates total state', () => {
    expect(getPageTemplatesTotal(STATE)).toEqual(STATE.pageTemplates.total);
  });

  it('getPageTemplatesIdList returns the page templates list', () => {
    expect(getPageTemplatesIdList(STATE)).toEqual(PAGE_TEMPLATES_ID_LIST);
  });

  it('getPageTemplatesMap returns the page templates list', () => {
    expect(getPageTemplatesMap(STATE)).toEqual(PAGE_TEMPLATES_MAP);
  });

  it('getPageTemplatesList returns the page templates list', () => {
    expect(getPageTemplatesList(STATE)).toEqual(PAGE_TEMPLATES_LIST);
  });

  it('getSelectedPageTemplate returns the selected page templates', () => {
    expect(getSelectedPageTemplate(STATE)).toEqual(COMPLEX_PAYLOAD);
  });

  describe('getSelectedPageTemplateCellMap', () => {
    it('with COMPLEX page template', () => {
      const state = buildStateWithSelectedPageTemplate(COMPLEX_PAYLOAD);
      expect(getSelectedPageTemplateCellMap(state)).toEqual(COMPLEX_CELL_MAP);
    });

    it('with SIDEBAR_HOLES page template', () => {
      const state = buildStateWithSelectedPageTemplate(SIDEBAR_HOLES_PAYLOAD);
      expect(getSelectedPageTemplateCellMap(state)).toEqual(SIDEBAR_HOLES_CELL_MAP);
    });

    it('with SINGLE_CELL page template', () => {
      const state = buildStateWithSelectedPageTemplate(SINGLE_CELL_PAYLOAD);
      expect(getSelectedPageTemplateCellMap(state)).toEqual(SINGLE_CELL_CELL_MAP);
    });

    it('with MISSING_SKETCH page template', () => {
      const state = buildStateWithSelectedPageTemplate(MISSING_SKETCH_PAYLOAD);
      expect(getSelectedPageTemplateCellMap(state)).toEqual(MISSING_SKETCH_CELL_MAP);
    });

    it('with WRONG_POS page template', () => {
      const state = buildStateWithSelectedPageTemplate(WRONG_POS_PAYLOAD);
      expect(getSelectedPageTemplateCellMap(state)).toEqual(WRONG_POS_CELL_MAP);
    });

    it('with OVERLAPPING_FRAMES page template', () => {
      const state = buildStateWithSelectedPageTemplate(OVERLAPPING_FRAMES_PAYLOAD);
      expect(getSelectedPageTemplateCellMap(state)).toEqual(OVERLAPPING_FRAMES_CELL_MAP);
    });

    it('with no page template', () => {
      const state = buildStateWithSelectedPageTemplate();
      expect(getSelectedPageTemplateCellMap(state)).toEqual(null);
    });
  });

  describe('getSelectedPageTemplateCanBeOnTheFly', () => {
    it('returns true if the selected page template can be on the fly', () => {
      const state = buildStateWithSelectedPageTemplate(COMPLEX_PAYLOAD);
      expect(getSelectedPageTemplateCanBeOnTheFly(state)).toBe(true);
    });

    it('returns false if the selected page template cannot be on the fly', () => {
      const state = buildStateWithSelectedPageTemplate(SINGLE_CELL_PAYLOAD);
      expect(getSelectedPageTemplateCanBeOnTheFly(state)).toBe(false);
    });

    it('returns false if there is no selected page template', () => {
      const state = buildStateWithSelectedPageTemplate(null);
      expect(getSelectedPageTemplateCanBeOnTheFly(state)).toBe(false);
    });
  });

  describe('getSelectedPageTemplateMainFrame', () => {
    it('returns the main frame object if the selected page template has a main frame', () => {
      const state = buildStateWithSelectedPageTemplate(COMPLEX_PAYLOAD);
      expect(getSelectedPageTemplateMainFrame(state)).toEqual(expect.objectContaining({
        descr: expect.any(String),
        pos: expect.any(Number),
        mainFrame: true,
      }));
    });

    it('returns null if the selected page template does not have a main frame', () => {
      const state = buildStateWithSelectedPageTemplate(SINGLE_CELL_PAYLOAD);
      expect(getSelectedPageTemplateMainFrame(state)).toBe(null);
    });

    it('returns null if there is no selected page template', () => {
      const state = buildStateWithSelectedPageTemplate(null);
      expect(getSelectedPageTemplateMainFrame(state)).toBe(null);
    });
  });

  describe('getSelectedPageTemplateDefaultConfig', () => {
    it('returns null if there is no selected page template', () => {
      const state = buildStateWithSelectedPageTemplate(null);
      expect(getSelectedPageTemplateDefaultConfig(state)).toBe(null);
    });

    it('returns a page config array containing null for frames with no default widget', () => {
      const state = buildStateWithSelectedPageTemplate(SINGLE_CELL_PAYLOAD);
      expect(getSelectedPageTemplateDefaultConfig(state)).toEqual([null]);
    });

    it('returns a page config array containing config items for frames with default widget', () => {
      const state = buildStateWithSelectedPageTemplate(COMPLEX_PAYLOAD);
      expect(getSelectedPageTemplateDefaultConfig(state)).toEqual(expect.arrayContaining([
        null,
        null,
        null,
        null,
        null,
        { type: 'login_form' },
      ]));
    });
  });

  describe('getFormPageTemplate', () => {
    it('if there is no page template form data, returns null', () => {
      getPageTemplateForm.mockReturnValue(null);
      expect(getFormPageTemplate({})).toEqual(null);
    });

    it('if configuration is not a valid json, returns a default configuration', () => {
      getPageTemplateForm.mockReturnValue({
        code: 'page_model',
        configuration: 'definitely not a valid json',
      });
      expect(getFormPageTemplate({})).toEqual({
        code: 'page_model',
        configuration: { frames: [] },
      });
    });

    it('if configuration is a valid json, returns the parsed configuration', () => {
      getPageTemplateForm.mockReturnValue({
        code: 'page_model',
        configuration: '{ "frames": [{ "pos": 0 }] }',
      });
      expect(getFormPageTemplate({})).toEqual({
        code: 'page_model',
        configuration: { frames: [{ pos: 0 }] },
      });
    });
  });

  describe('getPageTemplateFormCellMap', () => {
    it('returns a cell map from the form page template', () => {
      getPageTemplateForm.mockReturnValue(toFormData(SINGLE_CELL_PAYLOAD));
      expect(getPageTemplateFormCellMap({})).toEqual(SINGLE_CELL_CELL_MAP);
    });
  });

  describe('getPageTemplateFormErrors', () => {
    it('if there are no errors, returns an empty array', () => {
      getPageTemplateForm.mockReturnValue(toFormData(SINGLE_CELL_PAYLOAD));
      expect(getPageTemplateFormErrors({})).toEqual([]);
    });

    it('if there are errors, returns the page template errors', () => {
      getPageTemplateForm.mockReturnValue(toFormData(OVERLAPPING_FRAMES_PAYLOAD));
      expect(getPageTemplateFormErrors({})).toHaveLength(1);
    });
  });

  describe('getPageTemplateFormCellMap', () => {
    it('returns a cell map from the form page template', () => {
      getPageTemplateForm.mockReturnValue(toFormData(SINGLE_CELL_PAYLOAD));
      expect(getPageTemplateFormCellMap({})).toEqual(SINGLE_CELL_CELL_MAP);
    });
  });

  describe('getSelectedPageTemplatePageRefs', () => {
    it('returns the selected page template pageReferences', () => {
      const state = buildStateWithSelectedPageTemplate({
        ...COMPLEX_PAYLOAD,
        pageReferences: PAGE_REFS,
      });
      expect(getSelectedPageTemplatePageRefs(state)).toEqual(PAGE_REFS);
    });
  });

  describe('getLocalizedPageTemplatePageRefs', () => {
    it('returns the selected page template pageReferences', () => {
      const state = buildStateWithSelectedPageTemplate({
        ...COMPLEX_PAYLOAD,
        pageReferences: PAGE_REFS,
      });
      getLocale.mockReturnValue('en');
      const localizedRefs = getLocalizedPageTemplatePageRefs(state);
      expect(localizedRefs).toHaveLength(PAGE_REFS.length);
      localizedRefs.forEach((ref, i) => {
        expect(ref.title).toBe(PAGE_REFS[i].titles.en);
        expect(ref.fullTitle).toBe(PAGE_REFS[i].fullTitles.en);
      });
    });
  });
});
