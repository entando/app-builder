import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';

import ContentsFilterModal from 'ui/widget-forms/contents-filter/ContentsFilterModal';
import { getLastSelectedRow } from 'state/contents/selectors';

export const mapStateToProps = state => ({
  lastSelectedRow: getLastSelectedRow(state),
});

export const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(setVisibleModal('')),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContentsFilterModal);
