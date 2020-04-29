import { connect } from 'react-redux';

import { fetchComponentRepositories } from 'state/component-repository/component-repositories/actions';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { getComponentRepositoryList } from 'state/component-repository/component-repositories/selectors';
import { getLoading } from 'state/loading/selectors';
import SettingsList from 'ui/component-repository/settings/list/SettingsList';
import { MODAL_ID } from 'ui/component-repository/settings/list/DeleteSettingsModal';

export const mapStateToProps = state => (
  {
    marketplaces: getComponentRepositoryList(state),
    loading: getLoading(state).componentRepositoryList,
  }
);

export const mapDispatchToProps = dispatch => ({
  onWillMount: (page = { page: 1, pageSize: 30 }) => {
    dispatch(fetchComponentRepositories(page));
  },
  onClickDelete: (marketplace) => {
    dispatch(setVisibleModal(MODAL_ID));
    dispatch(setInfo({ type: 'Component Repository', id: marketplace.id, name: marketplace.name }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsList);
