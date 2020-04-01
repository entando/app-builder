import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';

import ConfirmCancelModal from 'ui/common/cancel-modal/ConfirmCancelModal';

export const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(setVisibleModal('')),
});

const ConfirmCancelModalContainer = connect(
  null,
  mapDispatchToProps,
)(ConfirmCancelModal);

export default ConfirmCancelModalContainer;
