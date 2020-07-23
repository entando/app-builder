import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { sendReloadConf } from 'state/reload-configuration/actions';
import ReloadConfig from 'ui/reload-configuration/ReloadConfig';

export const mapDispatchToProps = dispatch => ({
  onReload: () => {
    dispatch(sendReloadConf());
  },
});

const ReloadConfigContainer = injectIntl(connect(null, mapDispatchToProps)(ReloadConfig));

export default ReloadConfigContainer;
