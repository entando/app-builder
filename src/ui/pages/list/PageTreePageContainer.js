import { connect } from 'react-redux';
import { convertToQueryString } from '@entando/utils';

import PageTreePage from 'ui/pages/list/PageTreePage';
import { handleExpandPage, fetchSearchPages, clearSearchPage, clearTree } from 'state/pages/actions';
import { getLocale } from 'state/locale/selectors';
import { getSearchPages } from 'state/pages/selectors';

export const mapStateToProps = state => ({
  locale: getLocale(state),
  search: getSearchPages(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(clearTree());
    dispatch(clearSearchPage());
    dispatch(handleExpandPage());
  },
  onClear: () => {
    dispatch(clearSearchPage());
  },
  onSubmit: (params) => {
    let queryString = convertToQueryString({
      sorting: {
        attribute: 'code',
      },
    });
    if (params.pageCodeToken) {
      queryString = `${queryString}&pageCodeToken=${params.pageCodeToken}`;
      dispatch(fetchSearchPages({ page: 1, pageSize: 100 }, queryString));
    }
  },
});


const PageTreeContainer = connect(mapStateToProps, mapDispatchToProps)(PageTreePage);


export default PageTreeContainer;
