import { connect } from 'react-redux';
import { getParams } from 'frontend-common-components';

import PageModelDetailPage from 'ui/page-models/detail/PageModelDetailPage';

export const mapStateToProps = state => ({
  pageModelCode: getParams(state).pageModelCode,
});

const PageModelDetailPageContainer = connect(mapStateToProps, null)(PageModelDetailPage);

PageModelDetailPageContainer.displayName = 'PageModelDetailPageContainer';

export default PageModelDetailPageContainer;
