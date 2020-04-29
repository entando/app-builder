import 'test/enzyme-init';
import { makeRequest, METHODS } from '@entando/apimanager';
import { getPageTemplates, getPageTemplate, postPageTemplate, putPageTemplate, getPageReferences } from 'api/pageTemplates';


const PAGE_TEMPLATE_CODE = 'some_code';
const PAGE_TEMPLATE = {
  code: PAGE_TEMPLATE_CODE,
};


jest.unmock('api/pageTemplates');

jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: require.requireActual('@entando/apimanager').METHODS,
}));

beforeEach(jest.clearAllMocks);
describe('api/pageTemplates', () => {
  describe('getPageTemplates()', () => {
    it('returns a promise', () => {
      expect(getPageTemplates()).toBeInstanceOf(Promise);
    });

    it('has default paging', () => {
      getPageTemplates();
      expect(makeRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          uri: '/api/pageModels',
          method: METHODS.GET,
          useAuthentication: true,
        }),
        {
          page: 1,
          pageSize: 10,
        },
      );
    });

    it('resolves with a paged page templates list', () => {
      getPageTemplates({ page: 2, pageSize: 20 });
      expect(makeRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          uri: '/api/pageModels',
          method: METHODS.GET,
          useAuthentication: true,
        }),
        {
          page: 2,
          pageSize: 20,
        },
      );
    });
  });

  describe('getPageTemplate()', () => {
    it('returns a promise', () => {
      expect(getPageTemplate()).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      getPageTemplate(PAGE_TEMPLATE_CODE);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: `/api/pageModels/${PAGE_TEMPLATE_CODE}`,
        method: METHODS.GET,
        useAuthentication: true,
      }));
    });
  });

  describe('postPageTemplate()', () => {
    it('returns a promise', () => {
      expect(postPageTemplate(PAGE_TEMPLATE)).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      postPageTemplate(PAGE_TEMPLATE);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: '/api/pageModels',
        method: METHODS.POST,
        useAuthentication: true,
        body: PAGE_TEMPLATE,
      }));
    });
  });

  describe('putPageTemplate()', () => {
    it('returns a promise', () => {
      expect(putPageTemplate(PAGE_TEMPLATE)).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      putPageTemplate(PAGE_TEMPLATE);
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        uri: `/api/pageModels/${PAGE_TEMPLATE_CODE}`,
        method: METHODS.PUT,
        useAuthentication: true,
        body: PAGE_TEMPLATE,
      }));
    });
  });

  describe('getPageReferences()', () => {
    it('returns a promise', () => {
      expect(getPageReferences(PAGE_TEMPLATE)).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      getPageReferences(PAGE_TEMPLATE_CODE);
      expect(makeRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          uri: `/api/pageModels/${PAGE_TEMPLATE_CODE}/references/PageManager`,
          method: METHODS.GET,
          useAuthentication: true,
        }),
        {
          page: 1,
          pageSize: 10,
        },
      );
    });
  });
});
