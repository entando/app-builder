// JEST extensions for table struct cells

expect.extend({
  toBeLeafCol(received) {
    if (received.rows) {
      return {
        message: () => 'expected "rows" property to be undefined for a leaf col',
        pass: false,
      };
    }
    if (!received.frame) {
      return {
        message: () => 'expected "frame" property to be defined for a leaf col',
        pass: false,
      };
    }
    if (!received.frame.sketch) {
      return {
        message: () => 'expected "frame.sketch" property to be defined for a leaf col',
        pass: false,
      };
    }
    return {
      message: () => 'expected object not to be a leaf col',
      pass: true,
    };
  },

  toBeCellOfWidth(received, argument) {
    let sketch;
    try {
      ({ sketch } = received.frame);
    } catch (e) {
      return {
        message: () => 'expected "frame.sketch" property to be defined',
        pass: false,
      };
    }
    const width = (sketch.x2 - sketch.x1) + 1;
    if (width !== argument) {
      return {
        message: () => `expected cell to be of width ${argument} (received width: ${width})`,
        pass: false,
      };
    }
    return {
      message: () => `expected cell NOT to be of width ${argument}`,
      pass: true,
    };
  },
});
