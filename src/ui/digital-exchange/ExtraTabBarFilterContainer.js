import { connect } from 'react-redux';
import { getSelectedDECategory } from 'state/digital-exchange/categories/selectors';
import { navigateDEExtraTab } from 'state/digital-exchange/actions';
import { ALL_CATEGORIES_CATEGORY } from 'state/digital-exchange/categories/const';
import { DE_COMPONENTS_EXTRA_FILTERS } from 'state/digital-exchange/components/const';
import TabBarFilter from 'ui/digital-exchange/common/TabBarFilter';
import { formattedText } from '@entando/utils';


export const mapDispatchToProps = dispatch => ({
  onSelect: (tab) => {
    dispatch(navigateDEExtraTab(tab));
  },
});

export const mapStateToProps = (state) => {
  const filterTabs = Object.keys(DE_COMPONENTS_EXTRA_FILTERS).map(tab => ({
    label: formattedText(`digitalExchange.extraFilters.${tab}`, tab),
    value: tab,
  }));


  return {
    filterTabs,
    selectedFilterTab: getSelectedDECategory(state) || ALL_CATEGORIES_CATEGORY,
    attributes: {
      componentClass: 'ExtraTabBarFilter',
      componentId: 'de-extra-tab-bar-filter',
    },
  };
};

const ExtraTabBarFilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabBarFilter);

export default ExtraTabBarFilterContainer;
