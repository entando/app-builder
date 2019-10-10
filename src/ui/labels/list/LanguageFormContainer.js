import { connect } from 'react-redux';
import LanguageForm from 'ui/labels/list/LanguageForm';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { activateLanguage } from 'state/languages/actions';
import { getLanguagesOptions, getActiveLanguages, getDefaultLanguage } from 'state/languages/selectors';
import { MODAL_ID } from 'ui/labels/common/DeleteLabelAndLanguagesModal';

export const mapStateToProps = state => ({
  languages: getLanguagesOptions(state),
  activeLanguages: getActiveLanguages(state),
  defaultLanguage: getDefaultLanguage(state),
});

export const mapDispatchToProps = dispatch => ({
  onSubmit: ({ language }) => dispatch(activateLanguage(language)),
  onDeactivateLang: (langCode) => {
    dispatch(setVisibleModal(MODAL_ID));
    dispatch(setInfo({ type: 'language', langCode }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(LanguageForm);
