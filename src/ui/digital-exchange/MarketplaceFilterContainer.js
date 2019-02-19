import { connect } from 'react-redux';
import { getDEMarketplaceFilters } from 'state/digital-exchange/components/selectors';
import { getDEMarketplaceList } from 'state/digital-exchange/marketplaces/selectors';
import { filterByDigitalExchanges } from 'state/digital-exchange/actions';
import { fetchDEMarketplaces } from 'state/digital-exchange/marketplaces/actions';
import MarketplaceFilter from 'ui/digital-exchange/MarketplaceFilter';

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => (dispatch(fetchDEMarketplaces())),
  onChange: (eventOrValue) => {
    const { marketplaces } = eventOrValue;
    if (marketplaces) {
      dispatch(filterByDigitalExchanges(marketplaces));
    }
  },
});

export const mapStateToProps = state => ({
  digitalExchangeMarketplaces: getDEMarketplaceList(state),
  initialValues: { marketplaces: getDEMarketplaceFilters(state) },
});

const MarketplaceFilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MarketplaceFilter);

export default MarketplaceFilterContainer;
