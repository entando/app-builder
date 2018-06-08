import { connect } from 'react-redux';
import { getToasts, removeToast } from '@entando/messages';

import Toasts from 'ui/app/Toasts';

export const mapStateToProps = state => ({
  toasts: getToasts(state),
});

export const mapDispatchToProps = dispatch => ({
  onDismiss: id => dispatch(removeToast(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Toasts);
