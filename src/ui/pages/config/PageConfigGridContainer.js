import { connect } from 'react-redux';

import PageConfigGrid from 'ui/pages/config/PageConfigGrid';

import { getPageModelStruct } from 'state/page-models/selectors';

export const mapStateToProps = state => ({
  pageModelStruct: getPageModelStruct(state),
});


const PageConfigGridContainer = connect(mapStateToProps, null)(PageConfigGrid);

export default PageConfigGridContainer;
