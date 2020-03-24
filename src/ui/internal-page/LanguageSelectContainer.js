import { connect } from 'react-redux';

import { getLocale } from 'state/locale/selectors';
import { setCurrentLanguage } from 'state/locale/actions';
import LanguageSelect from 'ui/internal-page/LanguageSelect';

export const mapStateToProps = state => ({
  currentLanguage: getLocale(state),
});

export const mapDispatchToProps = dispatch => ({
  onSelect: langCode => dispatch(setCurrentLanguage(langCode)),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(LanguageSelect);
