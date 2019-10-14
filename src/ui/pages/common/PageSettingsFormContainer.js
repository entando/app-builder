import { connect } from 'react-redux';

import PageSettingsForm from 'ui/pages/common/PageSettingsForm';
import { fetchPageSettings, fetchFreePages, sendPutPageSettings } from 'state/pages/actions';
import { getFreePages } from 'state/pages/selectors';

export const mapStateToProps = state => ({
  options: getFreePages(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchFreePages());
    dispatch(fetchPageSettings());
  },
  onSubmit: (pageSettings) => {
    dispatch(sendPutPageSettings(pageSettings));
  },
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(PageSettingsForm);
