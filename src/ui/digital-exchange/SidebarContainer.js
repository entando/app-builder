import { connect } from 'react-redux';
import { isAllCategoriesCategorySelected } from 'state/digital-exchange/categories/selectors';
import Sidebar from 'ui/digital-exchange/Sidebar';

const mapDispatchToProps = null;

export const mapStateToProps = state => ({
  showCategoryFilter: isAllCategoriesCategorySelected(state),
});

const SidebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar);

export default SidebarContainer;
