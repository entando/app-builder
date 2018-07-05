import moment from 'moment';
import padStart from 'lodash/padStart';
import SwitchRenderer from 'ui/common/form/SwitchRenderer';
import RenderDatePickerInput from 'ui/common/form/RenderDatePickerInput';
import RenderTextAreaInput from 'ui/common/form/RenderTextAreaInput';
import RenderDateTimePickerInput from 'ui/common/form/RenderDateTimePickerInput';
import RenderRadioInput from 'ui/common/form/RenderRadioInput';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import RenderTextInput from 'ui/common/form/RenderTextInput';

const FORM_DATE_FORMAT = 'DD/MM/YYYY';
const API_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const API_TIMESTAMP_FORMAT = 'YYYY-MM-DD';

export const zeroFill = number => padStart(number, 2, '0');

export const getComponentType = (component) => {
  switch (component) {
    case 'Boolean':
    case 'ThreeState':
      return RenderRadioInput;
    case 'CheckBox':
      return SwitchRenderer;
    case 'Date':
      return RenderDatePickerInput;
    case 'Timestamp':
      return RenderDateTimePickerInput;
    case 'Longtext':
    case 'Hypertext':
      return RenderTextAreaInput;
    case 'Enumerator':
    case 'EnumeratorMap':
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

    const attrType = selectedProfileType.find(type => type.code === code);

    switch (attrType.type) {
      case 'Boolean':
      case 'ThreeState': {
        if (value === undefined) {
          formAttr[code] = null;
        } else {
          formAttr[code] = value.toString();
        }
        break;
      }
      case 'Date': {
        const newDate = moment(value, API_DATE_FORMAT).format(FORM_DATE_FORMAT);
        formAttr[code] = newDate;
        break;
      }
      case 'Timestamp': {
        const hours = moment(value).hours();
        const minutes = moment(value).minutes();
        const seconds = moment(value).seconds();
        const newDate = moment(value, API_TIMESTAMP_FORMAT).format(FORM_DATE_FORMAT);
        formAttr[`${code}_ts_hours`] = zeroFill(hours);
        formAttr[`${code}_ts_minutes`] = zeroFill(minutes);
        formAttr[`${code}_ts_seconds`] = zeroFill(seconds);
        formAttr[code] = newDate;
        break;
      }
      case 'Hypertext':
      case 'Longtext':
      case 'Text': {
        if (values) {
          formAttr[code] = values[defaultLanguage];
        }
        break;
      }
      case 'Monolist': {
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
      case 'List': {
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
      case 'Composite': {
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
    if (key !== 'id' &&
        key !== 'typeCode' &&
        key !== 'typeDescription' &&
        (!(key.endsWith('_ts_hours'))) &&
        (!(key.endsWith('_ts_minutes'))) &&
        (!(key.endsWith('_ts_seconds')))
    ) {
      let attrType = {};
      selectedProfileType.forEach((type) => {
        if (type.code === key) { attrType = type; }
      });
      switch (attrType.type) {
        case 'Boolean': {
          const isTrue = (profile[key] === 'true');
          attr.push({ code: key, value: isTrue });
          break;
        }
        case 'ThreeState': {
          const isTrue = (profile[key] === 'true');
          if (profile[key] === '') {
            attr.push({ code: key, value: null });
          } else {
            attr.push({ code: key, value: isTrue });
          }
          break;
        }
        case 'Number': {
          attr.push({ code: key, value: Number(profile[key]) });
          break;
        }
        case 'Date': {
          const formattedDate = moment(profile[key], FORM_DATE_FORMAT).format(API_DATE_FORMAT);
          attr.push({ code: key, value: formattedDate });
          break;
        }
        case 'Timestamp': {
          const formattedDate = moment(profile[key], FORM_DATE_FORMAT).format(API_TIMESTAMP_FORMAT);
          const hours = profile[`${key}_ts_hours`];
          const minutes = profile[`${key}_ts_minutes`];
          const seconds = profile[`${key}_ts_seconds`];
          const newTimestamp = `${formattedDate} ${hours}:${minutes}:${seconds}`;
          attr.push({ code: key, value: newTimestamp });
          break;
        }
        case 'Text':
        case 'Longtext':
        case 'Hypertext': {
          attr.push({ code: key, values: { [defaultLanguage]: profile[key] } });
          break;
        }
        case 'Monolist': {
          profile[key].forEach((value) => {
            const selectedProfileTypeId = Object.keys(selectedProfileType).filter((sel, index) =>
              selectedProfileType[index].code === key);
            const monolistProfile = { [key]: value };
            const elements = getPayloadForApi(
              monolistProfile,
              [selectedProfileType[selectedProfileTypeId].nestedAttribute],
              defaultLanguage,
            ).attributes;
            attr.push({ code: key, elements });
            // listFields.push({ code: key, elements });
          });
          break;
        }
        case 'List': {
          let listFields = {};
          Object.keys(profile[key]).forEach((lang) => {
            const listLangFields = [];
            profile[key][lang].forEach((value) => {
              listLangFields.push({ code: key, value });
            });
            listFields = { ...listFields, [lang]: listLangFields };
          });
          attr.push({ code: key, listElements: listFields });
          break;
        }
        case 'Composite': {
          const selectedProfileTypeId = Object.keys(selectedProfileType).filter((sel, index) =>
            selectedProfileType[index].code === key);
          const elements = getPayloadForApi(
            profile[key],
            selectedProfileType[selectedProfileTypeId].compositeAttributes,
            defaultLanguage,
          ).attributes;
          attr.push({
            code: key,
            elements,
          });
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
