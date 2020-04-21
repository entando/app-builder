import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PageTemplateDetailPage from 'ui/page-templates/detail/PageTemplateDetailPage';

export const mapStateToProps = (state, { match: { params } }) => ({
  pageTemplateCode: params.pageTemplateCode,
});

export default withRouter(connect(mapStateToProps, null)(PageTemplateDetailPage));
