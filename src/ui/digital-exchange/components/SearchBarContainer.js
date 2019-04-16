import { connect } from 'react-redux';
import { filterBySearch } from 'state/digital-exchange/actions';
import SearchBar from 'ui/digital-exchange/components/SearchBar';


export const mapDispatchToProps = dispatch => ({
  onSubmit: (value) => {
    dispatch(filterBySearch(value));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(SearchBar);
