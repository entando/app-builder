import { connect } from 'react-redux';
import { defineMessages, injectIntl } from 'react-intl';
import { getSelectedECRCategory } from 'state/component-repository/categories/selectors';
import { navigateECRCategory } from 'state/component-repository/actions';
import { ALL_CATEGORIES_CATEGORY, COMPONENT_REPOSITORY_CATEGORIES } from 'state/component-repository/categories/const';
import TabBarFilter from 'ui/component-repository/common/TabBarFilter';

export const generateCRCategoryObjects = (list, intl) => {
  const categories = list.map((filterTab) => {
    const msgs = defineMessages({
      filterTab: {
        id: `componentRepository.filterTabs.${filterTab}`,
        defaultMessage: filterTab,
      },
    });
    return {
      label: intl.formatMessage(msgs.filterTab),
      value: filterTab,
    };
  });
  return categories;
};


export const mapDispatchToProps = dispatch => ({
  onSelect: (filter) => {
    dispatch(navigateECRCategory(filter));
  },
});

export const mapStateToProps = (state, { intl }) => {
  const filterTabs = generateCRCategoryObjects([
    ALL_CATEGORIES_CATEGORY, ...COMPONENT_REPOSITORY_CATEGORIES], intl);
  return {
    filterTabs,
    selectedFilterTab: getSelectedECRCategory(state) || ALL_CATEGORIES_CATEGORY,
    attributes: {
      componentClass: 'CategoryTabs',
      componentId: 'ecr-category-tabs',
    },
  };
};

const CategoryTabBarFilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabBarFilter);

export default injectIntl(CategoryTabBarFilterContainer);
