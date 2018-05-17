import { connect } from 'react-redux';
import { fetchReferences } from 'state/groups/actions';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import { getWidgetTypeReferences } from 'state/groups/selectors';
import { getLoading } from 'state/loading/selectors';
import GroupDetailTabWidgetTypes from 'ui/groups/detail/GroupDetailTabWidgetTypes';
import { WIDGET_TYPE_REFERENCE_KEY } from 'ui/common/references/const';

export const mapStateToProps = state => ({
  widgetReferences: getWidgetTypeReferences(state),
  page: getCurrentPage(state),
  totalItems: getTotalItems(state),
  pageSize: getPageSize(state),
  loading: getLoading(state).references,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: (page) => {
    dispatch(fetchReferences(WIDGET_TYPE_REFERENCE_KEY, page));
  },
});

const GroupDetailTabWidgetTypesContainer =
  connect(mapStateToProps, mapDispatchToProps)(GroupDetailTabWidgetTypes);
export default GroupDetailTabWidgetTypesContainer;
