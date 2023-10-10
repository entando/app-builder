import { connect } from 'react-redux';
import { fetchBundlesFromRegistryWithFilters } from 'state/component-repository/hub/actions';
import BundleGroupAutoComplete from 'ui/component-repository/components/BundleGroupAutoComplete';
import { getBundleGroups, getSelectedRegistry } from 'state/component-repository/hub/selectors';
import { getCurrentPage, getPageSize } from 'state/pagination/selectors';


export const mapStateToProps = state => ({
  activeRegistry: getSelectedRegistry(state),
  bundlegroups: getBundleGroups(state),
  page: getCurrentPage(state),
  pageSize: getPageSize(state),
});

export const mapDispatchToProps = dispatch => ({
  onSubmit: (_, registryId, page) => dispatch(fetchBundlesFromRegistryWithFilters(
    registryId,
    { page: 1, pageSize: page.pageSize },
  )),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(BundleGroupAutoComplete);
