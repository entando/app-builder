import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { routeConverter } from '@entando/utils';

import PageForm from 'ui/pages/common/PageForm';
import { getActiveLanguages } from 'state/languages/selectors';
import { getGroupEntries, getGroupsList } from 'state/groups/selectors';
import { getPageTemplatesList } from 'state/page-templates/selectors';
import { getCharsets, getContentTypes, getPageTreePages } from 'state/pages/selectors';
import { ACTION_SAVE, ACTION_SAVE_AND_CONFIGURE, SEO_ENABLED } from 'state/pages/const';
import { sendPutPage, fetchPageForm } from 'state/pages/actions';
import { fetchAllGroupEntries, fetchMyGroups } from 'state/groups/actions';
import { fetchPageTemplates } from 'state/page-templates/actions';
import { history, ROUTE_PAGE_TREE, ROUTE_PAGE_CONFIG } from 'app-init/router';
import { fetchLanguages } from 'state/languages/actions';
import { setVisibleModal } from 'state/modal/actions';
import { formValueSelector } from 'redux-form';

export const FORM_ID = 'pageEdit';

export const mapStateToProps = (state, { match: { params } }) => ({
  languages: getActiveLanguages(state),
  groups: getGroupsList(state),
  allGroups: getGroupEntries(state),
  pageTemplates: getPageTemplatesList(state),
  pages: getPageTreePages(state),
  charsets: getCharsets(state),
  contentTypes: getContentTypes(state),
  seoMode: SEO_ENABLED,
  mode: 'edit',
  pageCode: params.pageCode,
  form: FORM_ID,
  keepDirtyOnReinitialize: true,
  editingPageTemplateCode: formValueSelector(FORM_ID)(state, 'pageModel'),
});


export const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: (data, action) =>
    dispatch(sendPutPage(data)).then(() => {
      const { stayOnSave } = ownProps;
      if (!stayOnSave) {
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
      } else ownProps.onSave();
    }).catch(() => {}),
  onWillMount: ({ pageCode }) => {
    dispatch(fetchLanguages({ page: 1, pageSize: 0 }));
    dispatch(fetchMyGroups({ sort: 'name' }));
    dispatch(fetchAllGroupEntries({ page: 1, pageSize: 0 }));
    dispatch(fetchPageTemplates({ page: 1, pageSize: 0 }));
    dispatch(fetchPageForm(pageCode));
  },
  onFindTemplateClick: () => dispatch(setVisibleModal('FindTemplateModal')),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(PageForm));
