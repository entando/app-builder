import { connect } from 'react-redux';
import FragmentForm from 'ui/fragments/common/FragmentForm';
import { sendPostFragment } from 'state/fragments/actions';
import { DEFAULT_FORM_VALUES } from 'state/fragments/const';
import { withRouter } from 'react-router-dom';
import { routeConverter } from '@entando/utils';
import { setVisibleModal } from 'state/modal/actions';
import { ROUTE_FRAGMENT_LIST } from 'app-init/router';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';

export const mapStateToProps = () => ({
  initialValues: DEFAULT_FORM_VALUES,
});

export const mapDispatchToProps = (dispatch, { history }) => ({
  onSubmit: (fragment, saveType) => dispatch(sendPostFragment(fragment, saveType)),
  onHideCancelModal: () => { dispatch(setVisibleModal('')); },
  onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
  onDiscard: () => { dispatch(setVisibleModal('')); history.push(routeConverter(ROUTE_FRAGMENT_LIST)); },
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps, null, {
    pure: false,
  },
)(FragmentForm));
