import { connect } from 'react-redux';
import { injectIntl, defineMessages } from 'react-intl';
import { addToast, TOAST_SUCCESS } from '@entando/messages';

import withPermissions from 'ui/auth/withPermissions';
import { SUPERUSER_PERMISSION, VALIDATE_CONTENTS_PERMISSION } from 'state/permissions/const';

import { fetchVersioningConfig, sendPutVersioningConfig } from 'state/versioning/actions';

import VersioningConfig from 'ui/versioning/VersioningConfig';

const versioningConfigMsgs = defineMessages({
  saved: {
    id: 'cms.label.saved',
    defaultMessage: 'Saved',
  },
});

export const mapDispatchToProps = (dispatch, { intl }) => ({
  onDidMount: () => dispatch(fetchVersioningConfig()),
  onSubmit: values => dispatch(sendPutVersioningConfig(values)).then(() => (
    dispatch(addToast(intl.formatMessage(versioningConfigMsgs.saved), TOAST_SUCCESS))
  )),
});

const VersioningConfigContainer = connect(
  null,
  mapDispatchToProps,
  null,
  {
    pure: false,
  },
)(VersioningConfig);

export default withPermissions([
  SUPERUSER_PERMISSION,
  VALIDATE_CONTENTS_PERMISSION,
])(injectIntl(VersioningConfigContainer));
