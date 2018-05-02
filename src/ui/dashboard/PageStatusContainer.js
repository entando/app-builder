import { connect } from 'react-redux';

import PageStatus from 'ui/dashboard/PageStatus';

export const mapDispatchToProps = () => ({
  onWillMount: () => {},
});

export const mapStateToProps = () => (
  {
    pageStatus: {
      published: 6,
      unpublished: 3,
      draft: 2,
    },
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageStatus);
