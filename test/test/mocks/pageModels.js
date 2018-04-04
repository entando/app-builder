import { PAYLOAD as COMPLEX_PAYLOAD, STRUCT as COMPLEX_STRUCT } from 'test/mocks/page-models/complex';
import { PAYLOAD as SINGLE_CELL_PAYLOAD, STRUCT as SINGLE_CELL_STRUCT } from 'test/mocks/page-models/singleCell';
import { PAYLOAD as SIDEBAR_HOLES_PAYLOAD, STRUCT as SIDEBAR_HOLES_STRUCT } from 'test/mocks/page-models/sidebarHoles';
import { PAYLOAD as OVERLAPPING_FRAMES_PAYLOAD } from 'test/mocks/page-models/overlappingFrames';
import { PAYLOAD as MISSING_SKETCH_PAYLOAD } from 'test/mocks/page-models/missingSketch';

export {
  COMPLEX_PAYLOAD, COMPLEX_STRUCT, SINGLE_CELL_PAYLOAD, SINGLE_CELL_STRUCT,
  SIDEBAR_HOLES_PAYLOAD, SIDEBAR_HOLES_STRUCT, OVERLAPPING_FRAMES_PAYLOAD, MISSING_SKETCH_PAYLOAD,
};

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

export const PAGE_MODELS_LIST = [
  COMPLEX_PAYLOAD,
  SINGLE_CELL_PAYLOAD,
  SIDEBAR_HOLES_PAYLOAD,
  MISSING_SKETCH_PAYLOAD,
];

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

export const PAGE_MODEL = {
  payload: GET_LIST_RESPONSE.payload[0],
};

export const COMPLEX_RESPONSE = {
  payload: COMPLEX_PAYLOAD,
};

export const SINGLE_CELL_RESPONSE = {
  payload: SINGLE_CELL_PAYLOAD,
};

export const SIDEBAR_HOLES_RESPONSE = {
  payload: SIDEBAR_HOLES_PAYLOAD,
};

export const OVERLAPPING_FRAMES_RESPONSE = {
  payload: OVERLAPPING_FRAMES_PAYLOAD,
};

export const MISSING_SKETCH_RESPONSE = {
  payload: MISSING_SKETCH_PAYLOAD,
};
