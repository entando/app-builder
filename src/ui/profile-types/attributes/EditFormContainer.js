import { connect } from 'react-redux';
import {
  fetchAttributeFromProfileType,
  sendPutAttributeFromProfileType,
  fetchProfileTypeAttributes,
} from 'state/profile-types/actions';
import { formValueSelector } from 'redux-form';
import { getParams } from '@entando/router';
import EditAttributeForm from 'ui/common/form/EditAttributeForm';
import {
  getSelectedAttributeType,
  getProfileTypeAttributesIdList,
} from 'state/profile-types/selectors';


export const mapStateToProps = state => ({
  attributeCode: getParams(state).attributeCode,
  profileTypeAttributeCode: getParams(state).entityCode,
  JoinAllowedOptions: formValueSelector('attribute')(state, 'joinRoles') || [],
  selectedAttributeType: getSelectedAttributeType(state),
  attributesList: getProfileTypeAttributesIdList(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: ({ profileTypeAttributeCode, attributeCode }) => {
    dispatch(fetchAttributeFromProfileType(profileTypeAttributeCode, attributeCode));
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
    console.log('PUT values', values);
    dispatch(sendPutAttributeFromProfileType(payload));
  },
});

const EditFormContainer =
connect(mapStateToProps, mapDispatchToProps)(EditAttributeForm);
export default EditFormContainer;
