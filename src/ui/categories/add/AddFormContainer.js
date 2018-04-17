import { connect } from 'react-redux';
import { change } from 'redux-form';
import { handleExpandCategory, fetchCategoryTree } from 'state/categories/actions';
import { getCategoryTree } from 'state/categories/selectors';
import { getLoading } from 'state/loading/selectors';
import { fetchLanguages } from 'state/languages/actions';
import CategoryForm from 'ui/categories/common/CategoryForm';
import { convertToQueryString, FILTER_OPERATORS } from 'util/queryStringManager';

const FIELD_OPERATORS = {
  isActive: FILTER_OPERATORS.EQUAL,
};

const langFilters = {
  formValues: {
    isActive: 'true',
  },
  operators: FIELD_OPERATORS,
};

export const mapStateToProps = state => ({
  mode: 'add',
  categories: getCategoryTree(state),
  loading: getLoading(state).categories,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchCategoryTree());
    dispatch(handleExpandCategory());
    dispatch(fetchLanguages(
      { page: 1, pageSize: 0 },
      convertToQueryString(langFilters),
    ));
  },
  onSubmit: data => (console.log(data)),
  onChangeEnTitle: title =>
    dispatch(change('category', 'code', title.replace(/\W/g, '_').toLowerCase())),
  onExpandCategory: categoryCode =>
    dispatch(handleExpandCategory(categoryCode)),
});

const PagesAddFormContainer = connect(mapStateToProps, mapDispatchToProps)(CategoryForm);

export default PagesAddFormContainer;
