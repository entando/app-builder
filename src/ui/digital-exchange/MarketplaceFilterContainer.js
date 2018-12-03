import { connect } from 'react-redux';
import { convertToQueryString, FILTER_OPERATORS } from '@entando/utils';

import { getDEMarketplaceList } from 'state/digital-exchange/marketplaces/selectors';
import { fetchDEComponents } from 'state/digital-exchange/components/actions';
import { fetchDEMarketplaces } from 'state/digital-exchange/marketplaces/actions';
import MarketplaceFilter from 'ui/digital-exchange/MarketplaceFilter';

const FIELD_OPERATORS = {
  marketplace: FILTER_OPERATORS.LIKE,
};

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => (dispatch(fetchDEMarketplaces())),
  onChange: (eventOrValue) => {
    if (Object.prototype.hasOwnProperty.call(eventOrValue, 'marketplaces')) {
      const { marketplaces } = eventOrValue;
      const filters = {
        formValues: { marketplace: marketplaces },
        operators: FIELD_OPERATORS,
      };

      dispatch(fetchDEComponents({ page: 1, pageSize: 10 }, convertToQueryString(filters)));
    }
  },
});

export const mapStateToProps = state => (
  { marketplaces: getDEMarketplaceList(state) }
);

const MarketplaceFilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MarketplaceFilter);

export default MarketplaceFilterContainer;
