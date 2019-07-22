import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { sendPutDigitalExchange, fetchDigitalExchange } from 'state/digital-exchange/digital-exchanges/actions';
import Form from 'ui/digital-exchange/settings/common/Form';

export const mapStateToProps = (state, { match: { params } }) => ({
  id: params.server,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: (id) => { dispatch(fetchDigitalExchange(id, true)); },
  onSubmit: (data) => { dispatch(sendPutDigitalExchange(data)); },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form));
