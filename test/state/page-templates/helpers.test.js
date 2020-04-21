import { cloneDeep } from 'lodash';

import { validatePageTemplate } from 'state/page-templates/helpers';

import { PAYLOAD as COMPLEX_PAYLOAD } from 'test/mocks/page-templates/complex';
import { PAYLOAD as MISSING_SKETCH_PAYLOAD } from 'test/mocks/page-templates/missingSketch';
import { PAYLOAD as OVERLAPPING_FRAMES_PAYLOAD } from 'test/mocks/page-templates/overlappingFrames';
import { PAYLOAD as WRONG_POS_PAYLOAD } from 'test/mocks/page-templates/wrongPos';
import { PAYLOAD as SINGLE_CELL_PAYLOAD } from 'test/mocks/page-templates/singleCell';

const buildSingleCellPageTemplate = (sketch) => {
  const altered = cloneDeep(SINGLE_CELL_PAYLOAD);
  altered.configuration.frames[0].sketch =
    Object.assign(altered.configuration.frames[0].sketch, sketch);
  return altered;
};


describe('state/page-config/helpers', () => {
  describe('validatePageTemplate()', () => {
    it('returns no errors when validating a valid page template', () => {
      const errors = validatePageTemplate(COMPLEX_PAYLOAD);
      expect(errors).toEqual([]);
    });

    it('returns no errors when validating a page template with missing sketch', () => {
      const errors = validatePageTemplate(MISSING_SKETCH_PAYLOAD);
      expect(errors).toEqual([]);
    });

    it('returns an error if the page template has no configuration', () => {
      const PAGE_TEMPLATE = buildSingleCellPageTemplate();
      delete PAGE_TEMPLATE.configuration;
      const errors = validatePageTemplate(PAGE_TEMPLATE);
      expect(errors.length).toBe(1);
      expect(errors[0].id).toBe('pageTemplate.error.configuration');
    });

    it('returns an error if the page template configuration is not an object', () => {
      const PAGE_TEMPLATE = buildSingleCellPageTemplate();
      PAGE_TEMPLATE.configuration = 66;
      const errors = validatePageTemplate(PAGE_TEMPLATE);
      expect(errors.length).toBe(1);
      expect(errors[0].id).toBe('pageTemplate.error.configuration');
    });

    it('returns an error if the page template has no configuration.frames', () => {
      const PAGE_TEMPLATE = buildSingleCellPageTemplate();
      delete PAGE_TEMPLATE.configuration.frames;
      const errors = validatePageTemplate(PAGE_TEMPLATE);
      expect(errors.length).toBe(1);
      expect(errors[0].id).toBe('pageTemplate.error.framesArray');
    });

    it('returns an error if configuration.frames is not an array', () => {
      const PAGE_TEMPLATE = buildSingleCellPageTemplate();
      PAGE_TEMPLATE.configuration.frames = {};
      const errors = validatePageTemplate(PAGE_TEMPLATE);
      expect(errors.length).toBe(1);
      expect(errors[0].id).toBe('pageTemplate.error.framesArray');
    });

    it('returns errors when validating a page template with overlapping frames', () => {
      const errors = validatePageTemplate(OVERLAPPING_FRAMES_PAYLOAD);
      expect(errors.length).toBe(1);
      expect(errors[0].id).toBe('pageTemplate.error.overlapping');
    });

    it('returns errors when validating a page template with frame.pos != frame index', () => {
      const errors = validatePageTemplate(WRONG_POS_PAYLOAD);
      expect(errors.length).toBe(1);
      expect(errors[0].id).toBe('pageTemplate.error.pos');
    });

    it('returns an error if sketch.x1 < 0', () => {
      const PAGE_TEMPLATE = buildSingleCellPageTemplate({ x1: -2 });
      const errors = validatePageTemplate(PAGE_TEMPLATE);
      expect(errors.length).toBe(1);
      expect(errors[0].id).toBe('pageTemplate.error.sketchX1X2format');
    });

    it('returns an error if sketch.x1 > 11', () => {
      const PAGE_TEMPLATE = buildSingleCellPageTemplate({ x1: 12 });
      const errors = validatePageTemplate(PAGE_TEMPLATE);
      expect(errors.length).toBe(1);
      expect(errors[0].id).toBe('pageTemplate.error.sketchX1X2format');
    });

    it('returns an error if sketch.x1 is not an integer', () => {
      const PAGE_TEMPLATE = buildSingleCellPageTemplate({ x1: 0.5 });
      const errors = validatePageTemplate(PAGE_TEMPLATE);
      expect(errors.length).toBe(1);
      expect(errors[0].id).toBe('pageTemplate.error.sketchX1X2format');
    });

    it('returns an error when validating a page template with sketch.x2 < 0', () => {
      const PAGE_TEMPLATE = buildSingleCellPageTemplate({ x2: -2 });
      const errors = validatePageTemplate(PAGE_TEMPLATE);
      expect(errors.length).toBe(1);
      expect(errors[0].id).toBe('pageTemplate.error.sketchX1X2format');
    });

    it('returns an error if sketch.x2 > 11', () => {
      const PAGE_TEMPLATE = buildSingleCellPageTemplate({ x2: 12 });
      const errors = validatePageTemplate(PAGE_TEMPLATE);
      expect(errors.length).toBe(1);
      expect(errors[0].id).toBe('pageTemplate.error.sketchX1X2format');
    });

    it('returns an error if sketch.x2 is not an integer', () => {
      const PAGE_TEMPLATE = buildSingleCellPageTemplate({ x2: 0.5 });
      const errors = validatePageTemplate(PAGE_TEMPLATE);
      expect(errors.length).toBe(1);
      expect(errors[0].id).toBe('pageTemplate.error.sketchX1X2format');
    });

    it('returns an error if sketch.x1 > sketch.x2', () => {
      const PAGE_TEMPLATE = buildSingleCellPageTemplate({ x1: 6, x2: 5 });
      const errors = validatePageTemplate(PAGE_TEMPLATE);
      expect(errors.length).toBe(1);
      expect(errors[0].id).toBe('pageTemplate.error.sketchX1X2format');
    });

    it('returns an error if sketch.y1 < 0', () => {
      const PAGE_TEMPLATE = buildSingleCellPageTemplate({ y1: -2 });
      const errors = validatePageTemplate(PAGE_TEMPLATE);
      expect(errors.length).toBe(1);
      expect(errors[0].id).toBe('pageTemplate.error.sketchY1Y2format');
    });

    it('returns an error if sketch.y1 is not an integer', () => {
      const PAGE_TEMPLATE = buildSingleCellPageTemplate({ y1: 0.5 });
      const errors = validatePageTemplate(PAGE_TEMPLATE);
      expect(errors.length).toBe(1);
      expect(errors[0].id).toBe('pageTemplate.error.sketchY1Y2format');
    });

    it('returns an error when validating a page template with sketch.y2 < 0', () => {
      const PAGE_TEMPLATE = buildSingleCellPageTemplate({ y2: -2 });
      const errors = validatePageTemplate(PAGE_TEMPLATE);
      expect(errors.length).toBe(1);
      expect(errors[0].id).toBe('pageTemplate.error.sketchY1Y2format');
    });

    it('returns an error if sketch.y2 is not an integer', () => {
      const PAGE_TEMPLATE = buildSingleCellPageTemplate({ y2: 0.5 });
      const errors = validatePageTemplate(PAGE_TEMPLATE);
      expect(errors.length).toBe(1);
      expect(errors[0].id).toBe('pageTemplate.error.sketchY1Y2format');
    });

    it('returns an error if sketch.y1 > sketch.y2', () => {
      const PAGE_TEMPLATE = buildSingleCellPageTemplate({ y1: 6, y2: 5 });
      const errors = validatePageTemplate(PAGE_TEMPLATE);
      expect(errors.length).toBe(1);
      expect(errors[0].id).toBe('pageTemplate.error.sketchY1Y2format');
    });
  });
});
