
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { getLocale } from 'state/locale/selectors';

export const mapStateToProps = state => ({
  locale: getLocale(state),
});

// connect the component
const IntlProviderContainer = connect(mapStateToProps, null)(IntlProvider);

// export connected component (Container)
export default IntlProviderContainer;
