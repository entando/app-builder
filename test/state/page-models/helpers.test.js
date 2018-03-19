import { cloneDeep } from 'lodash';

import { validatePageModel } from 'state/page-models/helpers';

import { PAYLOAD as COMPLEX_PAYLOAD } from 'test/mocks/page-models/complex';
import { PAYLOAD as MISSING_SKETCH_PAYLOAD } from 'test/mocks/page-models/missingSketch';
import { PAYLOAD as OVERLAPPING_FRAMES_PAYLOAD } from 'test/mocks/page-models/overlappingFrames';
import { PAYLOAD as WRONG_POS_PAYLOAD } from 'test/mocks/page-models/wrongPos';
import { PAYLOAD as SINGLE_CELL_PAYLOAD } from 'test/mocks/page-models/singleCell';

const buildSingleCellPageModel = (sketch) => {
  const altered = cloneDeep(SINGLE_CELL_PAYLOAD);
  altered.configuration.frames[0].sketch =
    Object.assign(altered.configuration.frames[0].sketch, sketch);
  return altered;
};


describe('state/page-config/helpers', () => {
  describe('validatePageModel()', () => {
    it('returns no errors when validating a valid page model', () => {
      const errors = validatePageModel(COMPLEX_PAYLOAD);
      expect(errors).toEqual([]);
    });

    it('returns no errors when validating a page model with missing sketch', () => {
      const errors = validatePageModel(MISSING_SKETCH_PAYLOAD);
      expect(errors).toEqual([]);
    });

    it('returns errors when validating a page model with overlapping frames', () => {
      const errors = validatePageModel(OVERLAPPING_FRAMES_PAYLOAD);
      expect(errors.length).toBe(1);
    });

    it('returns errors when validating a page model with frame.pos != frame index', () => {
      const errors = validatePageModel(WRONG_POS_PAYLOAD);
      expect(errors.length).toBe(1);
    });

    it('returns an error if sketch.x1 < 0', () => {
      const PAGE_MODEL = buildSingleCellPageModel({ x1: -2 });
      const errors = validatePageModel(PAGE_MODEL);
      expect(errors.length).toBe(1);
      expect(errors[0].id).toBe('pageModel.error.sketchX1X2format');
    });

    it('returns an error if sketch.x1 > 11', () => {
      const PAGE_MODEL = buildSingleCellPageModel({ x1: 12 });
      const errors = validatePageModel(PAGE_MODEL);
      expect(errors.length).toBe(1);
      expect(errors[0].id).toBe('pageModel.error.sketchX1X2format');
    });

    it('returns an error if sketch.x1 is not an integer', () => {
      const PAGE_MODEL = buildSingleCellPageModel({ x1: 0.5 });
      const errors = validatePageModel(PAGE_MODEL);
      expect(errors.length).toBe(1);
      expect(errors[0].id).toBe('pageModel.error.sketchX1X2format');
    });

    it('returns an error when validating a page model with sketch.x2 < 0', () => {
      const PAGE_MODEL = buildSingleCellPageModel({ x2: -2 });
      const errors = validatePageModel(PAGE_MODEL);
      expect(errors.length).toBe(1);
      expect(errors[0].id).toBe('pageModel.error.sketchX1X2format');
    });

    it('returns an error if sketch.x2 > 11', () => {
      const PAGE_MODEL = buildSingleCellPageModel({ x2: 12 });
      const errors = validatePageModel(PAGE_MODEL);
      expect(errors.length).toBe(1);
      expect(errors[0].id).toBe('pageModel.error.sketchX1X2format');
    });

    it('returns an error if sketch.x2 is not an integer', () => {
      const PAGE_MODEL = buildSingleCellPageModel({ x2: 0.5 });
      const errors = validatePageModel(PAGE_MODEL);
      expect(errors.length).toBe(1);
      expect(errors[0].id).toBe('pageModel.error.sketchX1X2format');
    });

    it('returns an error if sketch.x1 > sketch.x2', () => {
      const PAGE_MODEL = buildSingleCellPageModel({ x1: 6, x2: 5 });
      const errors = validatePageModel(PAGE_MODEL);
      expect(errors.length).toBe(1);
      expect(errors[0].id).toBe('pageModel.error.sketchX1X2format');
    });

    it('returns an error if sketch.y1 < 0', () => {
      const PAGE_MODEL = buildSingleCellPageModel({ y1: -2 });
      const errors = validatePageModel(PAGE_MODEL);
      expect(errors.length).toBe(1);
      expect(errors[0].id).toBe('pageModel.error.sketchY1Y2format');
    });

    it('returns an error if sketch.y1 is not an integer', () => {
      const PAGE_MODEL = buildSingleCellPageModel({ y1: 0.5 });
      const errors = validatePageModel(PAGE_MODEL);
      expect(errors.length).toBe(1);
      expect(errors[0].id).toBe('pageModel.error.sketchY1Y2format');
    });

    it('returns an error when validating a page model with sketch.y2 < 0', () => {
      const PAGE_MODEL = buildSingleCellPageModel({ y2: -2 });
      const errors = validatePageModel(PAGE_MODEL);
      expect(errors.length).toBe(1);
      expect(errors[0].id).toBe('pageModel.error.sketchY1Y2format');
    });

    it('returns an error if sketch.y2 is not an integer', () => {
      const PAGE_MODEL = buildSingleCellPageModel({ y2: 0.5 });
      const errors = validatePageModel(PAGE_MODEL);
      expect(errors.length).toBe(1);
      expect(errors[0].id).toBe('pageModel.error.sketchY1Y2format');
    });

    it('returns an error if sketch.y1 > sketch.y2', () => {
      const PAGE_MODEL = buildSingleCellPageModel({ y1: 6, y2: 5 });
      const errors = validatePageModel(PAGE_MODEL);
      expect(errors.length).toBe(1);
      expect(errors[0].id).toBe('pageModel.error.sketchY1Y2format');
    });
  });
});
