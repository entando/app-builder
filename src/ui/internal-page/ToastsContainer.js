import { connect } from 'react-redux';
import { getToasts } from 'state/toasts/selectors';
import { removeToast } from 'state/toasts/actions';

import Toasts from 'ui/internal-page/Toasts';

export const mapStateToProps = state => ({
  toasts: getToasts(state),
});

export const mapDispatchToProps = dispatch => ({
  onDismiss: id => dispatch(removeToast(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Toasts);
