import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchProfileTypeAttributes, sendPostAttributeFromProfileType } from 'state/profile-types/actions';
import { formValueSelector } from 'redux-form';
import AttributeForm from 'ui/common/form/AttributeForm';
import {
  getProfileTypeSelectedAttribute,
  getProfileTypeSelectedAttributeCode,
  getProfileTypeAttributesIdList,
} from 'state/profile-types/selectors';


export const mapStateToProps = (state, { match: { params } }) => ({
  profileTypeAttributeCode: params.entityCode,
  joinAllowedOptions: formValueSelector('attribute')(state, 'joinRoles') || [],
  selectedAttributeType: getProfileTypeSelectedAttribute(state),
  attributesList: getProfileTypeAttributesIdList(state),
  initialValues: {
    type: getProfileTypeSelectedAttributeCode(state),
  },
});

export const mapDispatchToProps = (dispatch, { match: { params } }) => ({
  onWillMount: () => {
    dispatch(fetchProfileTypeAttributes());
  },
  onSubmit: (values) => {
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
    };
    dispatch(sendPostAttributeFromProfileType(payload, params.entityCode));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AttributeForm));
