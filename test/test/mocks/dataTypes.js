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

export const DATA_TYPES_OK_PAGE_1 =
{
  payload: [
    {
      name: 'dataType1',
      code: 'ABC',
      status: 'ok',
    },
    {
      name: 'dataType2',
      code: 'DEF',
      status: 'ok',
    },
  ],
  errors: [],
  metaData: {
    page: 1,
    pageSize: 10,
    lastPage: 2,
    totalItems: 20,
  },
};

export const DATA_TYPES_OK_PAGE_2 =
{
  payload: [
    {
      name: 'dataType3',
      code: 'GHI',
      status: 'ok',
    },
    {
      name: 'dataType4',
      code: 'LMN',
      status: 'ok',
    },
  ],
  errors: [],
  metaData: {
    page: 2,
    pageSize: 2,
    lastPage: 2,
    totalItems: 4,
  },
};
