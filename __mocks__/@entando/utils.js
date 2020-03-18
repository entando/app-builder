const utils = jest.genMockFromModule('@entando/utils');
const real = require.requireActual('@entando/utils');

utils.formattedText = jest.fn().mockImplementation(id => id);
utils.isInteger = real.isInteger;
utils.formatDate = real.formatDate;
utils.isEmpty = real.isEmpty;
utils.convertToQueryString = real.convertToQueryString;
utils.throttle = real.throttle;
utils.maxLength = real.maxLength;
utils.minLength = real.minLength;
utils.isNumber = real.isNumber;
utils.matchElement = real.matchElement;
utils.matchPassword = real.matchPassword;
utils.userFormText = real.userFormText;
utils.required = real.required;
utils.routeConverter = real.routeConverter;

export const {
  formattedText,
  isInteger,
  setCurrentLocale,
  isEmpty,
  isNumber,
  convertToQueryString,
  FILTER_OPERATORS,
  throttle,
  maxLength,
  minLength,
  matchElement,
  matchPassword,
  userFormText,
  required,
  routeConverter,
  formatDate,
} = utils;
