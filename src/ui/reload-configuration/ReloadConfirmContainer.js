
import { connect } from 'react-redux';
import { getStatus } from 'state/reload-configuration/selectors';
import ReloadConfirm from 'ui/reload-configuration/ReloadConfirm';

export const mapStateToProps = state => ({
  status: getStatus(state),
});

const ReloadConfirmContainer = connect(mapStateToProps, null)(ReloadConfirm);

export default ReloadConfirmContainer;
