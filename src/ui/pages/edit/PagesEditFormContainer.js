import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { routeConverter } from '@entando/utils';

import PageForm from 'ui/pages/common/PageForm';
import { getActiveLanguages } from 'state/languages/selectors';
import { getGroupsList } from 'state/groups/selectors';
import { getPageTemplatesList } from 'state/page-templates/selectors';
import { getCharsets, getContentTypes, getPageTreePages } from 'state/pages/selectors';
import { ACTION_SAVE, ACTION_SAVE_AND_CONFIGURE, SEO_ENABLED } from 'state/pages/const';
import { handleExpandPage, sendPutPage, fetchPageForm, clearTree } from 'state/pages/actions';
import { fetchGroups } from 'state/groups/actions';
import { fetchPageTemplates } from 'state/page-templates/actions';
import { history, ROUTE_PAGE_TREE, ROUTE_PAGE_CONFIG } from 'app-init/router';
import { fetchLanguages } from 'state/languages/actions';

export const mapStateToProps = (state, { match: { params } }) => ({
  languages: getActiveLanguages(state),
  groups: getGroupsList(state),
  pageTemplates: getPageTemplatesList(state),
  pages: getPageTreePages(state),
  charsets: getCharsets(state),
  contentTypes: getContentTypes(state),
  selectedJoinGroups: formValueSelector('page')(state, 'joinGroups') || [],
  seoMode: SEO_ENABLED,
  mode: 'edit',
  pageCode: params.pageCode,
});


export const mapDispatchToProps = dispatch => ({
  onSubmit: (data, action) =>
    dispatch(sendPutPage(data)).then(() => {
      switch (action) {
        case ACTION_SAVE: {
          history.push(ROUTE_PAGE_TREE);
          break;
        }
        case ACTION_SAVE_AND_CONFIGURE: {
          history.push(routeConverter(ROUTE_PAGE_CONFIG, { pageCode: data.code }));
          break;
        }
        default: history.push(ROUTE_PAGE_TREE);
      }
    }).catch(() => {}),
  onWillMount: ({ pageCode }) => {
    dispatch(clearTree());
    dispatch(fetchLanguages({ page: 1, pageSize: 0 }));
    dispatch(fetchGroups({ page: 1, pageSize: 0 }));
    dispatch(fetchPageTemplates({ page: 1, pageSize: 0 }));
    dispatch(handleExpandPage());
    dispatch(fetchPageForm(pageCode));
  },
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(PageForm));
