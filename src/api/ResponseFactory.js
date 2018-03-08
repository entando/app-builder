const buildPayload = (mockResponse) => {
  if (typeof mockResponse !== 'object') {
    return {};
  }
  if (mockResponse instanceof Array) {
    return mockResponse.splice(0, 2);
  }

  return mockResponse;
};

// eslint-disable-next-line import/prefer-default-export
export const buildResponse = mockResponse => (
  {
    payload: buildPayload(mockResponse),
    metaData: {},
  }
);
