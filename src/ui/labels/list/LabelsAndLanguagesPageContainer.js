import { connect } from 'react-redux';

import LabelsAndLanguagesPage from 'ui/labels/list/LabelsAndLanguagesPage';
import { fetchLanguages } from 'state/languages/actions';
import { fetchLabels } from 'state/labels/actions';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import { getLoading } from 'state/loading/selectors';

export const mapStateToProps = state => (
  {
    page: getCurrentPage(state),
    totalItems: getTotalItems(state),
    pageSize: getPageSize(state),
    loadingLabels: getLoading(state).systemLabels,
    loadingLangs: getLoading(state).languages,
  }
);

export const mapDispatchToProps = dispatch => ({
  onWillMount: (page) => {
    dispatch(fetchLanguages());
    dispatch(fetchLabels(page));
  },
});

const LabelsAndLanguagesPageContainer =
  connect(mapStateToProps, mapDispatchToProps)(LabelsAndLanguagesPage);

export default LabelsAndLanguagesPageContainer;
