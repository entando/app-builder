import { connect } from 'react-redux';
import { convertToQueryString } from '@entando/utils';

import PagesList from 'ui/dashboard/PagesList';
import { fetchDashboardPages } from 'state/pages/actions';
import { getDashboardPages } from 'state/pages/selectors';
import { setColumnOrder } from 'state/table-column-order/actions';
import { getColumnOrder } from 'state/table-column-order/selectors';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import { getLocale } from 'state/locale/selectors';

import { withPermissionValues } from 'ui/auth/withPermissions';

export const mapDispatchToProps = dispatch => ({
  onWillMount: (page = 1, pageSize = 5) => {
    const queryString = convertToQueryString({
      sorting: {
        attribute: 'lastModified',
        direction: 'DESC',
      },
    });
    // todo here
    dispatch(fetchDashboardPages({ page, pageSize }, queryString));
  },
  onSetColumnOrder: columnOrder => dispatch(setColumnOrder(columnOrder, 'dashboardPageList')),
});

export const mapStateToProps = state => (
  {
    pages: getDashboardPages(state),
    page: getCurrentPage(state),
    totalItems: getTotalItems(state),
    pageSize: getPageSize(state),
    language: getLocale(state),
    columnOrder: getColumnOrder(state, 'dashboardPageList'),
  }
);

export default withPermissionValues(connect(
  mapStateToProps,
  mapDispatchToProps,
)(PagesList));
