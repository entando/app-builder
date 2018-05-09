import { connect } from 'react-redux';
import { getParams } from '@entando/router';
import { updateLabel, fetchLabel } from 'state/labels/actions';
import LabelsForm from 'ui/labels/common/LabelsForm';
import { getLocale } from 'state/locale/selectors';
import { getActiveLanguages, getDefaultLanguage } from 'state/languages/selectors';
import { fetchLanguages } from 'state/languages/actions';

export const mapStateToProps = state => ({
  mode: 'edit',
  locale: getLocale(state),
  languages: getActiveLanguages(state),
  defaultLanguage: getDefaultLanguage(state),
  labelCode: getParams(state).labelCode,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: (labelCode) => {
    dispatch(fetchLanguages());
    dispatch(fetchLabel(labelCode));
  },
  onSubmit: (label) => {
    dispatch(updateLabel(label));
  },
});

const EditFormContainer = connect(mapStateToProps, mapDispatchToProps)(LabelsForm);
export default EditFormContainer;
