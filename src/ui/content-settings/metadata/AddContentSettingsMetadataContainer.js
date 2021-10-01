import { connect } from 'react-redux';
import { addToast, TOAST_SUCCESS } from '@entando/messages';
import { defineMessages, injectIntl } from 'react-intl';
import { getLoading } from 'state/loading/selectors';
import { reset } from 'redux-form';
import { sendPostMetadataMap } from 'state/content-settings/actions';

import AddContentSettingsMetadata from 'ui/content-settings/metadata/AddContentSettingsMetadata';

const metadataMsgs = defineMessages({
  saved: {
    id: 'cms.contentsettings.form.saved',
    defaultMessage: '{name} saved.',
  },
});

export const mapStateToProps = state => ({
  loading: getLoading(state).contentSettings,
});

export const mapDispatchToProps = (dispatch, { intl }) => ({
  onSubmit: (values) => {
    const { key, mapping } = values;
    dispatch(sendPostMetadataMap(key, mapping)).then((res) => {
      if (res) {
        dispatch(reset('addsettingsmetadata'));
        dispatch(addToast(intl.formatMessage(metadataMsgs.saved, { name: key }), TOAST_SUCCESS));
      }
    });
  },
});

const AddContentSettingsMetadataContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false,
  },
)(AddContentSettingsMetadata);

export default injectIntl(AddContentSettingsMetadataContainer);
