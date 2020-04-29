
import { GRID_WIDTH } from 'state/page-templates/const';


const validateFrames = (frames) => {
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

// eslint-disable-next-line import/prefer-default-export
export const validatePageTemplate = (pageTemplate) => {
  if (!pageTemplate) {
    return null;
  }
  if (!pageTemplate.configuration || !(pageTemplate.configuration instanceof Object)) {
    return [{ id: 'pageTemplate.error.configuration' }];
  }
  return validateFrames(pageTemplate.configuration.frames);
};
