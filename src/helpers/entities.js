import moment from 'moment';
import padStart from 'lodash/padStart';
import first from 'lodash/first';
import SwitchRenderer from 'ui/common/form/SwitchRenderer';
import RenderDatePickerInput from 'ui/common/form/RenderDatePickerInput';
import RenderTextAreaInput from 'ui/common/form/RenderTextAreaInput';
import RenderDateTimePickerInput from 'ui/common/form/RenderDateTimePickerInput';
import RenderRadioInput from 'ui/common/form/RenderRadioInput';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import {
  TYPE_BOOLEAN, TYPE_THREESTATE, TYPE_CHECKBOX, TYPE_DATE, TYPE_TIMESTAMP, TYPE_LONGTEXT,
  TYPE_HYPERTEXT, TYPE_ENUMERATOR, TYPE_ENUMERATOR_MAP, TYPE_TEXT, TYPE_MONOLIST, TYPE_LIST,
  TYPE_COMPOSITE, TYPE_NUMBER,
} from 'state/data-types/const';

const FORM_DATE_FORMAT = 'DD/MM/YYYY';
const API_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const API_TIMESTAMP_FORMAT = 'YYYY-MM-DD';

export const zeroFill = number => padStart(number, 2, '0');

const changeDateFormat = (dateString, sourceFormat, targetFormat) =>
  moment(dateString, sourceFormat).format(targetFormat);

export const getComponentType = (component) => {
  switch (component) {
    case TYPE_BOOLEAN:
    case TYPE_THREESTATE:
      return RenderRadioInput;
    case TYPE_CHECKBOX:
      return SwitchRenderer;
    case TYPE_DATE:
      return RenderDatePickerInput;
    case TYPE_TIMESTAMP:
      return RenderDateTimePickerInput;
    case TYPE_LONGTEXT:
    case TYPE_HYPERTEXT:
      return RenderTextAreaInput;
    case TYPE_ENUMERATOR:
    case TYPE_ENUMERATOR_MAP:
      return RenderSelectInput;
    default: return RenderTextInput;
  }
};

export const getPayloadForForm = (
  username, userProfile, selectedProfileType,
  defaultLanguage,
) => {
  const formAttr = {
    id: username,
    typeCode: userProfile.typeCode,
    typeDescription: userProfile.typeDescription,
  };

  userProfile.attributes.forEach((attr) => {
    const {
      code, value, values, listElements, elements,
    } = attr;

    const attrType =
      selectedProfileType ? selectedProfileType.find(type => type.code === code) : {};
    switch (attrType.type) {
      case TYPE_BOOLEAN:
      case TYPE_THREESTATE: {
        if (value === undefined) {
          formAttr[code] = null;
        } else {
          formAttr[code] = value != null ? value.toString() : value;
        }
        break;
      }
      case TYPE_DATE: {
        formAttr[code] = changeDateFormat(value, API_DATE_FORMAT, FORM_DATE_FORMAT);
        break;
      }
      case TYPE_TIMESTAMP: {
        const momentDate = moment(value);
        formAttr[`${code}_ts_hours`] = zeroFill(momentDate.hours());
        formAttr[`${code}_ts_minutes`] = zeroFill(momentDate.minutes());
        formAttr[`${code}_ts_seconds`] = zeroFill(momentDate.seconds());
        formAttr[code] = changeDateFormat(value, API_TIMESTAMP_FORMAT, FORM_DATE_FORMAT);
        break;
      }
      case TYPE_HYPERTEXT:
      case TYPE_LONGTEXT:
      case TYPE_TEXT: {
        if (values) {
          formAttr[code] = values[defaultLanguage];
        }
        break;
      }
      case TYPE_MONOLIST: {
        const childProfileType = selectedProfileType.find(item => item.code === code);
        if (Array.isArray(elements) && childProfileType && childProfileType.nestedAttribute) {
          formAttr[code] = elements.map(element =>
            getPayloadForForm(
              username,
              { attributes: [element] },
              [childProfileType.nestedAttribute],
              defaultLanguage,
            )[code]);
        }
        break;
      }
      case TYPE_LIST: {
        if (listElements) {
          formAttr[code] = Object.keys(listElements).reduce((acc, langCode) => {
            acc[langCode] = listElements[langCode].map(item => item.value);
            return acc;
          }, {});
        } else {
          formAttr[code] = {};
        }
        break;
      }
      case TYPE_COMPOSITE: {
        const childProfileType = selectedProfileType.find(item => item.code === code);
        if (elements && childProfileType) {
          formAttr[code] = getPayloadForForm(
            username, { attributes: elements },
            childProfileType.compositeAttributes,
            defaultLanguage,
          );
        }
        break;
      }
      default:
        formAttr[code] = value;
    }
  });
  return formAttr;
};

// TODO RENAME PROFILE TO ENTITY ?
export const getPayloadForApi = (
  profile,
  selectedProfileType,
  defaultLanguage, /* , languages */
) => {
  const attr = [];
  Object.keys(profile).forEach((key) => {
    if (!key.match(/^id$|^typeCode$|^typeDescription$|_ts_hours$|_ts_minutes$|_ts_seconds$/)) {
      const attrType = selectedProfileType.find(type => type.code === key);
      if (!attrType) return;
      switch (attrType.type) {
        case TYPE_BOOLEAN: {
          const isTrue = (profile[key] === 'true');
          attr.push({ code: key, value: isTrue });
          break;
        }
        case TYPE_THREESTATE: {
          const isTrue = (profile[key] === 'true');
          if (profile[key] === '') {
            attr.push({ code: key, value: null });
          } else {
            attr.push({ code: key, value: isTrue });
          }
          break;
        }
        case TYPE_NUMBER: {
          attr.push({ code: key, value: Number(profile[key]) });
          break;
        }
        case TYPE_DATE: {
          const formattedDate = changeDateFormat(profile[key], FORM_DATE_FORMAT, API_DATE_FORMAT);
          attr.push({ code: key, value: formattedDate });
          break;
        }
        case TYPE_TIMESTAMP: {
          const dateStr = changeDateFormat(profile[key], FORM_DATE_FORMAT, API_TIMESTAMP_FORMAT);
          const hours = profile[`${key}_ts_hours`];
          const minutes = profile[`${key}_ts_minutes`];
          const seconds = profile[`${key}_ts_seconds`];
          const newTimestamp = `${dateStr} ${hours}:${minutes}:${seconds}`;
          attr.push({ code: key, value: newTimestamp });
          break;
        }
        case TYPE_TEXT:
        case TYPE_LONGTEXT:
        case TYPE_HYPERTEXT: {
          attr.push({ code: key, values: { [defaultLanguage]: profile[key] } });
          break;
        }
        case TYPE_MONOLIST: {
          const childProfileType = selectedProfileType.find(item => item.code === key);
          const elements = profile[key].map(value =>
            first(getPayloadForApi(
              { [key]: value },
              [childProfileType.nestedAttribute],
              defaultLanguage,
            ).attributes));

          attr.push({ code: key, elements });
          break;
        }
        case TYPE_LIST: {
          const listElements = Object.keys(profile[key]).reduce((acc, langCode) => {
            acc[langCode] = profile[key][langCode].map(value => ({ code: key, value }));
            return acc;
          }, {});
          attr.push({ code: key, listElements });
          break;
        }
        case TYPE_COMPOSITE: {
          const childProfileType = selectedProfileType.find(item => item.code === key);
          const elements = getPayloadForApi(
            profile[key],
            childProfileType.compositeAttributes,
            defaultLanguage,
          ).attributes;
          attr.push({ code: key, elements });
          break;
        }
        default:
          attr.push({ code: key, value: profile[key] });
      }
    }
  });

  const newUserProfile = {
    id: profile.id,
    typeCode: profile.typeCode,
    typeDescription: profile.typeDescription,
    attributes: attr,
  };
  return newUserProfile;
};
