import { connect } from 'react-redux';
import { defineMessages, injectIntl } from 'react-intl';
import { getDECategoryList, getSelectedDECategory } from 'state/digital-exchange/categories/selectors';
import { navigateDECategory } from 'state/digital-exchange/actions';
import { fetchDECategories } from 'state/digital-exchange/categories/actions';
import { ALL_CATEGORIES_CATEGORY } from 'state/digital-exchange/categories/const';
import TabBarFilter from 'ui/digital-exchange/common/TabBarFilter';


export const mapDispatchToProps = dispatch => ({
  onWillMount: () => (dispatch(fetchDECategories())),
  onSelect: (filter) => {
    dispatch(navigateDECategory(filter));
  },
});

export const mapStateToProps = (state, { intl }) => {
  const filterTabs = [
    ALL_CATEGORIES_CATEGORY,
    ...getDECategoryList(state),
  ].map((filterTab) => {
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
