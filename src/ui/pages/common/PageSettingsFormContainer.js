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
    const data = {
      params: Object.keys(pageSettings).map(key => ({ [key]: pageSettings[key] })),
    };
    dispatch(sendPutPageSettings(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PageSettingsForm);
