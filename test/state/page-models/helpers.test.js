
import { validatePageModel } from 'state/page-models/helpers';


import { PAYLOAD as COMPLEX_PAYLOAD } from 'test/mocks/page-models/complex';
import { PAYLOAD as MISSING_SKETCH_PAYLOAD } from 'test/mocks/page-models/missingSketch';
import { PAYLOAD as OVERLAPPING_FRAMES_PAYLOAD } from 'test/mocks/page-models/overlappingFrames';
import { PAYLOAD as WRONG_POS_PAYLOAD } from 'test/mocks/page-models/wrongPos';

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
      expect(errors.length).toBeGreaterThan(0);
    });

    it('returns errors when validating a page model with frame.pos != frame index', () => {
      const errors = validatePageModel(WRONG_POS_PAYLOAD);
      expect(errors.length).toBeGreaterThan(0);
    });
  });
});
