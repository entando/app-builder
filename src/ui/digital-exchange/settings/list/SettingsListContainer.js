import { connect } from 'react-redux';

import { fetchDigitalExchanges } from 'state/digital-exchange/digital-exchanges/actions';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { getDigitalExchangeList } from 'state/digital-exchange/digital-exchanges/selectors';
import { getLoading } from 'state/loading/selectors';
import SettingsList from 'ui/digital-exchange/settings/list/SettingsList';
import { MODAL_ID } from 'ui/digital-exchange/settings/list/DeleteSettingsModal';

export const mapStateToProps = state => (
  {
    marketplaces: getDigitalExchangeList(state),
    loading: getLoading(state).digitalExchangeList,
  }
);

export const mapDispatchToProps = dispatch => ({
  onWillMount: (page = { page: 1, pageSize: 30 }) => {
    dispatch(fetchDigitalExchanges(page));
  },
  onClickDelete: (marketplace) => {
    dispatch(setVisibleModal(MODAL_ID));
    dispatch(setInfo({ type: 'Digital Exchange', id: marketplace.id, name: marketplace.name }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsList);
