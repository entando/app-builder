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


export const CELL_MAP = {
  'root:0-0/11-0': {
    x1: 0,
    x2: 11,
    y1: 0,
    y2: 0,
    type: 'root',
    key: 'root:0-0/11-0',
  },
  'col:0-0/11-0': {
    x1: 0,
    x2: 11,
    y1: 0,
    y2: 0,
    type: 'col',
    key: 'col:0-0/11-0',
    parentKey: 'row:0-0/11-0',
    framePos: 0,
    frameDescr: 'Content',
    frameIsMainFrame: false,
  },
  'row:0-0/11-0': {
    x1: 0,
    x2: 11,
    y1: 0,
    y2: 0,
    type: 'row',
    key: 'row:0-0/11-0',
    parentKey: 'root:0-0/11-0',
  },
};
