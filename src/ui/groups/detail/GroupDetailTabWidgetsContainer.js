import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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

export const mapDispatchToProps = (dispatch, { match: { params } }) => ({
  onWillMount: (page) => {
    dispatch(fetchReferences(WIDGET_TYPE_REFERENCE_KEY, params.groupname, page));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupDetailTabWidgetTypes));
