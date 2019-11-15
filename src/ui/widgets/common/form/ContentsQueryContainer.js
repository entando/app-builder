import { connect } from 'react-redux';
import { clearErrors } from '@entando/messages';
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

export const mapStateToProps = state => ({
  language: getLocale(state),
  contentTypes: getContentTypeList(state),
  pages: getSearchPages(state),
  categories: getCategoryTree(state),
  contentModels: getContentModelList(state),
  selectedCategories: formValueSelector('widgets.contentsQuery')(state, 'categories'),
  selectedInclusiveOr: formValueSelector('widgets.contentsQuery')(state, 'inclusiveOr'),
  selectedContentType: formValueSelector('widgets.contentsQuery')(state, 'contentType'),
  selectedFilters: formValueSelector('widgets.contentsQuery')(state, 'filters'),
  selectedFrontendFilters: formValueSelector('widgets.contentsQuery')(state, 'frontendFilters'),
  selectedOrderType: formValueSelector('widgets.contentsQuery')(state, 'order'),
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
  onChangeContentType: contentType => dispatch(fetchContentModelsByContentType(contentType)),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(ContentsQueryForm);
