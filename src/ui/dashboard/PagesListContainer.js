import { connect } from 'react-redux';
import { convertToQueryString } from '@entando/utils';

import PagesList from 'ui/dashboard/PagesList';
import { fetchSearchPages } from 'state/pages/actions';
import { getSearchPages } from 'state/pages/selectors';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import { getLocale } from 'state/locale/selectors';

import { withPermissionValues } from 'ui/auth/withPermissions';

export const mapDispatchToProps = dispatch => ({
  onWillMount: (page = 1) => {
    const queryString = convertToQueryString({
      sorting: {
        attribute: 'lastModified',
        direction: 'DESC',
      },
    });
    dispatch(fetchSearchPages({ page, pageSize: 5 }, queryString));
  },
});

export const mapStateToProps = state => (
  {
    pages: getSearchPages(state),
    page: getCurrentPage(state),
    totalItems: getTotalItems(state),
    pageSize: getPageSize(state),
    language: getLocale(state),
  }
);

export default withPermissionValues(connect(
  mapStateToProps,
  mapDispatchToProps,
)(PagesList));
