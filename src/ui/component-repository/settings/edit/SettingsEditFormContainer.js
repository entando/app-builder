import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { sendPutComponentRepository, fetchComponentRepository } from 'state/component-repository/component-repositories/actions';
import Form from 'ui/component-repository/settings/common/Form';

export const mapStateToProps = (state, { match: { params } }) => ({
  id: params.server,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: (id) => { dispatch(fetchComponentRepository(id, true)); },
  onSubmit: (data) => { dispatch(sendPutComponentRepository(data)); },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(Form));
