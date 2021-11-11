import { connect } from 'react-redux';

import FragmentForm from 'ui/fragments/common/FragmentForm';
import { sendPutFragment } from 'state/fragments/actions';
import { withRouter } from 'react-router-dom';
import { routeConverter } from '@entando/utils';
import { setVisibleModal } from 'state/modal/actions';
import { getFragmentSelected } from 'state/fragments/selectors';
import { ROUTE_FRAGMENT_LIST } from 'app-init/router';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';
import { FORM_MODE_EDIT, DEFAULT_EDITED_FORM_VALUES } from 'state/fragments/const';

export const mapStateToProps = state => (
  {
    mode: FORM_MODE_EDIT,
    initialValues: getFragmentSelected(state) || DEFAULT_EDITED_FORM_VALUES,
  });


export const mapDispatchToProps = (dispatch, { history }) => ({
  onSubmit: (fragment, saveType) => dispatch(sendPutFragment(fragment, saveType)),
  onHideCancelModal: () => { dispatch(setVisibleModal('')); },
  onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
  onDiscard: () => { dispatch(setVisibleModal('')); history.push(routeConverter(ROUTE_FRAGMENT_LIST)); },
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(FragmentForm));
