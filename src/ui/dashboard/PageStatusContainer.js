import { connect } from 'react-redux';

import PageStatus from 'ui/dashboard/PageStatus';
import { fetchPageStatus } from 'state/dashboard/actions';
import { getPageStatus } from 'state/dashboard/selectors';

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => dispatch(fetchPageStatus()),
});

export const mapStateToProps = state => (
  {
    pageStatus: getPageStatus(state),
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageStatus);
