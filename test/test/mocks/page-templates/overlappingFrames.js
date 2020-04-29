/*
    Model grid:

    Error: the 2 frames are overlapping
*/
export const PAYLOAD = {
  code: 'overlapping_frames',
  descr: 'Overlapping Frames',
  template: '<html></html>',
  configuration: {
    frames: [
      {
        defaultWidget: null,
        descr: 'Frame 1',
        jaxbDefaultWidget: null,
        mainFrame: false,
        pos: 0,
        sketch: {
          x1: 0,
          x2: 11,
          y1: 0,
          y2: 1,
        },
      },
      {
        defaultWidget: null,
        descr: 'Frame 2',
        jaxbDefaultWidget: null,
        mainFrame: false,
        pos: 1,
        sketch: {
          x1: 6,
          x2: 11,
          y1: 1,
          y2: 2,
        },
      },
    ],
  },
};

export const CELL_MAP = null;
