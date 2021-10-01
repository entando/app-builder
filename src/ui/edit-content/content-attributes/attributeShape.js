import PropTypes from 'prop-types';

const attributeShape = {
  // contentType attribute properties

  code: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  roles: PropTypes.arrayOf(PropTypes.object),
  disablingCodes: PropTypes.arrayOf(PropTypes.string),
  mandatory: PropTypes.bool,
  listFilter: PropTypes.bool,
  indexable: PropTypes.bool,
  enumeratorStaticItems: PropTypes.string,
  enumeratorStaticItemsSeparator: PropTypes.string,
  enumeratorExtractorBean: PropTypes.string,
  validationRules: PropTypes.shape({
    minLength: PropTypes.number,
    maxLength: PropTypes.number,
    regex: PropTypes.string,
    rangeStartString: PropTypes.string,
    rangeEndString: PropTypes.string,
    rangeStartStringAttribute: PropTypes.string,
    rangeEndStringAttribute: PropTypes.string,
    equalString: PropTypes.string,
    equalStringAttribute: PropTypes.string,
    rangeStartDate: PropTypes.string,
    rangeEndDate: PropTypes.string,
    rangeStartDateAttribute: PropTypes.string,
    rangeEndDateAttribute: PropTypes.string,
    equalDate: PropTypes.string,
    equalDateAttribute: PropTypes.string,
    rangeStartNumber: PropTypes.number,
    rangeStartNumberAttribute: PropTypes.string,
    rangeEndNumber: PropTypes.number,
    rangeEndNumberAttribute: PropTypes.string,
    equalNumber: PropTypes.number,
    equalNumberAttribute: PropTypes.string,
    ognlValidation: PropTypes.shape({
      applyOnlyToFilledAttr: PropTypes.bool,
      errorMessage: PropTypes.string,
      helpMessage: PropTypes.string,
      keyForErrorMessage: PropTypes.string,
      keyForHelpMessage: PropTypes.string,
      ognlExpression: PropTypes.string,
    }),
  }),

  nestedAttribute: PropTypes.object,
  compositeAttributes: PropTypes.array,

  // content attribute properties

  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object,
  ]),
  values: PropTypes.object,
  elements: PropTypes.array,
  compositeelements: PropTypes.array,
  listelements: PropTypes.object,
};

export default attributeShape;
