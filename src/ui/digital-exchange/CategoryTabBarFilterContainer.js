import { connect } from 'react-redux';
import { defineMessages, injectIntl } from 'react-intl';
import { getSelectedDECategory } from 'state/digital-exchange/categories/selectors';
import { navigateDECategory } from 'state/digital-exchange/actions';
import { ALL_CATEGORIES_CATEGORY, COMPONENT_REPOSITORY_CATEGORIES } from 'state/digital-exchange/categories/const';
import TabBarFilter from 'ui/digital-exchange/common/TabBarFilter';

export const generateCRCategoryObjects = (list, intl) => {
  const categories = list.map((filterTab) => {
    const msgs = defineMessages({
      filterTab: {
        id: `digitalExchange.filterTabs.${filterTab}`,
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
    dispatch(navigateDECategory(filter));
  },
});

export const mapStateToProps = (state, { intl }) => {
  const filterTabs = generateCRCategoryObjects([
    ALL_CATEGORIES_CATEGORY, ...COMPONENT_REPOSITORY_CATEGORIES], intl);
  return {
    filterTabs,
    selectedFilterTab: getSelectedDECategory(state) || ALL_CATEGORIES_CATEGORY,
    attributes: {
      componentClass: 'CategoryTabs',
      componentId: 'de-category-tabs',
    },
  };
};

const CategoryTabBarFilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabBarFilter);

export default injectIntl(CategoryTabBarFilterContainer);
