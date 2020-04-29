import { connect } from 'react-redux';
import { defineMessages, injectIntl } from 'react-intl';
import { getSelectedECRExtraFilter } from 'state/component-repository/extra-filters/selectors';
import { navigateECRExtraTab } from 'state/component-repository/actions';
import { fetchECRExtraFilters } from 'state/component-repository/extra-filters/actions';
import { ECR_COMPONENTS_EXTRA_FILTERS } from 'state/component-repository/extra-filters/const';
import TabBarFilter from 'ui/component-repository/common/TabBarFilter';

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => (dispatch(fetchECRExtraFilters())),
  onSelect: (tab) => {
    dispatch(navigateECRExtraTab(tab));
  },
});

export const mapStateToProps = (state, { intl }) => {
  const filterTabs = Object.keys(ECR_COMPONENTS_EXTRA_FILTERS).map((tab) => {
    const msgs = defineMessages({
      tab: {
        id: `componentRepository.extraFilters.${tab}`,
        defaultMessage: tab,
      },
    });

    return {
      label: intl.formatMessage(msgs.tab),
      value: tab,
    };
  });

  const selectedFilterTab = getSelectedECRExtraFilter(state)
    || Object.keys(ECR_COMPONENTS_EXTRA_FILTERS)[0];

  return {
    filterTabs,
    selectedFilterTab,
    attributes: {
      componentClass: 'ExtraTabBarFilter',
      componentId: 'ecr-extra-tab-bar-filter',
    },
  };
};

const ExtraTabBarFilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabBarFilter);

export default injectIntl(ExtraTabBarFilterContainer);
