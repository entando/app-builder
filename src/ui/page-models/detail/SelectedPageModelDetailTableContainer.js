import { connect } from 'react-redux';

import { getSelectedPageModel, getSelectedPageModelCellMap } from 'state/page-models/selectors';
import { getLoading } from 'state/loading/selectors';
import { loadSelectedPageModel } from 'state/page-models/actions';
import PageModelDetailTable from 'ui/page-models/detail/PageModelDetailTable';

export const mapStateToProps = state => ({
  pageModel: getSelectedPageModel(state),
  cellMap: getSelectedPageModelCellMap(state),
  loading: !!getLoading(state).pageModel,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(loadSelectedPageModel());
  },
});

const SelectedPageModelDetailTableContainer =
  connect(mapStateToProps, mapDispatchToProps)(PageModelDetailTable);

SelectedPageModelDetailTableContainer.displayName = 'SelectedPageModelDetailTableContainer';

export default SelectedPageModelDetailTableContainer;
