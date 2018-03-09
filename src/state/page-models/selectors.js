import { createSelector } from 'reselect';

export const getPageModels = state => state.pageModels;
export const getPageModelsList = state => state.pageModels.list;
export const getSelectedPageModel = state => state.pageModels.selected;


const createFramesMatrix = (frames) => {
  const matrix = [];
  for (let x = 0; x < 12; x += 1) {
    matrix.push([]);
  }
  frames.forEach((frame) => {
    for (let x = frame.sketch.x1; x <= frame.sketch.x2; x += 1) {
      for (let y = frame.sketch.y1; y <= frame.sketch.y2; y += 1) {
        matrix[x][y] = frame;
      }
    }
  });
  return matrix;
};

const getNextRow = (matrix, { x1, x2 }, yStart) => {
  let y2 = yStart;
  for (let x = x1; x <= x2; x += 1) {
    const frame = matrix[x][y2];
    if (frame && frame.sketch.y2 > y2) {
      ({ y2 } = frame.sketch);
      x = x1;
    }
  }
  return {
    x1, x2, y1: yStart, y2,
  };
};

const getRows = (matrix, bounds) => {
  const rows = [];
  let yCur = bounds.y1;
  while (yCur <= bounds.y2) {
    const row = getNextRow(matrix, bounds, yCur);
    yCur = row.y2 + 1;
    rows.push(row);
  }
  return rows;
};

const getNextCol = (matrix, { y1, y2 }, xStart) => {
  let x2 = xStart;
  for (let y = y1; y <= y2; y += 1) {
    const frame = matrix[x2][y];
    if (frame && frame.sketch.x2 > x2) {
      ({ x2 } = frame.sketch);
      y = y1;
    }
  }
  return {
    x1: xStart, x2, y1, y2, frame: matrix[xStart][y1],
  };
};

const getCols = (matrix, bounds) => {
  const cols = [];
  let xCur = bounds.x1;
  while (xCur <= bounds.x2) {
    const col = getNextCol(matrix, bounds, xCur);
    xCur = col.x2 + 1;
    cols.push(col);
  }
  return cols;
};


const getRowsWithChildren = (matrix, bounds) => {
  let rows = getRows(matrix, bounds);
  rows = rows.map(row => ({ ...row, cols: getCols(matrix, row) }));
  return rows;
};

const getPageModelGridStruct = (pageModel) => {
  if (!pageModel) {
    return null;
  }
  const yMax = pageModel.configuration.frames
    .reduce((acc, frame) => (acc < frame.sketch.y2 ? frame.sketch.y2 : acc), 0);

  const bounds = {
    x1: 0, x2: 11, y1: 0, y2: yMax,
  };

  const stack = [bounds];
  while (stack.length) {
    const curBounds = stack.pop();
    const rows = getRowsWithChildren(
      createFramesMatrix(pageModel.configuration.frames),
      curBounds,
    );
    // if the current node is not a leaf
    if (!(curBounds !== bounds && rows.length === 1 && rows[0].cols.length === 1)) {
      rows.forEach((row) => {
        row.cols.forEach((col) => {
          if (!col.isLeaf) {
            stack.push(col);
          }
        });
      });
      curBounds.rows = rows;
    }
  }

  return bounds;
};

export const getPageModelStruct = createSelector(
  [getSelectedPageModel],
  getPageModelGridStruct,
);
