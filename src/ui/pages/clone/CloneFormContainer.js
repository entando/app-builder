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
import { sendPostPage } from 'state/pages/actions';
import { history, ROUTE_PAGE_TREE, ROUTE_PAGE_CONFIG } from 'app-init/router';

export const mapStateToProps = state => ({
  languages: getActiveLanguages(state),
  groups: getGroupsList(state),
  pageTemplates: getPageTemplatesList(state),
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
          history.push(ROUTE_PAGE_TREE);
          break;
        }
        case ACTION_SAVE_AND_CONFIGURE: {
          history.push(routeConverter(ROUTE_PAGE_CONFIG, { pageCode: data.code }));
          break;
        }
        default: history.push(ROUTE_PAGE_TREE);
      }
    }),
  onChangeDefaultTitle: title =>
    dispatch(change('page', 'code', title.replace(/\W/g, '_').toLowerCase())),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(PageForm);
