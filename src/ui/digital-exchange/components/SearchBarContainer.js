import { connect } from 'react-redux';
import { filterBySearch } from 'state/digital-exchange/actions';
import SearchBar from 'ui/digital-exchange/components/SearchBar';
import { getDESearchFilter } from 'state/digital-exchange/components/selectors';

export const mapStateToProps = state => ({
  searchTerm: getDESearchFilter(state),
});

export const mapDispatchToProps = dispatch => ({
  onSubmit: values => dispatch(filterBySearch((values && values.keyword) || '')),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
