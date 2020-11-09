import { createSelector } from 'reselect';
import { cloneDeep, get } from 'lodash';

import { validatePageTemplate } from 'state/page-templates/helpers';
import { getPageTemplateForm } from 'state/forms/selectors';
import { getLocale } from 'state/locale/selectors';

const GRID_WIDTH = 12;

const CELL_TYPE = {
  ROOT: 'root',
  ROW: 'row',
  COL: 'col',
};

export const getPageTemplates = state => state.pageTemplates;
export const getPageTemplatesIdList = state => state.pageTemplates.idList;
export const getPageTemplatesMap = state => state.pageTemplates.map;
export const getSelectedPageTemplate = state => state.pageTemplates.selected;
export const getPageTemplatesTotal = state => state.pageTemplates.total;

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

const getCellMap = (pageTemplate) => {
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


export const getPageTemplatesList = createSelector(
  [getPageTemplatesIdList, getPageTemplatesMap],
  (pageTemplatesIdList, pageTemplatesMap) => (
    pageTemplatesIdList.map(code => pageTemplatesMap[code])
  ),
);

export const getSelectedPageTemplateCellMap = createSelector(
  [getSelectedPageTemplate],
  getCellMap,
);

export const getSelectedPageTemplateCanBeOnTheFly = createSelector(
  [getSelectedPageTemplate],
  pageTemplate => get(pageTemplate, 'configuration.frames', []).find(frame => frame.mainFrame),
);

export const getSelectedPageTemplateMainFrame = createSelector(
  [getSelectedPageTemplate],
  (pageTemplate) => {
    const mainFrame = pageTemplate &&
      pageTemplate.configuration.frames.find(frame => frame.mainFrame === true);
    return mainFrame || null;
  },
);

export const getSelectedPageTemplateDefaultConfig = createSelector(
  [getSelectedPageTemplate],
  (pageTemplate) => {
    if (!pageTemplate) {
      return null;
    }
    return pageTemplate.configuration.frames.map(frame => frame.defaultWidget || null);
  },
);

export const getFormPageTemplate = createSelector(
  [getPageTemplateForm],
  (pageTemplateForm) => {
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
  },
);

export const getPageTemplateFormCellMap = createSelector(
  [getFormPageTemplate],
  getCellMap,
);

export const getPageTemplateFormErrors = createSelector(
  [getFormPageTemplate],
  (formPageTemplate) => {
    const errors = validatePageTemplate(formPageTemplate);
    if (errors && errors.length) {
      return errors;
    }
    return [];
  },
);

export const getSelectedPageTemplatePageRefs = createSelector(
  [getSelectedPageTemplate],
  pageTemplate => pageTemplate && pageTemplate.pageReferences,
);

export const getLocalizedPageTemplatePageRefs = createSelector(
  [getSelectedPageTemplatePageRefs, getLocale],
  (refs, locale) => refs && refs.map(ref => ({
    ...ref,
    title: ref.titles[locale],
    fullTitle: ref.fullTitles[locale],
  })),
);
