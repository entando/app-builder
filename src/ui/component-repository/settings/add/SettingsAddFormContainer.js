import { connect } from 'react-redux';

import { sendPostComponentRepository } from 'state/component-repository/component-repositories/actions';
import Form from 'ui/component-repository/settings/common/Form';

export const mapDispatchToProps = dispatch => ({
  onSubmit: (data) => { dispatch(sendPostComponentRepository(data)); },
});

export default connect(null, mapDispatchToProps, null, {
  pure: false,
})(Form);
