import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchProfileTypeAttributes, sendPostAttributeFromProfileType } from 'state/profile-types/actions';
import { formValueSelector } from 'redux-form';
import AttributeForm from 'ui/common/form/AttributeForm';
import {
  getProfileTypeSelectedAttribute,
  getProfileTypeSelectedAttributeCode,
  getProfileTypeAttributesIdList,
  getProfileTypeSelectedAttributeAllowedRoles,
  getProfileTypeSelectedAttributeRoleChoices,
} from 'state/profile-types/selectors';


export const mapStateToProps = (state, { match: { params } }) => {
  const joinAllowedOptions = formValueSelector('addAttribute')(state, 'joinRoles') || [];
  return {
    profileTypeAttributeCode: params.entityCode,
    joinAllowedOptions,
    selectedAttributeType: getProfileTypeSelectedAttribute(state),
    attributesList: getProfileTypeAttributesIdList(state),
    allRoles: getProfileTypeSelectedAttributeAllowedRoles(state),
    allowedRoles: getProfileTypeSelectedAttributeRoleChoices(
      params.attributeCode,
      joinAllowedOptions,
    )(state),
    initialValues: {
      type: getProfileTypeSelectedAttributeCode(state),
    },
  };
};

export const mapDispatchToProps = (dispatch, { match: { params } }) => ({
  onWillMount: () => {
    dispatch(fetchProfileTypeAttributes());
  },
  onSubmit: (values, allowedRoles) => {
    const payload = {
      ...values,
      code: values.code,
      type: values.type,
      nestedAttribute: {
        ...values.nestedAttribute,
        code: values.code,
        enumeratorStaticItems: 'default',
        enumeratorStaticItemsSeparator: ',',
      },
      roles: values.joinRoles
        ? values.joinRoles.map(roleId => ({ code: roleId, descr: allowedRoles[roleId] }))
        : [],
    };
    dispatch(sendPostAttributeFromProfileType(payload, params.entityCode));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(AttributeForm));
