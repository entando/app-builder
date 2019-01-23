import { connect } from 'react-redux';
import { loadSelectedPage } from 'state/pages/actions';
import { getSelectedPage } from 'state/pages/selectors';
import SinglePageSettingsForm from 'ui/pages/config/SinglePageSettingsForm';
import { fetchLanguages } from 'state/languages/actions';
import { activeLangQueryString, noPagination } from 'ui/categories/common/formUtils';
import { getDefaultLanguage, getActiveNonDefaultLanguages } from 'state/languages/selectors';

const mapStateToProps = state => ({
  initialValues: getSelectedPage(state),
  activeNonDefaultLanguages: getActiveNonDefaultLanguages(state),
  defaultLanguage: getDefaultLanguage(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onWillMount: () => {
    dispatch(loadSelectedPage());
    dispatch(fetchLanguages(noPagination, activeLangQueryString));
  },
  onSubmit: (page) => {
    console.log(page);
    ownProps.onSubmit();
  },
  onReset: () => {
    ownProps.onReset();
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SinglePageSettingsForm);
