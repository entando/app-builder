// status property added
export const DATA_TYPES = {
  payload: [{
    name: 'dataType1',
    code: 'XYZ',
    status: 'ok',
  }],
  errors: [],
  metaData: {
    page: 1,
    pageSize: 100,
    lastPage: 10,
  },
};

export const ERROR = {
  payload: [],
  errors: [
    {
      code: 1,
      message: 'what went wrong',
    },
  ],
  metaData: {
    page: 1,
    pageSize: 100,
    lastPage: 10,
  },
};
