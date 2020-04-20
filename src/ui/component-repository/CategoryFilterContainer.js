import { connect } from 'react-redux';
import { getECRCategoryList } from 'state/component-repository/categories/selectors';
import { getECRCategoryFilters } from 'state/component-repository/components/selectors';
import { filterByECRCategories } from 'state/component-repository/actions';
import { fetchECRCategories } from 'state/component-repository/categories/actions';
import CategoryFilter from 'ui/component-repository/CategoryFilter';

export const mapDispatchToProps = dispatch => ({
  onDidMount: () => dispatch(fetchECRCategories()),
  onChange: (eventOrValue) => {
    const { categories } = eventOrValue;
    if (categories) {
      dispatch(filterByECRCategories(categories));
    }
  },
});

export const mapStateToProps = state => ({
  componentRepositoryCategories: getECRCategoryList(state),
  initialValues: { categories: getECRCategoryFilters(state) },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false,
  },
)(CategoryFilter);
