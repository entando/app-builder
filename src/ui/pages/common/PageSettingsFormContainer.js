
import { connect } from 'react-redux';

// import the Component to be connected
import PageSettingsForm from 'ui/pages/common/PageSettingsForm';
import { fetchPageSettings } from 'state/settings-form/actions';

// map the props
export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchPageSettings());
  },
  onSubmit: () => {},
});

// connect the component
const PageSettingsFormContainer = connect(null, mapDispatchToProps)(PageSettingsForm);

// export connected component (Container)
export default PageSettingsFormContainer;
