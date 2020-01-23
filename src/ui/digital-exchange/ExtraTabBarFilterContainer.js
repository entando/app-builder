import { connect } from 'react-redux';
import { defineMessages, injectIntl } from 'react-intl';
import { getSelectedDEExtraFilter } from 'state/digital-exchange/extra-filters/selectors';
import { navigateDEExtraTab } from 'state/digital-exchange/actions';
import { fetchDEExtraFilters } from 'state/digital-exchange/extra-filters/actions';
import { DE_COMPONENTS_EXTRA_FILTERS } from 'state/digital-exchange/extra-filters/const';
import TabBarFilter from 'ui/digital-exchange/common/TabBarFilter';

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => (dispatch(fetchDEExtraFilters())),
  onSelect: (tab) => {
    dispatch(navigateDEExtraTab(tab));
  },
});

export const mapStateToProps = (state, { intl }) => {
  const filterTabs = Object.keys(DE_COMPONENTS_EXTRA_FILTERS).map((tab) => {
    const msgs = defineMessages({
      tab: {
        id: `digitalExchange.extraFilters.${tab}`,
        defaultMessage: tab,
      },
    });

    return {
      label: intl.formatMessage(msgs.tab),
      value: tab,
    };
  });

  const selectedFilterTab = getSelectedDEExtraFilter(state)
    || Object.keys(DE_COMPONENTS_EXTRA_FILTERS)[0];

  return {
    filterTabs,
    selectedFilterTab,
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

export default injectIntl(ExtraTabBarFilterContainer);
