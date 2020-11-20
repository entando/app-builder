import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  fetchAttributeFromProfileType,
  sendPutAttributeFromProfileType,
  fetchProfileTypeAttributes,
  fetchProfileTypeAttribute,
} from 'state/profile-types/actions';
import { formValueSelector } from 'redux-form';
import EditAttributeForm from 'ui/common/form/EditAttributeForm';
import {
  getSelectedAttributeType,
  getProfileTypeAttributesIdList,
  getProfileTypeSelectedAttributeIndexable,
  getProfileTypeSelectedAttributeSearchable,
  getProfileTypeSelectedAttributeAllowedRoles,
  getProfileTypeSelectedAttributeRoleChoices,
} from 'state/profile-types/selectors';

const converDate = date => `${date.split('/').reverse().join('-')} 00:00:00`;

export const mapStateToProps = (state, { match: { params } }) => {
  const joinAllowedOptions = formValueSelector('attribute')(state, 'joinRoles') || [];
  return {
    attributeCode: params.attributeCode,
    profileTypeAttributeCode: params.entityCode,
    joinAllowedOptions,
    selectedAttributeType: getSelectedAttributeType(state),
    attributesList: getProfileTypeAttributesIdList(state),
    allRoles: getProfileTypeSelectedAttributeAllowedRoles(state),
    allowedRoles: getProfileTypeSelectedAttributeRoleChoices(
      params.attributeCode,
      joinAllowedOptions,
    )(state),
    isSearchable: getProfileTypeSelectedAttributeSearchable(state),
    isIndexable: getProfileTypeSelectedAttributeIndexable(state),
  };
};

export const mapDispatchToProps = (dispatch, { match: { params } }) => ({
  onWillMount: ({ profileTypeAttributeCode, attributeCode }) => {
    dispatch(fetchAttributeFromProfileType(profileTypeAttributeCode, attributeCode));
    dispatch(fetchProfileTypeAttributes());
  },
  fetchAttributeDetails: (selectedAttributeType) => {
    dispatch(fetchProfileTypeAttribute(params.entityCode, selectedAttributeType));
  },
  onSubmit: (values, allowedRoles) => {
    let {
      rangeStartDate, rangeEndDate, equalDate,
      rangeStartDateAttribute, rangeEndDateAttribute, equalDateAttribute,
    } = values.validationRules;
    rangeStartDate = rangeStartDate && converDate(rangeStartDate);
    rangeEndDate = rangeEndDate && converDate(rangeEndDate);
    equalDate = equalDate && converDate(equalDate);
    rangeStartDateAttribute = rangeStartDateAttribute && converDate(rangeStartDateAttribute);
    rangeEndDateAttribute = rangeEndDateAttribute && converDate(rangeEndDateAttribute);
    equalDateAttribute = equalDateAttribute && converDate(equalDateAttribute);
    const payload = {
      ...values,
      validationRules: {
        ...values.validationRules,
        rangeStartDate,
        rangeEndDate,
        equalDate,
        rangeStartDateAttribute,
        rangeEndDateAttribute,
        equalDateAttribute,
      },
      code: values.code,
      type: values.type,
      roles: values.joinRoles
        ? values.joinRoles.map(roleId => ({ code: roleId, descr: allowedRoles[roleId] }))
        : [],
      nestedAttribute: {
        ...values.nestedAttribute,
        code: values.code,
        enumeratorStaticItems: 'default',
        enumeratorStaticItemsSeparator: ',',
      },
    };
    dispatch(sendPutAttributeFromProfileType(payload, params.entityCode));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(EditAttributeForm));
