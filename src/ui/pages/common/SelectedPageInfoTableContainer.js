
import { connect } from 'react-redux';

// import the Component to be PageInfoTable
import PageInfoTable from 'ui/pages/common/PageInfoTable';
import { getSelectedPage } from 'state/pages/selectors';


export const mapStateToProps = state => ({
  page: getSelectedPage(state),
});


// connect the component
const SelectedPageInfoTableContainer = connect(mapStateToProps, null)(PageInfoTable);

// export connected component (Container)
export default SelectedPageInfoTableContainer;
