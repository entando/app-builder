
import { connect } from 'react-redux';

// import the Component to be connected
import PageSettingsForm from 'ui/pages/common/PageSettingsForm';
import { fetchPageSettings, fetchSelectOptions } from 'state/settings-form/actions';
// import { getOptions } from 'state/pages/selectors';

// export const mapStateToProps = state => (
//   {
//     options: getOptions(state),
//   });

// map the props
export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    // get select options from API
    dispatch(fetchSelectOptions());
    // get page settings from API
    dispatch(fetchPageSettings());
  },
  onSubmit: () => {},
});

// connect the component
const PageSettingsFormContainer = connect(null, mapDispatchToProps)(PageSettingsForm);

// export connected component (Container)
export default PageSettingsFormContainer;
