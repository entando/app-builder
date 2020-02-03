import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { sendPatchPage } from 'state/pages/actions';
import { getSelectedPage, getCharsets, getContentTypes } from 'state/pages/selectors';
import SinglePageSettingsForm, { FORM_ID } from 'ui/pages/config/SinglePageSettingsForm';
import { fetchLanguages } from 'state/languages/actions';
import { activeLangQueryString, noPagination } from 'ui/categories/common/formUtils';
import { getDefaultLanguage, getActiveNonDefaultLanguages } from 'state/languages/selectors';
import { getGroupsList } from 'state/groups/selectors';
import { fetchGroups } from 'state/groups/actions';

export const mapStateToProps = state => ({
  initialValues: getSelectedPage(state),
  activeNonDefaultLanguages: getActiveNonDefaultLanguages(state),
  defaultLanguage: getDefaultLanguage(state),
  groups: getGroupsList(state),
  charsets: getCharsets(state),
  contentTypes: getContentTypes(state),
  selectedJoinGroupCodes: formValueSelector(FORM_ID)(state, 'joinGroups'),
});

export const mapDispatchToProps = (dispatch, ownProps) => ({
  onWillMount: () => {
    dispatch(fetchLanguages(noPagination, activeLangQueryString));
    dispatch(fetchGroups(noPagination));
  },
  onSubmit: (updatedValues) => {
    dispatch(sendPatchPage(updatedValues));
    ownProps.onSubmit();
  },
  onReset: () => {
    ownProps.onReset();
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false },
)(SinglePageSettingsForm);
