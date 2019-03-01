import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { sendDeleteDigitalExchange } from 'state/digital-exchange/digital-exchanges/actions';
import DeleteSettingsModal from 'ui/digital-exchange/settings/list/DeleteSettingsModal';

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = dispatch => ({
  onConfirmDelete: (id) => {
    dispatch(sendDeleteDigitalExchange(id));
    dispatch(setVisibleModal(''));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteSettingsModal);
