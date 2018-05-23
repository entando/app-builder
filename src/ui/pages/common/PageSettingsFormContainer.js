import { connect } from 'react-redux';

// import the Component to be connected
import PageSettingsForm from 'ui/pages/common/PageSettingsForm';
import { fetchPageSettings, fetchFreePages } from 'state/pages/actions';
import { getFreePages } from 'state/pages/selectors';

export const mapStateToProps = state => ({
  options: getFreePages(state),
});

// map the props
export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    // get select options from API
    dispatch(fetchFreePages());
    // get page settings from API
    dispatch(fetchPageSettings());
  },
  onSubmit: () => {},
});

// connect the component
const PageSettingsFormContainer = connect(mapStateToProps, mapDispatchToProps)(PageSettingsForm);

// export connected component (Container)
export default PageSettingsFormContainer;
