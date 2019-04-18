import { connect } from 'react-redux';
import { filterBySearch } from 'state/digital-exchange/actions';
import SearchBar from 'ui/digital-exchange/components/SearchBar';
import { formValueSelector, submit } from 'redux-form';

const formSel = formValueSelector('searchBar');

export const mapStateToProps = state => ({
  isFilled: !!formSel(state, 'keyword'),
});

export const mapDispatchToProps = dispatch => ({
  clearSearch: () => dispatch(submit('searchBar')),
  onSubmit: ({ keyword }) => {
    dispatch(filterBySearch(keyword || ''));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBar);
