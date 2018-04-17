import { connect } from 'react-redux';
import { change } from 'redux-form';
import { handleExpandCategory, fetchCategoryTree, sendPostCategory } from 'state/categories/actions';
import { getCategoryTree } from 'state/categories/selectors';
import { getLoading } from 'state/loading/selectors';
import { fetchLanguages } from 'state/languages/actions';
import CategoryForm from 'ui/categories/common/CategoryForm';
import { getActiveLanguages, getDefaultLanguage } from 'state/languages/selectors';

export const mapStateToProps = state => ({
  mode: 'add',
  categories: getCategoryTree(state),
  activeLanguages: getActiveLanguages(state),
  defaultLanguage: getDefaultLanguage(state),
  loading: getLoading(state).categories,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchCategoryTree());
    dispatch(fetchLanguages());
  },
  onSubmit: data => (dispatch(sendPostCategory(data))),
  onChangeDefaultTitle: title =>
    dispatch(change('category', 'code', title.replace(/\W/g, '_').toLowerCase())),
  onExpandCategory: categoryCode =>
    dispatch(handleExpandCategory(categoryCode)),
});

const PagesAddFormContainer = connect(mapStateToProps, mapDispatchToProps)(CategoryForm);

export default PagesAddFormContainer;
