import { connect } from 'react-redux';
import { getParams } from '@entando/router';

import { sendPutDigitalExchange, fetchDigitalExchange } from 'state/digital-exchange/digital-exchanges/actions';
import Form from 'ui/digital-exchange/settings/common/Form';

export const mapStateToProps = state => ({
  id: getParams(state).server,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: (id) => { dispatch(fetchDigitalExchange(id, true)); },
  onSubmit: (data) => { dispatch(sendPutDigitalExchange(data)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
