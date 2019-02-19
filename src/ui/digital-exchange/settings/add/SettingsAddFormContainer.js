import { connect } from 'react-redux';

import { sendPostDEMarketplaces } from 'state/digital-exchange/marketplaces/actions';
import Form from 'ui/digital-exchange/settings/common/Form';

export const mapDispatchToProps = dispatch => ({
  onSubmit: (data) => { dispatch(sendPostDEMarketplaces(data)); },
});

export default connect(null, mapDispatchToProps)(Form);
