import { connect } from 'react-redux';
import { getDECategoryList } from 'state/digital-exchange/categories/selectors';
import { getDECategoryFilters } from 'state/digital-exchange/components/selectors';
import { filterByDECategories } from 'state/digital-exchange/actions';
import { fetchDECategories } from 'state/digital-exchange/categories/actions';
import CategoryFilter from 'ui/digital-exchange/CategoryFilter';

export const mapDispatchToProps = dispatch => ({
  onDidMount: () => dispatch(fetchDECategories()),
  onChange: (eventOrValue) => {
    const { categories } = eventOrValue;
    if (categories) {
      dispatch(filterByDECategories(categories));
    }
  },
});

export const mapStateToProps = state => ({
  digitalExchangeCategories: getDECategoryList(state),
  initialValues: { categories: getDECategoryFilters(state) },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false,
  },
)(CategoryFilter);
