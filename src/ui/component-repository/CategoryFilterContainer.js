import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { getECRCategoryFilters } from 'state/component-repository/components/selectors';
import { filterByECRCategories } from 'state/component-repository/actions';
import CategoryFilter from 'ui/component-repository/CategoryFilter';
import { COMPONENT_REPOSITORY_CATEGORIES } from 'state/component-repository/categories/const';
import { generateCRCategoryObjects } from 'ui/component-repository/CategoryTabBarFilterContainer';

export const mapDispatchToProps = dispatch => ({
  onChange: (eventOrValue) => {
    const { categories } = eventOrValue;
    if (categories) {
      dispatch(filterByECRCategories(categories));
    }
  },
});

export const mapStateToProps = (state, { intl }) => ({
  componentRepositoryCategories: generateCRCategoryObjects(COMPONENT_REPOSITORY_CATEGORIES, intl),
  initialValues: { categories: getECRCategoryFilters(state) },
});

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false,
  },
)(CategoryFilter));
