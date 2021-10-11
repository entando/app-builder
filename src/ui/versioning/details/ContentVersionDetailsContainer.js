import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getDomain } from '@entando/apimanager';

import { fetchLanguages } from 'state/languages/actions';
import { fetchContentDetails } from 'state/versioning/actions';
import { getLoading } from 'state/loading/selectors';
import { getActiveLanguages } from 'state/languages/selectors';
import { getDetailedContentVersion } from 'state/versioning/selectors';

import ContentVersionDetails from 'ui/versioning/details/ContentVersionDetails';

const nopage = { page: 1, pageSize: 0 };

export const mapStateToProps = state => ({
  loading: getLoading(state).contentVersionDetails,
  contentDetails: getDetailedContentVersion(state),
  languages: getActiveLanguages(state),
  domain: getDomain(state),
});

export const mapDispatchToProps = (dispatch, { match: { params } }) => ({
  onDidMount: () => {
    const { contentId, versionId } = params;
    dispatch(fetchLanguages(nopage));
    dispatch(fetchContentDetails(contentId, versionId));
  },
});

const ContentVersionDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContentVersionDetails);

export default withRouter(ContentVersionDetailsContainer);
