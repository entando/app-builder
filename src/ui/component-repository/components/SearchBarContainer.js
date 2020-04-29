import { connect } from 'react-redux';
import { filterBySearch } from 'state/component-repository/actions';
import { getECRSearchFilter } from 'state/component-repository/components/selectors';
import SearchForm from 'ui/common/form/SearchForm';

export const mapStateToProps = state => ({
  searchTerm: getECRSearchFilter(state),
});

export const mapDispatchToProps = dispatch => ({
  onSubmit: values => dispatch(filterBySearch((values && values.keyword) || '')),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(SearchForm);
