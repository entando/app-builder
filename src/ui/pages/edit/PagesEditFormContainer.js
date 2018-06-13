import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { getParams, gotoRoute } from '@entando/router';

import PageForm from 'ui/pages/common/PageForm';
import { getActiveLanguages } from 'state/languages/selectors';
import { getGroupsList } from 'state/groups/selectors';
import { getPageModelsList } from 'state/page-models/selectors';
import { getCharsets, getContentTypes } from 'state/pages/selectors';
import { ACTION_SAVE, ACTION_SAVE_AND_CONFIGURE } from 'state/pages/const';
import { handleExpandPage, sendPutPage, fetchPageForm, clearTree } from 'state/pages/actions';
import { fetchGroups } from 'state/groups/actions';
import { fetchPageModels } from 'state/page-models/actions';
import { ROUTE_PAGE_TREE, ROUTE_PAGE_CONFIG } from 'app-init/router';
import { fetchLanguages } from 'state/languages/actions';

export const mapStateToProps = state => ({
  languages: getActiveLanguages(state),
  groups: getGroupsList(state),
  pageModels: getPageModelsList(state),
  charsets: getCharsets(state),
  contentTypes: getContentTypes(state),
  selectedJoinGroups: formValueSelector('page')(state, 'joinGroups') || [],
  mode: 'edit',
  pageCode: getParams(state).pageCode,
});


export const mapDispatchToProps = dispatch => ({
  onSubmit: (data, action) => {
    dispatch(sendPutPage(data)).then(() => {
      switch (action) {
        case ACTION_SAVE: {
          gotoRoute(ROUTE_PAGE_TREE);
          break;
        }
        case ACTION_SAVE_AND_CONFIGURE: {
          gotoRoute(ROUTE_PAGE_CONFIG, { pageCode: data.code });
          break;
        }
        default: gotoRoute(ROUTE_PAGE_TREE);
      }
    });
  },
  onWillMount: ({ pageCode }) => {
    dispatch(clearTree());
    dispatch(fetchLanguages({ page: 1, pageSize: 0 }));
    dispatch(fetchGroups());
    dispatch(fetchPageModels());
    dispatch(handleExpandPage());
    dispatch(fetchPageForm(pageCode));
  },
});


const PagesEditFormContainer = connect(mapStateToProps, mapDispatchToProps)(PageForm);


export default PagesEditFormContainer;
