import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { fetchBundlesFromRegistryWithFilters } from 'state/component-repository/hub/actions';
import { BUNDLE_GROUP_FILTER_ID } from 'ui/component-repository/components/list/ComponentListWrapper';
import BundleGroupAutoComplete, { FORM_NAME } from 'ui/component-repository/components/BundleGroupAutoComplete';

export const mapStateToProps = state => ({
  searchTerm: formValueSelector(FORM_NAME)(state, BUNDLE_GROUP_FILTER_ID),
});

export const mapDispatchToProps = dispatch => ({
  onSubmit: (_, url, page) => dispatch(fetchBundlesFromRegistryWithFilters(url, page)),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(BundleGroupAutoComplete);
