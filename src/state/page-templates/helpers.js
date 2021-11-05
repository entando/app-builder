
import { GRID_WIDTH, CELL_TYPE } from 'state/page-templates/const';
import { cloneDeep } from 'lodash';

export const validateFrames = (frames) => {
  const errors = [];

  if (!Array.isArray(frames)) {
    errors.push({ id: 'pageTemplate.error.framesArray' });
    return errors;
  }

  const matrix = [];
  for (let x = 0; x < GRID_WIDTH; x += 1) {
    matrix.push([]);
  }
  frames.forEach((frame, i) => {
    if (frame.pos !== i) {
      errors.push({ id: 'pageTemplate.error.pos', values: { frame: frame.descr } });
    }
    const { sketch } = frame;
    let hasValidCoords = true;
    if (sketch) {
      // check if sketch x1 and x2 are positive, sorted integers between 0 and 11
      if (Number.isInteger(sketch.x1) === false || sketch.x1 < 0 || sketch.x1 > 11
        || Number.isInteger(sketch.x2) === false || sketch.x2 < 0 || sketch.x2 > 11
        || sketch.x1 > sketch.x2) {
        errors.push({
          id: 'pageTemplate.error.sketchX1X2format',
          values: {
            frame: frame.descr,
          },
        });
        hasValidCoords = false;
      }

      // check if sketch y1 and y2 are positive, sorted integers
      if (Number.isInteger(sketch.y1) === false || sketch.y1 < 0
        || Number.isInteger(sketch.y2) === false || sketch.y2 < 0
        || sketch.y1 > sketch.y2) {
        errors.push({
          id: 'pageTemplate.error.sketchY1Y2format',
          values: {
            frame: frame.descr,
          },
        });
        hasValidCoords = false;
      }

      // check if there are any overlapping frames (and deduplicate errors)
      if (hasValidCoords) {
        const overlapErrorsMap = {};
        for (let x = sketch.x1; x <= sketch.x2; x += 1) {
          for (let y = sketch.y1; y <= sketch.y2; y += 1) {
            // using != instead of !== to check both null and undefined
            if (matrix[x][y] != null) {
              overlapErrorsMap[`${frames[matrix[x][y]].pos}-${frame.pos}`] = {
                id: 'pageTemplate.error.overlapping',
                values: {
                  frame1: frames[matrix[x][y]].descr,
                  frame2: frame.descr,
                },
              };
            }
            matrix[x][y] = i;
          }
        }
        Object.keys(overlapErrorsMap)
          .map(key => overlapErrorsMap[key])
          .forEach(err => errors.push(err));
      }
    }
  });
  return errors;
};

export const validatePageTemplate = (pageTemplate) => {
  if (!pageTemplate) {
    return null;
  }
  if (!pageTemplate.configuration || !(pageTemplate.configuration instanceof Object)) {
    return [{ id: 'pageTemplate.error.configuration' }];
  }
  return validateFrames(pageTemplate.configuration.frames);
};

// useful debug functions, please do not remove
/*
// eslint-disable-next-line no-unused-vars
const printMatrix = (frames, matrix) => {
  const yMax = matrix.reduce((acc, col) => (acc < col.length ? col.length : acc), 0);

  const colAr = [];
  for (let y = 0; y < yMax; y += 1) {
    const rowAr = [];
    for (let x = 0; x < GRID_WIDTH; x += 1) {
      const frameIndex = matrix[x][y];
      if (frameIndex === undefined) {
        rowAr.push('');
      } else {
        rowAr.push(frames[frameIndex].descr);
      }
    }
    colAr.push(`|${rowAr.map(s => s.padEnd(15).padStart(17)).join('|')}|`);
  }
  // eslint-disable-next-line no-console
  console.log(colAr.join('\n'));
};

const cellMapToTree = (cellMap, parentKey) => {
  let rootKey = parentKey;
  if (!rootKey) {
    rootKey = Object.keys(cellMap).find(key => key.match(/^root:/));
  }
  const rootCell = { ...cellMap[rootKey] };
  const children = objectValues(cellMap)
    .filter(cell => cell.parentKey === rootKey)
    .map(cell => cellMapToTree(cellMap, cell.key));
  if (children.length) {
    const childrenName = rootCell.type === CELL_TYPE.ROW ? 'cols' : 'rows';
    rootCell[childrenName] = children;
  }
  return rootCell;
};
*/

const createFramesMatrix = (frames) => {
  const matrix = [];
  for (let x = 0; x < GRID_WIDTH; x += 1) {
    matrix.push([]);
  }
  frames.forEach((frame, i) => {
    for (let x = frame.sketch.x1; x <= frame.sketch.x2; x += 1) {
      for (let y = frame.sketch.y1; y <= frame.sketch.y2; y += 1) {
        matrix[x][y] = i;
      }
    }
  });
  return matrix;
};


// returns an unique id based on the bounds
const getCellKey = ({
  x1, x2, y1, y2, type,
}) => `${type}:${x1}-${y1}/${x2}-${y2}`;


const getNextRow = (frames, matrix, { x1, x2 }, yStart) => {
  let y2 = yStart;
  for (let x = x1; x <= x2; x += 1) {
    const frame = frames[matrix[x][y2]];
    if (frame !== undefined && frame.sketch.y2 > y2) {
      ({ y2 } = frame.sketch);
      x = x1;
    }
  }
  const result = {
    x1, x2, y1: yStart, y2, type: CELL_TYPE.ROW,
  };
  result.key = getCellKey(result);
  return result;
};

const getRows = (frames, matrix, bounds) => {
  const rows = {};
  let yCur = bounds.y1;
  while (yCur <= bounds.y2) {
    const row = getNextRow(frames, matrix, bounds, yCur);
    yCur = row.y2 + 1;
    row.parentKey = getCellKey(bounds);
    rows[row.key] = row;
  }
  return rows;
};

const getNextCol = (frames, matrix, { y1, y2 }, xStart) => {
  let x2 = xStart;
  for (let y = y1; y <= y2; y += 1) {
    const frame = frames[matrix[x2][y]];
    if (frame !== undefined && frame.sketch.x2 > x2) {
      ({ x2 } = frame.sketch);
      y = y1;
    }
  }
  const result = {
    x1: xStart, x2, y1, y2, type: CELL_TYPE.COL,
  };
  result.key = getCellKey(result);
  return result;
};

const getCols = (frames, matrix, bounds) => {
  const cols = {};
  let xCur = bounds.x1;
  while (xCur <= bounds.x2) {
    const col = getNextCol(frames, matrix, bounds, xCur);
    xCur = col.x2 + 1;
    col.parentKey = getCellKey(bounds);
    cols[col.key] = col;
  }
  return cols;
};


const objectValues = object => Object.keys(object).map(prop => object[prop]);


const fixMissingSketch = (frames) => {
  let yMax = frames
    .reduce((acc, frame) => (frame.sketch && acc < frame.sketch.y2 ? frame.sketch.y2 : acc), 0);
  return frames.map((frame) => {
    if (frame.sketch) {
      return frame;
    }
    yMax += 1;
    const sketch = {
      x1: 0, x2: GRID_WIDTH - 1, y1: yMax, y2: yMax,
    };
    return { ...frame, sketch };
  });
};

export const getCellMap = (pageTemplate) => {
  if (!pageTemplate || !pageTemplate.configuration || !pageTemplate.configuration.frames) {
    return null;
  }
  const errors = validatePageTemplate(pageTemplate);
  if (errors && errors.length) {
    return null;
  }

  const frames = fixMissingSketch(pageTemplate.configuration.frames);

  const yMax = frames
    .reduce((acc, frame) => (acc < frame.sketch.y2 ? frame.sketch.y2 : acc), 0);

  const rootCol = {
    x1: 0, x2: 11, y1: 0, y2: yMax, type: CELL_TYPE.ROOT,
  };
  rootCol.key = getCellKey(rootCol);
  const matrix = createFramesMatrix(frames);

  const stack = [];
  const cellsMap = {
    [rootCol.key]: rootCol,
  };

  const filterCells = cellsObj => Object.keys(cellsObj).reduce((acc, key) => {
    const cell = cellsObj[key];
    if (cell.type === CELL_TYPE.ROW &&
      cell.parentKey === key.replace(CELL_TYPE.ROW, CELL_TYPE.COL)) {
      return acc;
    }
    if (((key !== cell.parentKey) && !cellsMap[key])) {
      acc[key] = cell;
    }
    return acc;
  }, {});

  for (let curCol = rootCol; curCol; curCol = stack.pop()) {
    const rows = getRows(
      frames,
      matrix,
      curCol,
    );

    objectValues(rows).forEach((row) => {
      const cols = getCols(frames, matrix, row);
      stack.push(...objectValues(filterCells(cols)));
      Object.assign(cellsMap, filterCells(cols));
    });

    Object.assign(cellsMap, filterCells(rows));
  }

  // assign frames to cols
  frames.forEach((frame) => {
    const colKey = getCellKey({ type: CELL_TYPE.COL, ...frame.sketch });
    cellsMap[colKey].framePos = frame.pos;
    cellsMap[colKey].frameDescr = frame.descr;
    cellsMap[colKey].frameIsMainFrame = frame.mainFrame || (frame.pos === pageTemplate.mainFrame);
  });

  return cellsMap;
};

export const convertPageTemplateForm = (pageTemplateForm) => {
  if (!pageTemplateForm) {
    return null;
  }
  const pageTemplate = cloneDeep(pageTemplateForm);
  try {
    pageTemplate.configuration = JSON.parse(pageTemplate.configuration);
  } catch (e) {
    pageTemplate.configuration = { frames: [] };
  }
  return pageTemplate;
};
