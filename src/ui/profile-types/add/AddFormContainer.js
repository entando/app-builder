import { connect } from 'react-redux';
import { fetchProfileTypeAttributes, sendPostProfileType } from 'state/profile-types/actions';
import { getProfileTypeAttributesIdList } from 'state/profile-types/selectors';
import ProfileTypeForm from 'ui/profile-types/common/ProfileTypeForm';
import { formValueSelector } from 'redux-form';

export const mapStateToProps = state => ({
  mode: 'add',
  attributesType: getProfileTypeAttributesIdList(state),
  attributeCode: formValueSelector('ProfileType')(state, 'type'),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchProfileTypeAttributes());
  },
  onSubmit: (values) => {
    dispatch(sendPostProfileType({
      ...values,
      code: values.code && values.code.toUpperCase(),
    }));
  },

});
const AddFormContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileTypeForm);
export default AddFormContainer;
