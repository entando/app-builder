import { buildResponse, buildErrorResponse } from 'api/responseFactory';

const createList = size => new Array(size).fill(1).map((item, index) => ({ data: index + 1 }));

describe('responseFactory', () => {
  describe('buildRespnse', () => {
    it('returns an empty object if mockResponse is not of type object', () => {
      const response = buildResponse(12);
      expect(typeof response).toEqual('object');
      expect(response).toHaveProperty('payload', {});
      expect(response).toHaveProperty('errors', []);
      expect(response).toHaveProperty('metaData', {});
    });

    it('has a payload', () => {
      const data = { data: 1, title: 'string' };
      const response = buildResponse(data);
      expect(typeof response).toEqual('object');
      expect(response).toHaveProperty('payload', data);
      expect(response).toHaveProperty('errors', []);
      expect(response).toHaveProperty('metaData', {});
    });

    it('has a metadata', () => {
      const response = buildResponse({});
      expect(typeof response).toEqual('object');
      expect(response).toHaveProperty('metaData', {});
    });

    describe('page argument validation', () => {
      it('throws an error if page is not an object', () => {
        const badCall = () => { buildResponse({}, true); };
        expect(badCall).toThrowError('invalid page object');
      });

      describe('page.page throws', () => {
        it('is missing', () => {
          const badCall = () => { buildResponse({}, { pageSize: 1 }); };
          expect(badCall).toThrowError('invalid page object');
        });

        it('is not numeric', () => {
          const badCall = () => { buildResponse({}, { page: true, pageSize: 1 }); };
          expect(badCall).toThrowError('invalid page object');
        });

        it('is not an integer', () => {
          const badCall = () => { buildResponse({}, { page: 2.3, pageSize: 1 }); };
          expect(badCall).toThrowError('invalid page object');
        });

        it('is less then 1', () => {
          const badCall = () => { buildResponse({}, { page: 0, pageSize: 1 }); };
          expect(badCall).toThrowError('invalid page object');
        });
      });

      describe('page.pageSize throws', () => {
        it('is missing', () => {
          const badCall = () => { buildResponse({}, { page: 1 }); };
          expect(badCall).toThrowError('invalid page object');
        });

        it('is not numeric', () => {
          const badCall = () => { buildResponse({}, { page: 1, pageSize: true }); };
          expect(badCall).toThrowError('invalid page object');
        });

        it('is not an integer', () => {
          const badCall = () => { buildResponse({}, { page: 1, pageSize: 2.3 }); };
          expect(badCall).toThrowError('invalid page object');
        });

        it('is less then 0', () => {
          const badCall = () => { buildResponse({}, { page: 1, pageSize: -1 }); };
          expect(badCall).toThrowError('invalid page object');
        });
      });
    });

    describe('lists handling', () => {
      it('returns paginated data', () => {
        const data = createList(20);
        const response = buildResponse(data);
        expect(typeof response).toEqual('object');
        expect(response).toHaveProperty('payload', [
          { data: 1 },
          { data: 2 },
          { data: 3 },
          { data: 4 },
          { data: 5 },
          { data: 6 },
          { data: 7 },
          { data: 8 },
          { data: 9 },
          { data: 10 },
        ]);
        expect(response).toHaveProperty('metaData', {
          page: 1,
          pageSize: 10,
          totalItems: 20,
          lastPage: 2,
        });
      });

      it('can return different page sizes', () => {
        const data = createList(20);
        const response = buildResponse(data, { page: 1, pageSize: 2 });
        expect(typeof response).toEqual('object');
        expect(response).toHaveProperty('payload', [
          { data: 1 },
          { data: 2 },
        ]);
        expect(response).toHaveProperty('metaData', {
          page: 1,
          pageSize: 2,
          totalItems: 20,
          lastPage: 10,
        });
      });

      it('can return a different page', () => {
        const data = createList(20);
        const response = buildResponse(data, { page: 2, pageSize: 2 });
        expect(typeof response).toEqual('object');
        expect(response).toHaveProperty('payload', [
          { data: 3 },
          { data: 4 },
        ]);
        expect(response).toHaveProperty('metaData', {
          page: 2,
          pageSize: 2,
          totalItems: 20,
          lastPage: 10,
        });
      });

      it('can return the last page', () => {
        const data = createList(20);
        const response = buildResponse(data, { page: 10, pageSize: 2 });
        expect(typeof response).toEqual('object');
        expect(response).toHaveProperty('payload', [
          { data: 19 },
          { data: 20 },
        ]);
        expect(response).toHaveProperty('metaData', {
          page: 10,
          pageSize: 2,
          totalItems: 20,
          lastPage: 10,
        });
      });

      it('returns the last page if the requested page is greater than the last possible page', () => {
        const data = createList(20);
        const response = buildResponse(data, { page: 11, pageSize: 2 });
        expect(typeof response).toEqual('object');
        expect(response).toHaveProperty('payload', [
          { data: 19 },
          { data: 20 },
        ]);
        expect(response).toHaveProperty('metaData', {
          page: 10,
          pageSize: 2,
          totalItems: 20,
          lastPage: 10,
        });
      });

      it('returns every item if pageSize is zero', () => {
        const data = createList(20);
        const response = buildResponse(data, { page: 1, pageSize: 0 });
        expect(typeof response).toEqual('object');
        expect(response).toHaveProperty('payload', data);
        expect(response).toHaveProperty('metaData', {
          page: 1,
          pageSize: 0,
          totalItems: 20,
          lastPage: 1,
        });
      });

      it('returns the correct page size', () => {
        const data = createList(18);
        const response = buildResponse(data);
        expect(typeof response).toEqual('object');
        expect(response).toHaveProperty('metaData', {
          page: 1,
          pageSize: 10,
          totalItems: 18,
          lastPage: 2,
        });
      });
    });
  });

  describe('buildErrorResponse', () => {
    it('returns an error object', () => {
      const response = buildErrorResponse();
      expect(typeof response).toEqual('object');
      expect(response).toHaveProperty('payload', {});
      expect(response).toHaveProperty('metaData', {});
      expect(response).toHaveProperty('errors', []);
    });

    it('returns an error object with errors', () => {
      const errors = [
        {
          code: 1,
          message: 'what went wrong',
        },
      ];
      const response = buildErrorResponse(errors);
      expect(typeof response).toEqual('object');
      expect(response).toHaveProperty('errors', errors);
    });

    it('returns empty errors if the argument is not an array', () => {
      const response = buildErrorResponse(2);
      expect(typeof response).toEqual('object');
      expect(response).toHaveProperty('errors', []);
    })
  });
});
