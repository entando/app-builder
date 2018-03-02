
export const ERROR = {
  payload: [
  ],
  errors: [
    {
      code: 1,
      message: 'what went wrong',
    },
  ],
  metaData: {
    status: 'draft',
  },
};

export const GET_LIST_RESPONSE = {
  payload: [
    {
      code: 'home',
      description: 'Home Page',
      configuration: {
        frames: [
          {
            pos: 0,
            descr: 'Navbar',
            sketch: {
              x1: 0,
              y1: 0,
              x2: 2,
              y2: 0,
            },
          },
          {
            pos: 1,
            descr: 'Navbar 2',
            sketch: {
              x1: 3,
              y1: 0,
              x2: 5,
              y2: 0,
            },
          },
        ],
      },
      template: '<html></html>',
    },
    {
      code: 'service',
      description: 'Service Page',
      configuration: {
        frames: [
          {
            pos: 0,
            descr: 'Navbar',
            sketch: {
              x1: 0,
              y1: 0,
              x2: 2,
              y2: 0,
            },
          },
          {
            pos: 1,
            descr: 'Navbar 2',
            sketch: {
              x1: 3,
              y1: 0,
              x2: 5,
              y2: 0,
            },
          },
        ],
      },
      template: '<html></html>',
    },
  ],
  errors: [],
  metaData: {
    page: 1,
    pageSize: 2,
    lastPage: 1,
  },
};
