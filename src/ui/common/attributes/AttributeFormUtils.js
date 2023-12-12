
import {
  TYPE_BOOLEAN,
  TYPE_CHECKBOX,
  TYPE_DATE,
  TYPE_ENUMERATOR,
  TYPE_ENUMERATOR_MAP,
  TYPE_MONOLIST,
  TYPE_LIST,
  TYPE_NUMBER,
  TYPE_THREESTATE,
  TYPE_TIMESTAMP,
} from 'state/profile-types/const';

export const ognlValidation = (initialValues, isComposite) => (!isComposite ? {
  ognlValidation: ((initialValues
    && initialValues.validationRules
    && initialValues.validationRules.ognlValidation) && {
    ognlExpression: initialValues.validationRules.ognlValidation.ognlExpression || '',
    applyOnlyToFilledAttr:
        initialValues.validationRules.ognlValidation.applyOnlyToFilledAttr || false,
    helpMessage: initialValues.validationRules.ognlValidation.helpMessage || '',
    keyForHelpMessage: initialValues.validationRules.ognlValidation.keyForHelpMessage || '',
    errorMessage: initialValues.validationRules.ognlValidation.errorMessage || '',
    keyForErrorMessage: initialValues.validationRules.ognlValidation.keyForErrorMessage || '',
  }) || {
    ognlExpression: '',
    applyOnlyToFilledAttr: false,
    helpMessage: '',
    keyForHelpMessage: '',
    errorMessage: '',
    keyForErrorMessage: '',
  },
} : {});

const typeListOrMonolist = (initialValues, isComposite) => ({
  ...(isComposite ? {} :
    {
      nestedAttribute: {
        type: '',
      },
    }),
  ...({ validationRules: ognlValidation(initialValues, isComposite) }),
});

const typeNumber = (initialValues, isComposite) => ({
  validationRules: {
    ...initialValues.validationRules,
    ...ognlValidation(initialValues, isComposite),
    rangeStartNumber: initialValues.validationRules ? initialValues.validationRules.rangeStartNumber : '',
    rangeEndNumber: initialValues.validationRules ? initialValues.validationRules.rangeEndNumber : '',
    equalNumber: initialValues.validationRules ? initialValues.validationRules.equalNumber : '',
  },
});

const typeDate = (initialValues, isComposite) => ({
  validationRules: {
    ...initialValues.validationRules,
    ...ognlValidation(initialValues, isComposite),
    rangeStartDate: (initialValues.validationRules && initialValues.validationRules.rangeStartDate) || '',
    rangeEndDate: (initialValues.validationRules && initialValues.validationRules.rangeEndDate) || '',
    equalDate: (initialValues.validationRules && initialValues.validationRules.equalDate) || '',
  },
});

const typeEnumeration = (initialValues, isComposite) => ({
  ...{
    enumeratorStaticItems: initialValues.enumeratorStaticItems || '',
    enumeratorStaticItemsSeparator: initialValues.enumeratorStaticItemsSeparator || '',
    enumeratorExtractorBean: initialValues.enumeratorExtractorBean || '',
  },
  ...{ validationRules: { ...ognlValidation(initialValues, isComposite) } },
});

const typeEnumerationMap = (initialValues, isComposite, selectedAttributeType) => ({
  ...{
    enumeratorStaticItems: initialValues.enumeratorStaticItems || '',
    enumeratorStaticItemsSeparator: initialValues.enumeratorStaticItemsSeparator || '',
    ...(selectedAttributeType.enumeratorMapExtractorBeans && selectedAttributeType.enumeratorMapExtractorBeans.length > 0) ? { enumeratorExtractorBean: initialValues.enumeratorExtractorBean || '' } : {},
  },
  ...{
    validationRules: {
      ...ognlValidation(initialValues, isComposite),
    },
  },
});

export const selectedAttributeSectionFieldsAndOgnlValidation =
    (selectedAttributeType, initialValues, mode, isComposite) => {
      if (!selectedAttributeType) return {};
      switch (selectedAttributeType.code) {
        case TYPE_BOOLEAN:
        case TYPE_CHECKBOX:
        case TYPE_THREESTATE:
        case TYPE_TIMESTAMP:
          return {
            validationRules: {
              ...ognlValidation(initialValues, isComposite),
            },
          };
        case TYPE_MONOLIST:
        case TYPE_LIST: {
          return typeListOrMonolist(initialValues, isComposite);
        }
        case TYPE_NUMBER:
          return typeNumber(initialValues, isComposite);
        case TYPE_DATE:
          return typeDate(initialValues, isComposite);
        case TYPE_ENUMERATOR:
          return typeEnumeration(initialValues, isComposite);
        case TYPE_ENUMERATOR_MAP:
          return typeEnumerationMap(initialValues, isComposite, selectedAttributeType);
        default:
          return {
            validationRules: {
              ...initialValues.validationRules,
              ...ognlValidation(initialValues, isComposite),
              minLength: '',
              maxLength: '',
              regexp: '',
            },
          };
      }
    };

export const selectedMonolistAttributeSectionFieldsAndOgnlValidation =
    (selectedAttribute) => {
      if (!selectedAttribute) return {};
      switch (selectedAttribute.nestedAttribute.type) {
        case TYPE_BOOLEAN:
        case TYPE_CHECKBOX:
        case TYPE_THREESTATE:
        case TYPE_TIMESTAMP:
          return {
            validationRules: {
              ...ognlValidation(selectedAttribute.nestedAttribute, false),
            },
          };
        case TYPE_MONOLIST:
        case TYPE_LIST: {
          return typeListOrMonolist(selectedAttribute.nestedAttribute, false);
        }
        case TYPE_NUMBER:
          return typeNumber(selectedAttribute.nestedAttribute, false);
        case TYPE_DATE:
          return typeDate(selectedAttribute.nestedAttribute, false);
        case TYPE_ENUMERATOR:
          return typeEnumeration(selectedAttribute.nestedAttribute, false);
        case TYPE_ENUMERATOR_MAP:
          return typeEnumerationMap(
            selectedAttribute.nestedAttribute,
            false,
            selectedAttribute.nestedAttribute.type,
          );
        default:
          return {
            validationRules: {
              ...selectedAttribute.nestedAttribute.validationRules,
              ...ognlValidation(selectedAttribute.nestedAttribute, false),
              minLength: selectedAttribute.nestedAttribute.validationRules.minLength || '',
              maxLength: selectedAttribute.nestedAttribute.validationRules.maxLength || '',
              regex: selectedAttribute.nestedAttribute.validationRules.regex || '',
            },
          };
      }
    };
