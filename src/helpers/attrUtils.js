import moment from 'moment';

import {
  TYPE_COMPOSITE, TYPE_LIST, TYPE_MONOLIST,
  TYPE_DATE, TYPE_TIMESTAMP, TYPE_BOOLEAN,
  TYPE_CHECKBOX, TYPE_THREESTATE, TYPE_TEXT,
  TYPE_LONGTEXT, TYPE_HYPERTEXT, TYPE_LINK,
} from 'state/content-type/const';

const createObjFromArr = (keyArr, value) => (
  keyArr.reduce((accObj, key) => ({ ...accObj, [key]: value }), {})
);

export const getAttrInitialValue = (attr, langCodes = ['en']) => {
  const { type, code, compositeAttributes = [] } = attr;
  const initialValue = { code };
  switch (type) {
    case TYPE_COMPOSITE:
      initialValue.compositeelements = compositeAttributes.map(compAttr => (
        getAttrInitialValue(compAttr, langCodes)
      ));
      break;
    case TYPE_LIST:
      initialValue.listelements = {
        ...createObjFromArr(langCodes, []),
      };
      break;
    case TYPE_MONOLIST:
      initialValue.elements = [];
      break;
    case TYPE_DATE:
    case TYPE_TIMESTAMP:
      initialValue.value = moment().format('DD/MM/YYYY');
      break;
    case TYPE_BOOLEAN:
    case TYPE_CHECKBOX:
      initialValue.value = 'false';
      break;
    case TYPE_THREESTATE:
      initialValue.value = 'none';
      break;
    case TYPE_TEXT:
    case TYPE_LONGTEXT:
    case TYPE_HYPERTEXT:
      initialValue.values = {
        ...createObjFromArr(langCodes, ''),
      };
      break;
    case TYPE_LINK:
      initialValue.value = {};
      initialValue.values = {
        ...createObjFromArr(langCodes, ''),
      };
      break;
    default:
      initialValue.value = '';
  }

  return initialValue;
};

/**
 * Converts a date string to an object with date, minutes, hours, seconds properties
 * @example
 * const dtObj = getDateTimeObjFromStr('2019-11-26 14:46:07');
 * // { date: '2019-11-26', hours: '14', minutes: '46', seconds: '07' }
 */
export const getDateTimeObjFromStr = (dateStr) => {
  if (!dateStr) return { date: '' };

  const dtSegments = dateStr.split(' ');
  const date = dtSegments[0];
  if (dtSegments[1]) {
    const tSegments = dtSegments[1].split(':');
    const hours = tSegments[0];
    const minutes = tSegments[1];
    const seconds = tSegments[2];
    return {
      date,
      hours,
      minutes,
      seconds,
    };
  }
  return {
    date,
  };
};
