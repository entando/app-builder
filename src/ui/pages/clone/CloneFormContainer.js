import { connect } from 'react-redux';
import { routeConverter } from '@entando/utils';

import { ACTION_SAVE, ACTION_SAVE_AND_CONFIGURE } from 'state/pages/const';
import PageForm from 'ui/pages/common/PageForm';
import { fetchLanguages } from 'state/languages/actions';
import { getActiveLanguages } from 'state/languages/selectors';
import { sendClonePage } from 'state/pages/actions';
import { history, ROUTE_PAGE_TREE, ROUTE_PAGE_CONFIG } from 'app-init/router';
import getSearchParam from 'helpers/getSearchParam';

export const mapStateToProps = state => ({
  languages: getActiveLanguages(state),
  mode: 'clone',
  keepDirtyOnReinitialize: true,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchLanguages({ page: 1, pageSize: 0 }));
  },
  onSubmit: (data, action) => {
    const pageCode = getSearchParam('pageCode');

    return dispatch(sendClonePage(pageCode, data)).then(() => {
      const redirectTo = getSearchParam('redirectTo');
      switch (action) {
        case ACTION_SAVE: {
          if (redirectTo) {
            const hasPageCode = redirectTo.includes(':pageCode');
            const redirectToUrl = hasPageCode
              ? routeConverter(redirectTo, { pageCode: data.code }) : redirectTo;
            history.push(redirectToUrl);
          } else {
            history.push(ROUTE_PAGE_TREE);
          }
          break;
        }
        case ACTION_SAVE_AND_CONFIGURE: {
          history.push(routeConverter(ROUTE_PAGE_CONFIG, { pageCode: data.code }));
          break;
        }
        default: history.push(ROUTE_PAGE_TREE);
      }
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(PageForm);
