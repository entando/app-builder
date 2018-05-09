
import { connect } from 'react-redux';

import LabelsTabs from 'ui/labels/list/LabelsTabs';
import { getActiveLanguages } from 'state/languages/selectors';
import { getLoading } from 'state/loading/selectors';
import { getLabelsList } from 'state/labels/selectors';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { MODAL_ID } from 'ui/labels/common/DeleteLabelModal';

export const mapStateToProps = state => ({
  languages: getActiveLanguages(state),
  labels: getLabelsList(state),
  loading: getLoading(state).systemLabels,
});

export const mapDispatchToProps = dispatch => ({
  onClickDelete: (code) => {
    dispatch(setVisibleModal(MODAL_ID));
    dispatch(setInfo({ type: 'label', code }));
  },
});

const LabelsTabsContainer = connect(mapStateToProps, mapDispatchToProps)(LabelsTabs);

export default LabelsTabsContainer;
