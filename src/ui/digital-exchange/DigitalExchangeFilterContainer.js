import { connect } from 'react-redux';
import { getDigitalExchangeFilters } from 'state/digital-exchange/components/selectors';
import { getDigitalExchangeList } from 'state/digital-exchange/digital-exchanges/selectors';
import { filterByDigitalExchanges } from 'state/digital-exchange/actions';
import { fetchDigitalExchanges } from 'state/digital-exchange/digital-exchanges/actions';
import DigitalExchangeFilter from 'ui/digital-exchange/DigitalExchangeFilter';

export const mapDispatchToProps = dispatch => ({
  onDidMount: () => dispatch(fetchDigitalExchanges()),
  onChange: (eventOrValue) => {
    const { digitalExchanges } = eventOrValue;
    if (digitalExchanges) {
      dispatch(filterByDigitalExchanges(digitalExchanges));
    }
  },
});

export const mapStateToProps = state => ({
  digitalExchanges: getDigitalExchangeList(state),
  initialValues: { digitalExchanges: getDigitalExchangeFilters(state) },
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(DigitalExchangeFilter);
