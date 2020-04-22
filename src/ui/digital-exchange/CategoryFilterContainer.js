import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { getDECategoryFilters } from 'state/digital-exchange/components/selectors';
import { filterByDECategories } from 'state/digital-exchange/actions';
import CategoryFilter from 'ui/digital-exchange/CategoryFilter';
import { COMPONENT_REPOSITORY_CATEGORIES } from 'state/digital-exchange/categories/const';
import { generateCRCategoryObjects } from 'ui/digital-exchange/CategoryTabBarFilterContainer';

export const mapDispatchToProps = dispatch => ({
  onChange: (eventOrValue) => {
    const { categories } = eventOrValue;
    if (categories) {
      dispatch(filterByDECategories(categories));
    }
  },
});

export const mapStateToProps = (state, { intl }) => ({
  digitalExchangeCategories: generateCRCategoryObjects(COMPONENT_REPOSITORY_CATEGORIES, intl),
  initialValues: { categories: getDECategoryFilters(state) },
});

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false,
  },
)(CategoryFilter));
