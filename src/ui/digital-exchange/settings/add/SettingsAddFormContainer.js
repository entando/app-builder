import { connect } from 'react-redux';

import { sendPostDigitalExchange } from 'state/digital-exchange/digital-exchanges/actions';
import Form from 'ui/digital-exchange/settings/common/Form';

export const mapDispatchToProps = dispatch => ({
  onSubmit: (data) => { dispatch(sendPostDigitalExchange(data)); },
});

export default connect(null, mapDispatchToProps, null, {
  pure: false,
})(Form);
