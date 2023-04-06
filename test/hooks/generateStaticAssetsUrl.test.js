import { generateStaticAssetsUrl } from 'hooks/useDynamicResourceUrl';
import { getDomain } from 'helpers/resourcePath';

// Mock the getDomain function

jest.mock('helpers/resourcePath', () => ({
  getDomain: jest.fn(),
}));

describe('generateStaticAssetsUrl', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
    getDomain.mockReturnValue('https://example.com');
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('should return local resource when USE_LOCAL_MFE is set', () => {
    process.env.USE_LOCAL_MFE = 'true';
    const tenant = {};
    const resource = 'test-resource';
    const result = generateStaticAssetsUrl({ tenant, resource });

    expect(result).toBe(resource);
  });

  it('should return remote resource when USE_REMOTE_MFE is set', () => {
    process.env.USE_REMOTE_MFE = 'true';
    const tenant = {};
    const resource = 'test-resource';
    const result = generateStaticAssetsUrl({ tenant, resource });

    expect(result).toBe(`${getDomain()}/cmsresources/${resource}`);
  });

  it('should return resourceUrl when resourceRootUrl is provided', () => {
    const tenant = {
      resourceRootUrl: 'https://resource.example.com',
    };
    const resource = 'test-resource';
    const result = generateStaticAssetsUrl({ tenant, resource });

    expect(result).toBe(`${tenant.resourceRootUrl}/${resource}`);
  });

  it('should return resourcePath when resourceRootPath is provided', () => {
    const tenant = {
      resourceRootPath: '/entando-de-app',
    };
    const resource = 'test-resource';
    const result = generateStaticAssetsUrl({ tenant, resource });

    expect(result).toBe(`${tenant.resourceRootPath}${resource}`);
  });

  it('should return production cmsresources URL when NODE_ENV is set to production', () => {
    process.env.NODE_ENV = 'production';
    const tenant = {};
    const resource = 'test-resource';
    const result = generateStaticAssetsUrl({ tenant, resource });

    expect(result).toBe(`${getDomain()}/cmsresources/${resource}`);
  });

  it('should return local resources URL when NODE_ENV is not set to production', () => {
    process.env.NODE_ENV = 'development';
    const tenant = {};
    const resource = 'test-resource';
    const result = generateStaticAssetsUrl({ tenant, resource });

    expect(result).toBe(`${getDomain()}/resources/${resource}`);
  });
});
