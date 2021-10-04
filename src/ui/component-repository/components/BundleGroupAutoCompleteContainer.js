import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { filterBySearch } from 'state/component-repository/actions';
import SearchForm from 'ui/common/form/SearchForm';
import { BUNDLE_GROUP_ID } from 'ui/component-repository/components/list/ComponentListWrapper';

export const mapStateToProps = state => ({
  searchTerm: formValueSelector('hubBundleGroupSearchForm')(state, BUNDLE_GROUP_ID),
});

export const mapDispatchToProps = dispatch => ({
  onSubmit: values => dispatch(filterBySearch((values && values.keyword) || '')),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(SearchForm);
