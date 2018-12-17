import { connect } from 'react-redux';
import { getTopCategoryFilter } from 'state/digital-exchange/components/selectors';
import Sidebar from 'ui/digital-exchange/Sidebar';

const mapDispatchToProps = null;

export const mapStateToProps = state => ({
  topCategoryFilter: getTopCategoryFilter(state),
});

const SidebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar);

export default SidebarContainer;
