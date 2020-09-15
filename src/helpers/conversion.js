const convertJSONtoWidgetConfigNotation = (srcValue) => {
  const isArr = t => Array.isArray(t);
  const isObj = o => typeof o === 'object';

  const convertObject = (keymap) => {
    const keystr = Object.keys(keymap).map((key) => {
      const val = keymap[key];
      if (isObj(val)) {
        return `${key}=${convertObject(val)}`;
      } else if (isArr(val)) {
        // eslint-disable-next-line no-use-before-define
        return `${key}=(${convertArray(val)})`;
      }
      return `${key}=${val}`;
    }).join(';');
    return keystr ? `(${keystr})` : '';
  };

  const convertArray = arrmap => (
    arrmap.map((val) => {
      if (isObj(val)) {
        return convertObject(val);
      } else if (isArr(val)) {
        return convertArray(val);
      }
      return val;
    }).join('+')
  );

  if (isArr(srcValue)) {
    return convertArray(srcValue);
  }
  if (isObj(srcValue)) {
    return convertObject(srcValue);
  }
  return srcValue;
};

// eslint-disable-next-line import/prefer-default-export
export const convertConfigObject = configFields => (
  Object.keys(configFields).reduce((acc, field) => {
    if (typeof configFields[field] === 'undefined') {
      return { ...acc };
    }
    if (typeof configFields[field] === 'object') {
      return {
        ...acc,
        [field]: convertJSONtoWidgetConfigNotation(configFields[field]),
      };
    }
    return {
      ...acc,
      [field]: configFields[field],
    };
  }, {})
);
