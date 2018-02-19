
import { connect } from 'react-redux';

import { IntlProvider } from 'react-intl';

import { setLanguage } from 'state/locale/actions';
import { getLocale } from 'state/locale/selectors';

/*
import itLocale from 'locales/it';
import enLocale from 'locales/en';
*/
export const mapStateToProps = state => ({
  locale: getLocale(state),
  // messages: (getLocale(state) === 'en') ? enLocale.messages : itLocale.messages,
});

// map the props
export const mapDispatchToProps = dispatch => ({
  setLanguage: langCode => dispatch(setLanguage(langCode)),
});

// connect the component
const IntlProviderContainer = connect(mapStateToProps, mapDispatchToProps)(IntlProvider);

// export connected component (Container)
export default IntlProviderContainer;
