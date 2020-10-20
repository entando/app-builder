import { connect } from 'react-redux';
import { convertToQueryString } from '@entando/utils';
import { clearErrors } from '@entando/messages';
import PageTreePage from 'ui/pages/list/PageTreePage';
import { handleExpandPage, fetchSearchPages, clearSearchPage, clearTree } from 'state/pages/actions';
import { getLocale } from 'state/locale/selectors';
import { getSearchPages } from 'state/pages/selectors';
import { toggleLoading } from 'state/loading/actions';
import { getLoading } from 'state/loading/selectors';
import withPermissions from 'ui/auth/withPermissions';
import { MANAGE_PAGES_PERMISSION } from 'state/permissions/const';
import { setAppTourLastStep } from 'state/app-tour/actions';

export const mapStateToProps = state => ({
  locale: getLocale(state),
  search: getSearchPages(state),
  loading: getLoading(state).pageTree,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(clearErrors());
    dispatch(clearTree());
    dispatch(clearSearchPage());
    dispatch(toggleLoading('pageTree'));
    dispatch(handleExpandPage())
      .then(() => dispatch(toggleLoading('pageTree')))
      .catch(() => dispatch(toggleLoading('pageTree')));
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
  onNextStep: nextStep => dispatch(setAppTourLastStep(nextStep)),
});


const PageTreeContainer = connect(mapStateToProps, mapDispatchToProps)(PageTreePage);


export default withPermissions(MANAGE_PAGES_PERMISSION)(PageTreeContainer);
