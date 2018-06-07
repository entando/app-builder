import { connect } from 'react-redux';
import { getErrors, clearErrors } from '@entando/messages';

import ErrorsAlert from 'ui/common/form/ErrorsAlert';


export const mapStateToProps = state => ({
  messages: getErrors(state),
});


export const mapDispatchToProps = dispatch => ({
  onDismiss: () => dispatch(clearErrors()),
});


const ErrorsAlertContainer = connect(mapStateToProps, mapDispatchToProps)(ErrorsAlert);

export default ErrorsAlertContainer;
