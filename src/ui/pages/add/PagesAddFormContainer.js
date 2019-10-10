import { connect } from 'react-redux';
import { formValueSelector, change } from 'redux-form';
import { routeConverter } from '@entando/utils';

import { ACTION_SAVE, ACTION_SAVE_AND_CONFIGURE } from 'state/pages/const';
import PageForm from 'ui/pages/common/PageForm';
import { fetchLanguages } from 'state/languages/actions';
import { getActiveLanguages } from 'state/languages/selectors';
import { getGroupsList } from 'state/groups/selectors';
import { getPageModelsList } from 'state/page-models/selectors';
import { getCharsets, getContentTypes, getSelectedPageLocaleTitle } from 'state/pages/selectors';
import { sendPostPage, loadSelectedPage } from 'state/pages/actions';
import { history, ROUTE_PAGE_TREE, ROUTE_PAGE_CONFIG } from 'app-init/router';
import { PAGE_INIT_VALUES } from 'ui/pages/common/const';
import { getLocale } from 'state/locale/selectors';
import getSearchParam from 'helpers/getSearchParam';

export const mapStateToProps = state => ({
  languages: getActiveLanguages(state),
  groups: getGroupsList(state),
  pageModels: getPageModelsList(state),
  charsets: getCharsets(state),
  contentTypes: getContentTypes(state),
  selectedJoinGroups: formValueSelector('page')(state, 'joinGroups') || [],
  initialValues: {
    ...PAGE_INIT_VALUES,
  },
  mode: 'add',
  locale: getLocale(state),
  parentCode: getSearchParam('parentCode'),
  parentTitle: getSelectedPageLocaleTitle(state),
});


export const mapDispatchToProps = dispatch => ({
  onWillMount: (data) => {
    dispatch(loadSelectedPage(data.parentCode));
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
