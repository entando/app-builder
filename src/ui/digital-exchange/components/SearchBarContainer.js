import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { filterBySearch } from 'state/digital-exchange/actions';
import SearchBar from 'ui/digital-exchange/components/SearchBar';
import { getDESearchFilter } from 'state/digital-exchange/components/selectors';

export const mapStateToProps = state => ({
  searchTerm: getDESearchFilter(state),
});

export const mapDispatchToProps = dispatch => ({
  clearSearch: () => dispatch(reset('searchBar')),
  onSubmit: values => dispatch(filterBySearch((values && values.keyword) || '')),
});

export const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
  clearSearch: () => {
    dispatchProps.clearSearch();
    if (stateProps.searchTerm !== '') {
      dispatchProps.onSubmit();
    }
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(SearchBar);
