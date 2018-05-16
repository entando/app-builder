import { connect } from 'react-redux';
import { formValueSelector, change } from 'redux-form';
import { gotoRoute } from '@entando/router';

import { ACTION_SAVE, ACTION_SAVE_AND_CONFIGURE } from 'state/pages/const';
import PageForm from 'ui/pages/common/PageForm';
import { getGroupsList } from 'state/groups/selectors';
import { getPageModelsList } from 'state/page-models/selectors';
import { getCharsets, getContentTypes } from 'state/pages/selectors';
import { sendPostPage } from 'state/pages/actions';
import { ROUTE_PAGE_TREE, ROUTE_PAGE_CONFIG } from 'app-init/router';

export const mapStateToProps = state => ({
  groups: getGroupsList(state),
  pageModels: getPageModelsList(state),
  charsets: getCharsets(state),
  contentTypes: getContentTypes(state),
  selectedJoinGroups: formValueSelector('page')(state, 'joinGroups') || [],
  initialValues: {
    seo: false,
    displayedInMenu: true,
    charset: 'utf-8',
    contentType: 'text/html',
  },
  mode: 'add',
});


export const mapDispatchToProps = dispatch => ({
  onSubmit: (data, action) =>
    dispatch(sendPostPage(data)).then(() => {
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
    }),
  onChangeEnTitle: title =>
    dispatch(change('page', 'code', title.replace(/\W/g, '_').toLowerCase())),
});


const PagesAddFormContainer = connect(mapStateToProps, mapDispatchToProps)(PageForm);


export default PagesAddFormContainer;
