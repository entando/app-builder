import { generateMfeRoutes } from 'helpers/urlUtils';
import { LIST_MFE_RESPONSE_OK } from 'test/mocks/mfe';

describe('Verify corectness of mfe routes generation', () => {
  it('should generate correct routes for mfe if id is not available', () => {
    const mfe = LIST_MFE_RESPONSE_OK[2];
    expect(generateMfeRoutes([mfe])).toEqual([
      { route: '/strapi/strapi-bundle/', id: 'id-strapi-strapi-bundle - /' }]);
  });

  it('should generate correct routes for mfe if id is available', () => {
    const mfe = { ...LIST_MFE_RESPONSE_OK[2], id: '1' };
    expect(generateMfeRoutes([mfe])).toEqual([
      { route: '/strapi/strapi-bundle/', id: '1' }]);
  });

  it('should return empty array if no paths available inside mfe object', () => {
    const mfe = LIST_MFE_RESPONSE_OK[0];
    expect(generateMfeRoutes([mfe])).toEqual([]);
  });
});
