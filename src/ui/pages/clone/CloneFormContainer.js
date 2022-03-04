import { connect } from 'react-redux';
import { formValueSelector, change } from 'redux-form';
import { routeConverter } from '@entando/utils';

import { ACTION_SAVE, ACTION_SAVE_AND_CONFIGURE } from 'state/pages/const';
import PageForm from 'ui/pages/common/PageForm';
import { fetchLanguages } from 'state/languages/actions';
import { getActiveLanguages } from 'state/languages/selectors';
import { getGroupsList } from 'state/groups/selectors';
import { getPageTemplatesList } from 'state/page-templates/selectors';
import { getCharsets, getContentTypes } from 'state/pages/selectors';
import { sendClonePage } from 'state/pages/actions';
import { history, ROUTE_PAGE_TREE, ROUTE_PAGE_CONFIG } from 'app-init/router';
import { setVisibleModal } from 'state/modal/actions';
import getSearchParam from 'helpers/getSearchParam';
import getRuntimeEnv from 'helpers/getRuntimeEnv';
import { openInNewTab } from 'helpers/urlUtils';
import { NEXT_PAGE_TEMPLATE } from 'ui/pages/common/const';

const { WEBUI_ENABLED, WEBUI_DEV_WORKSPACE_URL } = getRuntimeEnv();

export const mapStateToProps = state => ({
  languages: getActiveLanguages(state),
  groups: getGroupsList(state),
  pageTemplates: getPageTemplatesList(state),
  charsets: getCharsets(state),
  contentTypes: getContentTypes(state),
  selectedJoinGroups: formValueSelector('page')(state, 'joinGroups') || [],
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
          if (WEBUI_ENABLED && data.pageModel === NEXT_PAGE_TEMPLATE) {
            openInNewTab(WEBUI_DEV_WORKSPACE_URL);
            history.push(ROUTE_PAGE_TREE);
          } else {
            history.push(routeConverter(ROUTE_PAGE_CONFIG, { pageCode: data.code }));
          }
          break;
        }
        default: history.push(ROUTE_PAGE_TREE);
      }
    });
  },
  onChangeDefaultTitle: title =>
    dispatch(change('page', 'code', title.replace(/\W/g, '_').toLowerCase())),
  onFindTemplateClick: () => dispatch(setVisibleModal('FindTemplateModal')),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(PageForm);
