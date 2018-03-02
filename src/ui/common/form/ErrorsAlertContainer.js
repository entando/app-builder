
import { connect } from 'react-redux';

import ErrorsAlert from 'ui/common/form/ErrorsAlert';
import { getErrors } from 'state/errors/selectors';
import { clearErrors } from 'state/errors/actions';


export const mapStateToProps = state => ({
  messages: getErrors(state),
});


export const mapDispatchToProps = dispatch => ({
  onDismiss: () => dispatch(clearErrors()),
});


const ErrorsAlertContainer = connect(mapStateToProps, mapDispatchToProps)(ErrorsAlert);

export default ErrorsAlertContainer;
