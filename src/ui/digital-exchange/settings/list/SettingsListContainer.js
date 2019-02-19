import { connect } from 'react-redux';

import { fetchDEMarketplaces } from 'state/digital-exchange/marketplaces/actions';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { getDEMarketplaceList } from 'state/digital-exchange/marketplaces/selectors';
import { getLoading } from 'state/loading/selectors';
import SettingsList from 'ui/digital-exchange/settings/list/SettingsList';
import { MODAL_ID } from 'ui/digital-exchange/settings/list/DeleteSettingsModal';

export const mapStateToProps = state => (
  {
    marketplaces: getDEMarketplaceList(state),
    loading: getLoading(state).digitalExchangeMarketplaces,
  }
);

export const mapDispatchToProps = dispatch => ({
  onWillMount: (page = { page: 1, pageSize: 30 }) => {
    dispatch(fetchDEMarketplaces(page));
  },
  onClickDelete: (marketplace) => {
    dispatch(setVisibleModal(MODAL_ID));
    dispatch(setInfo({ type: 'Digital Exchange', id: marketplace.id, name: marketplace.name }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsList);
