import { connect } from 'react-redux';
import { filterBySearch } from 'state/digital-exchange/actions';
import { getDESearchFilter } from 'state/digital-exchange/components/selectors';
import SearchForm from 'ui/common/form/SearchForm';

export const mapStateToProps = state => ({
  searchTerm: getDESearchFilter(state),
});

export const mapDispatchToProps = dispatch => ({
  onSubmit: values => dispatch(filterBySearch((values && values.keyword) || '')),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(SearchForm);
