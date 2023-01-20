import { connect } from 'react-redux';

import LabelsAndLanguagesPage from 'ui/labels/list/LabelsAndLanguagesPage';
import { fetchLanguages } from 'state/languages/actions';
import { fetchLabels, setActiveTab } from 'state/labels/actions';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import { getActiveTab } from 'state/labels/selectors';
import { getLoading } from 'state/loading/selectors';
import withPermissions from 'ui/auth/withPermissions';
import { SUPERUSER_PERMISSION } from 'state/permissions/const';

const TAB_LANGUAGES = 'languages';

export const mapStateToProps = state => (
  {
    page: getCurrentPage(state),
    totalItems: getTotalItems(state),
    pageSize: getPageSize(state),
    loadingLabels: getLoading(state).systemLabels,
    loadingLangs: getLoading(state).languages,
    activeTab: getActiveTab(state) || TAB_LANGUAGES,
  }
);

export const mapDispatchToProps = dispatch => ({
  onClickTab: tabId => dispatch(setActiveTab(tabId)),
  onWillMount: (page) => {
    dispatch(fetchLanguages({ page: 1, pageSize: 0 }));
    dispatch(fetchLabels(page));
  },
});

const LabelsAndLanguagesPageContainer =
  connect(mapStateToProps, mapDispatchToProps)(LabelsAndLanguagesPage);

export default withPermissions(SUPERUSER_PERMISSION)(LabelsAndLanguagesPageContainer);
