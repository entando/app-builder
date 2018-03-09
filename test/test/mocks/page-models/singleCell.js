/*
    Model grid:

    |           12          |
*/

export const PAYLOAD = {
  code: 'single_cell_model',
  description: 'Single Cell Model',
  template: '<html></html>',
  configuration: {
    frames: [
      {
        defaultWidget: null,
        descr: 'Content',
        jaxbDefaultWidget: null,
        mainFrame: false,
        pos: 0,
        sketch: {
          x1: 0,
          x2: 11,
          y1: 0,
          y2: 0,
        },
      },
    ],
  },
};


export const STRUCT = {
  x1: 0,
  x2: 11,
  y1: 0,
  y2: 0,
  rows: [
    {
      x1: 0,
      x2: 11,
      y1: 0,
      y2: 0,
      cols: [
        {
          x1: 0,
          x2: 11,
          y1: 0,
          y2: 0,
          frame: {
            defaultWidget: null,
            descr: 'Content',
            jaxbDefaultWidget: null,
            mainFrame: false,
            pos: 0,
            sketch: {
              x1: 0,
              x2: 11,
              y1: 0,
              y2: 0,
            },
          },
        },
      ],
    },
  ],
};
