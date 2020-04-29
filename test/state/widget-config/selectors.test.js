import { makeGetWidgetConfigFrameName } from 'state/widget-config/selectors';

import { getSelectedPageTemplate } from 'state/page-templates/selectors';
import { PAYLOAD as PAGE_TEMPLATE } from 'test/mocks/page-templates/complex';


jest.mock('state/page-templates/selectors', () => ({
  getSelectedPageTemplate: jest.fn(),
}));

const FRAME_POS = '0';


describe('state/widget-config/selectors', () => {
  describe('if there is a selected page template and a framePos route parameter', () => {
    beforeEach(() => {
      getSelectedPageTemplate.mockReturnValue(PAGE_TEMPLATE);
    });

    it('makeGetWidgetConfigFrameName(frame)(state) returns the frame name', () => {
      const result = makeGetWidgetConfigFrameName(FRAME_POS)({});
      expect(result).toBe(PAGE_TEMPLATE.configuration.frames[0].descr);
    });
  });

  describe('if there no framePos route parameter', () => {
    beforeEach(() => {
      getSelectedPageTemplate.mockReturnValue(PAGE_TEMPLATE);
    });

    it('makeGetWidgetConfigFrameName(frame)(state) returns empty string', () => {
      const result = makeGetWidgetConfigFrameName(null)({});
      expect(result).toBe('');
    });
  });

  describe('if there no selected page template', () => {
    beforeEach(() => {
      getSelectedPageTemplate.mockReturnValue(null);
    });

    it('makeGetWidgetConfigFrameName(frame)(state) returns empty string', () => {
      const result = makeGetWidgetConfigFrameName(FRAME_POS)({});
      expect(result).toBe('');
    });
  });
});
