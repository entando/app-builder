
import { connect } from 'react-redux';

// import the Component to be connected
import PageSettingsForm from 'ui/pages/common/PageSettingsForm';
import { fetchPageSettings, getSelectOptionsAPI } from 'state/settings-form/actions';
import { getOptions } from 'state/groups/selectors';

export const mapStateToProps = state => (
  {
    options: getOptions(state).options,
  });

// map the props
export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchPageSettings());
    dispatch(getSelectOptionsAPI());
  },
  onSubmit: () => {},
});

// connect the component
const PageSettingsFormContainer = connect(mapStateToProps, mapDispatchToProps)(PageSettingsForm);

// export connected component (Container)
export default PageSettingsFormContainer;
