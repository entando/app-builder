
import { GRID_WIDTH } from 'state/page-models/const';


const validateFrames = (frames) => {
  const errors = [];
  const matrix = [];
  for (let x = 0; x < GRID_WIDTH; x += 1) {
    matrix.push([]);
  }
  frames.forEach((frame, i) => {
    if (frame.pos !== i) {
      errors.push({ id: 'pageModel.error.pos', values: { frame: frame.descr } });
    }
    if (frame.sketch) {
      for (let x = frame.sketch.x1; x <= frame.sketch.x2; x += 1) {
        for (let y = frame.sketch.y1; y <= frame.sketch.y2; y += 1) {
          // using != instead of !== to check both null and undefined
          if (matrix[x][y] != null) {
            errors.push({
              id: 'pageModel.error.overlapping',
              values: {
                frame1: frames[matrix[x][y]].descr,
                frame2: frame.descr,
              },
            });
          }
          matrix[x][y] = i;
        }
      }
    }
  });
  return errors;
};

// eslint-disable-next-line import/prefer-default-export
export const validatePageModel = pageModel =>
  validateFrames(pageModel.configuration.frames);
