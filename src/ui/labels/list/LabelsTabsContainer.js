
import { connect } from 'react-redux';

import LabelsTabs from 'ui/labels/list/LabelsTabs';
import { getLanguagesList } from 'state/languages/selectors';
import { getLoading } from 'state/loading/selectors';
import { getLabelsList } from 'state/labels/selectors';
import { removeLabel } from 'state/labels/actions';

export const mapStateToProps = state => ({
  languages: getLanguagesList(state),
  labels: getLabelsList(state),
  loading: getLoading(state).systemLabels,
});

export const mapDispatchToProps = dispatch => ({
  onClickDeleteLabel: labelKey => dispatch(removeLabel(labelKey)),
  onClickEditLabel: arg => console.log(`edit ${arg}`),
});


const LabelsTabsContainer = connect(mapStateToProps, mapDispatchToProps)(LabelsTabs);

export default LabelsTabsContainer;
