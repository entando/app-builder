import { connect } from 'react-redux';
import { routeConverter } from '@entando/utils';
import { formValueSelector, submit } from 'redux-form';
import { withRouter } from 'react-router-dom';

import { fetchProfileTypeAttributes, sendPostProfileType, setSelectedAttribute } from 'state/profile-types/actions';
import { getProfileTypeAttributesIdList } from 'state/profile-types/selectors';
import { setVisibleModal } from 'state/modal/actions';
import { ROUTE_PROFILE_TYPE_LIST } from 'app-init/router';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';

import ProfileTypeForm from 'ui/profile-types/common/ProfileTypeForm';

export const mapStateToProps = state => ({
  mode: 'add',
  attributesType: getProfileTypeAttributesIdList(state),
  attributeCode: formValueSelector('ProfileType')(state, 'type'),
});

export const mapDispatchToProps = (dispatch, { history }) => ({
  onWillMount: () => {
    dispatch(setSelectedAttribute({}));
    dispatch(fetchProfileTypeAttributes());
  },
  onSubmit: (values) => {
    dispatch(sendPostProfileType({
      ...values,
      code: values.code && values.code.toUpperCase(),
    }));
  },
  onSave: () => { dispatch(setVisibleModal('')); dispatch(submit('ProfileType')); },
  onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
  onDiscard: () => { dispatch(setVisibleModal('')); history.push(routeConverter(ROUTE_PROFILE_TYPE_LIST)); },
});
const AddFormContainer = connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(ProfileTypeForm);


export default withRouter(AddFormContainer);
