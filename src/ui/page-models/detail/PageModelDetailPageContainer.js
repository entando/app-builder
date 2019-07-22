import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PageModelDetailPage from 'ui/page-models/detail/PageModelDetailPage';

export const mapStateToProps = (state, { match: { params } }) => ({
  pageModelCode: params.pageModelCode,
});

export default withRouter(connect(mapStateToProps, null)(PageModelDetailPage));
