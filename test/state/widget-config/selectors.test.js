import { getWidgetConfigFrameName } from 'state/widget-config/selectors';

import { getSelectedPageModel } from 'state/page-models/selectors';
import { PAYLOAD as PAGE_MODEL } from 'test/mocks/page-models/complex';


jest.mock('state/page-models/selectors', () => ({
  getSelectedPageModel: jest.fn(),
}));

const FRAME_POS = '0';


describe('state/widget-config/selectors', () => {
  describe('if there is a selected page model and a framePos route parameter', () => {
    beforeEach(() => {
      getSelectedPageModel.mockReturnValue(PAGE_MODEL);
    });

    it('getWidgetConfigFrameName(state) returns the frame name', () => {
      const result = getWidgetConfigFrameName(FRAME_POS)({});
      expect(result).toBe(PAGE_MODEL.configuration.frames[0].descr);
    });
  });

  describe('if there no framePos route parameter', () => {
    beforeEach(() => {
      getSelectedPageModel.mockReturnValue(PAGE_MODEL);
    });

    it('getWidgetConfigFrameName(state) returns empty string', () => {
      const result = getWidgetConfigFrameName(null)({});
      expect(result).toBe('');
    });
  });

  describe('if there no selected page model', () => {
    beforeEach(() => {
      getSelectedPageModel.mockReturnValue(null);
    });

    it('getWidgetConfigFrameName(state) returns empty string', () => {
      const result = getWidgetConfigFrameName(FRAME_POS)({});
      expect(result).toBe('');
    });
  });
});
