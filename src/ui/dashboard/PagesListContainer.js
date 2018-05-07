import { connect } from 'react-redux';

import PagesList from 'ui/dashboard/PagesList';
import { getPageStatus } from 'state/dashboard/selectors';

export const mapDispatchToProps = () => ({
  onWillMount: () => {},
});

export const mapStateToProps = state => (
  {
    pageStatus: getPageStatus(state),
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PagesList);
