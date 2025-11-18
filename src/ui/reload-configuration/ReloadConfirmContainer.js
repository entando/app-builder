
import { connect } from 'react-redux';
import { getStatus, getPercentage, getInfo, getLoading } from 'state/reload-configuration/selectors';
import ReloadConfirm from 'ui/reload-configuration/ReloadConfirm';

export const mapStateToProps = state => ({
  status: getStatus(state),
  percentage: getPercentage(state),
  info: getInfo(state),
  loading: getLoading(state),
});

const ReloadConfirmContainer = connect(mapStateToProps, null)(ReloadConfirm);

export default ReloadConfirmContainer;
