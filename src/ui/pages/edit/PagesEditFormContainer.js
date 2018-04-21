import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { getParams, gotoRoute } from '@entando/router';

import PageForm from 'ui/pages/common/PageForm';
import { getGroupsList } from 'state/groups/selectors';
import { getPageModelsList } from 'state/page-models/selectors';
import { getCharsets, getContentTypes } from 'state/pages/selectors';
import { ACTION_SAVE, ACTION_SAVE_AND_CONFIGURE } from 'state/pages/const';
import { handleExpandPage, sendPutPage, fetchPageForm } from 'state/pages/actions';
import { fetchGroups } from 'state/groups/actions';
import { fetchPageModels } from 'state/page-models/actions';
import { ROUTE_PAGE_TREE, ROUTE_PAGE_CONFIG } from 'app-init/router';

export const mapStateToProps = state => ({
  groups: getGroupsList(state),
  pageModels: getPageModelsList(state),
  charsets: getCharsets(state),
  contentTypes: getContentTypes(state),
  selectedJoinGroups: formValueSelector('page')(state, 'joinGroups') || [],
  mode: 'edit',
  pageCode: getParams(state).pageCode,
});


export const mapDispatchToProps = dispatch => ({
  onSubmit: (data) => {
    dispatch(sendPutPage(data)).then(() => {
      switch (data.action) {
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
    dispatch(fetchGroups());
    dispatch(fetchPageModels());
    dispatch(handleExpandPage());
    dispatch(fetchPageForm(pageCode));
  },
});


const PagesEditFormContainer = connect(mapStateToProps, mapDispatchToProps)(PageForm);


export default PagesEditFormContainer;
