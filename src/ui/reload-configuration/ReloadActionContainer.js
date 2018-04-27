import { connect } from 'react-redux';
import { sendReloadConf } from 'state/reload-configuration/actions';
import ReloadAction from 'ui/reload-configuration/ReloadAction';

// export const mapStateToProps = state => ({
//   info: getInfo(state),
// });

export const mapDispatchToProps = dispatch => ({
  onReload: () => {
    dispatch(sendReloadConf());
  },
});

const DeleteRoleModalContainer = connect(null, mapDispatchToProps)(ReloadAction);

export default DeleteRoleModalContainer;
