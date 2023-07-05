import { useSelector } from 'react-redux';
import { selectCurrentTenant } from 'state/multi-tenancy/selectors';
import { useDynamicResourceUrl, generateStaticAssetsUrl } from 'hooks/useDynamicResourceUrl';


// Mocking useSelector from react-redux
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

// Mocking generateStaticAssetsUrl function
jest.mock('hooks/useDynamicResourceUrl', () => {
  const originalModule = jest.requireActual('hooks/useDynamicResourceUrl');
  return {
    ...originalModule,
    generateStaticAssetsUrl: jest.fn(),
  };
});

describe('useDynamicResourceUrl', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the result of generateStaticAssetsUrl', () => {
    const mockedTenant = { resourceRootUrl: 'https://example.com' };
    useSelector.mockImplementation(selector => (selector ===
      selectCurrentTenant ? mockedTenant : {}));
    const resource = 'sampleResource.png';
    const expectedResult = 'https://example.com/sampleResource.png';
    generateStaticAssetsUrl.mockReturnValue(expectedResult);

    const result = useDynamicResourceUrl(resource);

    expect(result).toEqual(expectedResult);
  });
});
