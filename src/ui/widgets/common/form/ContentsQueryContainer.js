import { connect } from 'react-redux';
import { clearErrors } from '@entando/messages';
import { injectIntl } from 'react-intl';
import { formValueSelector, change } from 'redux-form';

import { fetchSearchPages } from 'state/pages/actions';
import { fetchLanguages } from 'state/languages/actions';
import { fetchCategoryTree } from 'state/categories/actions';
import { fetchContentTypeListPaged } from 'state/content-type/actions';
import { fetchContentModelsByContentType } from 'state/content-model/actions';

import { getContentTypeList } from 'state/content-type/selectors';
import { getCategoryTree } from 'state/categories/selectors';
import ContentsQueryForm from 'ui/widgets/common/form/ContentsQueryForm';
import { sendPostWidgets } from 'state/widgets/actions';
import { getContentModelList } from 'state/content-model/selectors';
import { getLocale } from 'state/locale/selectors';
import { getSearchPages } from 'state/pages/selectors';
import { getActiveLanguages } from 'state/languages/selectors';

export const mapStateToProps = state => ({
  language: getLocale(state),
  languages: getActiveLanguages(state),
  contentTypes: getContentTypeList(state),
  pages: getSearchPages(state),
  categories: getCategoryTree(state),
  contentModels: getContentModelList(state),
  selectedCategories: formValueSelector('widgets.contentsQuery')(state, 'categories'),
  selectedInclusiveOr: formValueSelector('widgets.contentsQuery')(state, 'inclusiveOr'),
  selectedContentType: formValueSelector('widgets.contentsQuery')(state, 'contentType'),
});

export const mapDispatchToProps = dispatch => ({
  onDidMount: () => {
    dispatch(fetchLanguages({ page: 1, pageSize: 0 }));
    dispatch(fetchContentTypeListPaged({ page: 1, pageSize: 0 }));
    dispatch(fetchCategoryTree());
    dispatch(fetchSearchPages({ page: 1, pageSize: 0 }));
  },
  onSubmit: (values) => {
    dispatch(clearErrors());
    dispatch(sendPostWidgets(values));
  },
  onToggleInclusiveOr: value =>
    dispatch(change('widgets.contentsQuery', 'inclusiveOr', !value)),
  onResetFilterOption: (name, i) => dispatch(change('widgets.contentsQuery', `${name}.[${i}].option`, '')),
  onChangeContentType: contentType => dispatch(fetchContentModelsByContentType(contentType)),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(injectIntl(ContentsQueryForm));
