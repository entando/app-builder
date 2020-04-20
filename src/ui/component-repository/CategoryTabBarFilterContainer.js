import { connect } from 'react-redux';
import { defineMessages, injectIntl } from 'react-intl';
import { getECRCategoryList, getSelectedECRCategory } from 'state/component-repository/categories/selectors';
import { navigateECRCategory } from 'state/component-repository/actions';
import { fetchECRCategories } from 'state/component-repository/categories/actions';
import { ALL_CATEGORIES_CATEGORY } from 'state/component-repository/categories/const';
import TabBarFilter from 'ui/component-repository/common/TabBarFilter';


export const mapDispatchToProps = dispatch => ({
  onWillMount: () => (dispatch(fetchECRCategories())),
  onSelect: (filter) => {
    dispatch(navigateECRCategory(filter));
  },
});

export const mapStateToProps = (state, { intl }) => {
  const filterTabs = [
    ALL_CATEGORIES_CATEGORY,
    ...getECRCategoryList(state),
  ].map((filterTab) => {
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
