import { connect } from 'react-redux';
import LanguageForm from 'ui/labels/list/LanguageForm';
import { activateLanguage, deactivateLanguage } from 'state/languages/actions';
import { getLanguagesOptions, getActiveLanguages, getDefaultLanguage } from 'state/languages/selectors';

export const mapStateToProps = state => ({
  languages: getLanguagesOptions(state),
  activeLanguages: getActiveLanguages(state),
  defaultLanguage: getDefaultLanguage(state),
});

export const mapDispatchToProps = dispatch => ({
  onSubmit: ({ language }) => dispatch(activateLanguage(language)),
  onDeactivateLang: langCode => dispatch(deactivateLanguage(langCode)),
});

const LanguageFormContainer = connect(mapStateToProps, mapDispatchToProps)(LanguageForm);
export default LanguageFormContainer;
