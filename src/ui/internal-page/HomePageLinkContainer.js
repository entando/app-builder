import { connect } from 'react-redux';
import { getDomain } from '@entando/apimanager';

import HomePageLink from 'ui/internal-page/HomePageLink';

export const mapStateToProps = state => ({
  link: getDomain(state),
});

export default connect(mapStateToProps, null, null, {
  pure: false,
})(HomePageLink);
