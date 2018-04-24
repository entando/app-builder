import { connect } from 'react-redux';
import { convertToQueryString } from '@entando/utils';

import PageTreePage from 'ui/pages/list/PageTreePage';

import { handleExpandPage, fetchSearchPages, clearSearchPage } from 'state/pages/actions';

import { getLocale } from 'state/locale/selectors';

import { getSearchPages } from 'state/pages/selectors';

export const mapStateToProps = state => ({
  locale: getLocale(state),
  search: getSearchPages(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(handleExpandPage());
  },
  onClear: () => {
    dispatch(clearSearchPage());
  },
  onSubmit: (params) => {
    const queryString = `${convertToQueryString({
      sorting: {
        attribute: 'code',
      },
    })}&pageCodeToken=${params.pageCodeToken}`;
    dispatch(fetchSearchPages({ page: 1, pageSize: 100 }, queryString));
  },
});


const PageTreeContainer = connect(mapStateToProps, mapDispatchToProps)(PageTreePage);


export default PageTreeContainer;
