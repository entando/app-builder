import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import EditFragmentPage from 'ui/fragments/edit/EditFragmentPage';
import { fetchFragment } from 'state/fragments/actions';

export const mapStateToProps = (state, { match: { params } }) => (
  {
    fragmentCode: params.fragmentCode,
  });

export const mapDispatchToProps = dispatch => ({
  onWillMount: (props) => {
    dispatch(fetchFragment(props.fragmentCode));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditFragmentPage));
