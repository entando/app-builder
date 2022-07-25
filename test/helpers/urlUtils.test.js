import { generateMfeRoutes } from 'helpers/urlUtils';
import { LIST_MFE_RESPONSE_OK } from 'test/mocks/mfe';

describe('Verify corectness of mfe routes generation', () => {
  it('should generate correct routes for mfe if id is not available', () => {
    const mfe = LIST_MFE_RESPONSE_OK[6];
    expect(generateMfeRoutes([mfe])).toEqual([
      { route: '/example-mfe-4-code/', id: 'id-example-mfe-4-group-example-mfe-4-code-/-example-mfe-4-widget-code' }]);
  });

  it('should generate correct routes for mfe if id has spaces inside', () => {
    const mfe = LIST_MFE_RESPONSE_OK.find(item => item.id === 'example   mfe    2 with spaces');
    expect(generateMfeRoutes([mfe])).toEqual([
      { route: '/example-mfe-2/', id: 'example-mfe-2-with-spaces' }]);
  });

  it('should generate correct routes for mfe if id is available', () => {
    const mfe = LIST_MFE_RESPONSE_OK.find(item => !!item.id);
    expect(generateMfeRoutes([mfe])).toEqual([
      { route: '/layout-core-bundle-id/route1', id: '1a793414-d773-42ef-922e-00acafa43aa9' },
      { route: '/layout-core-bundle-id/route2', id: '1a793414-d773-42ef-922e-00acafa43aa9' }]);
  });

  it('should generate correct routes for mfe not depending if path starts with "/" or not', () => {
    const mfe = { ...LIST_MFE_RESPONSE_OK[0] };
    expect(generateMfeRoutes([mfe])).toEqual([
      { route: '/layout-core-bundle-id/route1', id: '1a793414-d773-42ef-922e-00acafa43aa9' },
      { route: '/layout-core-bundle-id/route2', id: '1a793414-d773-42ef-922e-00acafa43aa9' }]);
  });

  it('should return empty array if no paths available inside mfe object', () => {
    const mfe = LIST_MFE_RESPONSE_OK.find(item => !item.descriptorExt || !item.descriptorExt.paths);
    expect(generateMfeRoutes([mfe])).toEqual([]);
  });
});
