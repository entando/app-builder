import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { sendDeleteRegistry } from 'state/component-repository/hub/actions';

import DeleteRegistryModal from 'ui/component-repository/components/list/DeleteRegistryModal';

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = dispatch => ({
  onConfirmDelete: (registryName) => {
    dispatch(sendDeleteRegistry(registryName));
    dispatch(setVisibleModal(''));
  },
});

const DeleteRegistryModalContainer =
connect(mapStateToProps, mapDispatchToProps)(DeleteRegistryModal);

export default DeleteRegistryModalContainer;
