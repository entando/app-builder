import { connect } from 'react-redux';
import { formValueSelector, change } from 'redux-form';
import { gotoRoute } from '@entando/router';

import { ACTION_SAVE, ACTION_SAVE_AND_CONFIGURE } from 'state/pages/const';
import PageForm from 'ui/pages/common/PageForm';
import { fetchLanguages } from 'state/languages/actions';
import { getActiveLanguages } from 'state/languages/selectors';
import { getGroupsList } from 'state/groups/selectors';
import { getPageModelsList } from 'state/page-models/selectors';
import { getCharsets, getContentTypes } from 'state/pages/selectors';
import { sendPostPage } from 'state/pages/actions';
import { ROUTE_PAGE_TREE, ROUTE_PAGE_CONFIG } from 'app-init/router';

export const mapStateToProps = state => ({
  languages: getActiveLanguages(state),
  groups: getGroupsList(state),
  pageModels: getPageModelsList(state),
  charsets: getCharsets(state),
  contentTypes: getContentTypes(state),
  selectedJoinGroups: formValueSelector('page')(state, 'joinGroups') || [],
  mode: 'clone',
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchLanguages({ page: 1, pageSize: 0 }));
  },
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
  onChangeDefaultTitle: title =>
    dispatch(change('page', 'code', title.replace(/\W/g, '_').toLowerCase())),
});

const CloneFormContainer = connect(mapStateToProps, mapDispatchToProps)(PageForm);

export default CloneFormContainer;
