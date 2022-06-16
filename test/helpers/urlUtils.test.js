import { generateMfeRoutes } from 'helpers/urlUtils';
import { LIST_MFE_RESPONSE_OK } from 'test/mocks/mfe';

describe('Verify corectness of mfe routes generation', () => {
  it('should generate correct routes for mfe if id is not available', () => {
    const mfe = LIST_MFE_RESPONSE_OK[3];
    expect(generateMfeRoutes([mfe])).toEqual([
      { route: '/strapi/strapi-bundle/', id: 'id-strapi-strapi-bundle-/' }]);
  });

  it('should generate correct routes for mfe if id has spaces inside', () => {
    const mfe = LIST_MFE_RESPONSE_OK[5];
    expect(generateMfeRoutes([mfe])).toEqual([
      { route: '/example-mfe-2/example-mfe-2/', id: 'example-mfe-2-with-spaces' }]);
  });

  it('should generate correct routes for mfe if id is available', () => {
    const mfe = { ...LIST_MFE_RESPONSE_OK[3], id: '1' };
    expect(generateMfeRoutes([mfe])).toEqual([
      { route: '/strapi/strapi-bundle/', id: '1' }]);
  });

  it('should generate correct routes for mfe not depending if path starts with "/" or not', () => {
    const mfe = { ...LIST_MFE_RESPONSE_OK[2] };
    expect(generateMfeRoutes([mfe])).toEqual([
      { route: '/entando-ab-core/entando-ab-core-navigation/route1', id: 'layout-core-bundle:app-builder-menu' },
      { route: '/entando-ab-core/entando-ab-core-navigation/route2', id: 'layout-core-bundle:app-builder-menu' }]);
  });

  it('should return empty array if no paths available inside mfe object', () => {
    const mfe = LIST_MFE_RESPONSE_OK[0];
    expect(generateMfeRoutes([mfe])).toEqual([]);
  });
});
