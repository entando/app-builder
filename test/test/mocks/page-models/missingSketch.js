/*
    Model grid:

    |       8       |   4   |
    |           12          |
    |           12          |
    |           12          |
*/

// eslint-disable-next-line import/prefer-default-export
export const PAYLOAD = {
  code: 'missing_sketch',
  description: 'Missing Sketch',
  template: '<html></html>',
  configuration: {
    frames: [
      {
        defaultWidget: null,
        descr: 'Frame with no sketch 1',
        jaxbDefaultWidget: null,
        mainFrame: false,
        pos: 0,
      },
      {
        defaultWidget: null,
        descr: 'Frame with no sketch 2',
        jaxbDefaultWidget: null,
        mainFrame: false,
        pos: 1,
      },
      {
        defaultWidget: null,
        descr: 'Main Bar 1',
        jaxbDefaultWidget: null,
        mainFrame: false,
        pos: 2,
        sketch: {
          x1: 0,
          x2: 7,
          y1: 1,
          y2: 1,
        },
      },
      {
        defaultWidget: null,
        descr: 'Main Bar 2',
        jaxbDefaultWidget: null,
        mainFrame: false,
        pos: 3,
        sketch: {
          x1: 8,
          x2: 11,
          y1: 1,
          y2: 1,
        },
      },
      {
        defaultWidget: null,
        descr: 'Footer with no sketch 3',
        jaxbDefaultWidget: null,
        mainFrame: false,
        pos: 4,
      },
    ],
  },
};
