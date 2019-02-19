import { connect } from 'react-redux';
import { getParams } from '@entando/router';

import { sendPutDEMarketplaces, fetchDEMarketplace } from 'state/digital-exchange/marketplaces/actions';
import Form from 'ui/digital-exchange/settings/common/Form';

export const mapStateToProps = state => ({
  id: getParams(state).server,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: (id) => { dispatch(fetchDEMarketplace(id, true)); },
  onSubmit: (data) => { dispatch(sendPutDEMarketplaces(data)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
