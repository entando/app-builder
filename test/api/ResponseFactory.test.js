import { buildResponse } from 'api/ResponseFactory';

describe('ResponseFactory', () => {
  it('returns an empty object if mockResponse is not of type object', () => {
    const response = buildResponse(12);
    expect(typeof response).toEqual('object');
    expect(response).toHaveProperty('payload', {});
  });

  it('has a payload', () => {
    const data = { data: 12 };
    const response = buildResponse(data);
    expect(typeof response).toEqual('object');
    expect(response).toHaveProperty('payload', data);
  });

  it('has a metadata', () => {
    const response = buildResponse({});
    expect(typeof response).toEqual('object');
    expect(response).toHaveProperty('metaData', {});
  });

  describe('lists handling', () => {
    it('returns paginated data', () => {
      const data = [
        { data: 12 },
        { data: 13 },
        { data: 14 },
        { data: 15 },
        { data: 16 },
        { data: 17 },
      ];
      const response = buildResponse(data);
      expect(typeof response).toEqual('object');
      expect(response).toHaveProperty('payload', [
        { data: 12 },
        { data: 13 },
      ]);
    });
  });
});
