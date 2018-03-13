import { connect } from 'react-redux';

import PageConfigGrid from 'ui/pages/config/PageConfigGrid';

import { getPageModelStruct } from 'state/page-models/selectors';
import { getCurrentPageWidgets } from 'state/pages/selectors';

export const mapStateToProps = state => ({
  pageModelStruct: getPageModelStruct(state),
  pageWidgets: getCurrentPageWidgets(state),
});


const PageConfigGridContainer = connect(mapStateToProps, null)(PageConfigGrid);

export default PageConfigGridContainer;
