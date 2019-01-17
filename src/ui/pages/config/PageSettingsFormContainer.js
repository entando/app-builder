import { connect } from 'react-redux';
import { loadSelectedPage } from 'state/pages/actions';
import { getSelectedPage } from 'state/pages/selectors';
import PageSettingsForm from 'ui/pages/config/PageSettingsForm';

const mapStateToProps = state => ({
  initialValues: getSelectedPage(state),
});

const mapDispatchToProps = dispatch => ({
  onWillMount: () => dispatch(loadSelectedPage()),
  onSubmit: (page) => {
    console.log(page);
  },
});

const PageSettingFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageSettingsForm);

export default PageSettingFormContainer;
