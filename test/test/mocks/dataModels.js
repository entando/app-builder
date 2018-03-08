export const DATA_MODELS = {
  payload: [
    {
      modelId: 'ID',
      descr: 'data model sample',
      type: 'AAA',
      model: '',
      stylesheet: '',
    },
    {
      modelId: 'ID2',
      descr: 'data model sample2',
      type: 'BBBB',
      model: '<html></html>',
      stylesheet: 'style.css',
    },
  ],
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
