import { connect } from 'react-redux';
import { isAllCategoriesCategorySelected } from 'state/component-repository/categories/selectors';
import Sidebar from 'ui/component-repository/Sidebar';

const mapDispatchToProps = null;

export const mapStateToProps = state => ({
  showCategoryFilter: isAllCategoriesCategorySelected(state),
});

const SidebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar);

export default SidebarContainer;
