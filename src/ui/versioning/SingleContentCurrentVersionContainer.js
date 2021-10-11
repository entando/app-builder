import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getLoading } from 'state/loading/selectors';

import { fetchContent, clearEditContentForm } from 'state/edit-content/actions';
import { getContent } from 'state/edit-content/selectors';
import { getGroupsList } from 'state/groups/selectors';
import { fetchMyGroups } from 'state/groups/actions';

import SingleContentCurrentVersion from 'ui/versioning/SingleContentCurrentVersion';

export const mapStateToProps = state => ({
  loading: getLoading(state).editContent,
  content: getContent(state),
  groups: getGroupsList(state),
});

export const mapDispatchToProps = (dispatch, { match: { params } }) => ({
  onDidMount: () => {
    dispatch(fetchContent(`/${params.contentId}`));
    dispatch(fetchMyGroups());
  },
  onWillUnmount: () => { dispatch(clearEditContentForm()); },
});

const SingleContentCurrentVersionContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SingleContentCurrentVersion);

export default withRouter(SingleContentCurrentVersionContainer);
