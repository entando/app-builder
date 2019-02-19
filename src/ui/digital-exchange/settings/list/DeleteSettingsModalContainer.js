import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { sendDeleteDEMarketplaces } from 'state/digital-exchange/marketplaces/actions';
import DeleteSettingsModal from 'ui/digital-exchange/settings/list/DeleteSettingsModal';

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = dispatch => ({
  onConfirmDelete: (id) => {
    dispatch(sendDeleteDEMarketplaces(id));
    dispatch(setVisibleModal(''));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteSettingsModal);
