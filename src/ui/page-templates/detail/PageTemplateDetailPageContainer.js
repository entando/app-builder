import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { SUPERUSER_PERMISSION } from 'state/permissions/const';
import withPermissions from 'ui/auth/withPermissions';

import PageTemplateDetailPage from 'ui/page-templates/detail/PageTemplateDetailPage';

export const mapStateToProps = (state, { match: { params } }) => ({
  pageTemplateCode: params.pageTemplateCode,
});

const PageTemplateDetailPageContainer = withRouter(connect(
  mapStateToProps,
  null,
)(PageTemplateDetailPage));
export default withPermissions(SUPERUSER_PERMISSION)(PageTemplateDetailPageContainer);
