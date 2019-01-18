import { connect } from 'react-redux';
import { loadSelectedPage } from 'state/pages/actions';
import { getSelectedPage } from 'state/pages/selectors';
import PageSettingsForm from 'ui/pages/config/PageSettingsForm';

const mapStateToProps = state => ({
  initialValues: getSelectedPage(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onWillMount: () => dispatch(loadSelectedPage()),
  onSubmit: (page) => {
    console.log(page);
    ownProps.onSubmit();
  },
  onReset: () => {
    ownProps.onReset();
  },
});

const PageSettingFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageSettingsForm);

export default PageSettingFormContainer;
