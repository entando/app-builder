import { connect } from 'react-redux';
import { convertToQueryString } from '@entando/utils';
import { clearErrors } from '@entando/messages';
import { formValueSelector } from 'redux-form';

import PageTreePage from 'ui/pages/list/PageTreePage';
import { handleExpandPage, fetchSearchPages, clearSearchPage, clearTree } from 'state/pages/actions';
import { getLocale } from 'state/locale/selectors';
import { getSearchPages } from 'state/pages/selectors';
import { toggleLoading } from 'state/loading/actions';
import { getLoading } from 'state/loading/selectors';
import withPermissions from 'ui/auth/withPermissions';
import { MANAGE_PAGES_PERMISSION } from 'state/permissions/const';
import { setAppTourLastStep } from 'state/app-tour/actions';
import { APP_TOUR_HOMEPAGE_CODEREF, APP_TOUR_CANCELLED } from 'state/app-tour/const';
import { getAppTourProgress } from 'state/app-tour/selectors';
import { fetchLanguages } from 'state/languages/actions';

export const mapStateToProps = state => ({
  locale: getLocale(state),
  search: getSearchPages(state),
  loading: getLoading(state).pageTree,
  searchPageCodeToken: formValueSelector('pageSearch')(state, 'pageCodeToken'),
  appTourProgress: getAppTourProgress(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: ({ appTourProgress }) => {
    dispatch(clearErrors());
    dispatch(clearTree());
    dispatch(clearSearchPage());
    dispatch(toggleLoading('pageTree'));
    dispatch(handleExpandPage())
      .then(() => {
        if (appTourProgress !== APP_TOUR_CANCELLED) {
          dispatch(handleExpandPage(APP_TOUR_HOMEPAGE_CODEREF)).finally(() => dispatch(toggleLoading('pageTree')));
        } else {
          dispatch(toggleLoading('pageTree'));
        }
      })
      .catch(() => dispatch(toggleLoading('pageTree')));
    dispatch(fetchLanguages({ page: 1, pageSize: 0 }));
  },
  onClear: () => {
    dispatch(clearSearchPage());
  },
  onSubmit: ({ pageCodeToken, searchType }) => {
    let queryString = convertToQueryString({
      sorting: {
        attribute: 'code',
      },
    });

    if (pageCodeToken) {
      queryString = `${queryString}&${searchType}=${pageCodeToken}`;
      dispatch(fetchSearchPages({ page: 1, pageSize: 100 }, queryString));
    }
  },
  onNextStep: nextStep => dispatch(setAppTourLastStep(nextStep)),
});


const PageTreeContainer = connect(mapStateToProps, mapDispatchToProps)(PageTreePage);


export default withPermissions(MANAGE_PAGES_PERMISSION)(PageTreeContainer);
