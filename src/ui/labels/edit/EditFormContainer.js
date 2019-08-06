import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateLabel, fetchLabel } from 'state/labels/actions';
import LabelsForm from 'ui/labels/common/LabelsForm';
import { getLocale } from 'state/locale/selectors';
import { getActiveLanguages, getDefaultLanguage } from 'state/languages/selectors';
import { fetchLanguages } from 'state/languages/actions';

export const mapStateToProps = (state, { match: { params } }) => ({
  mode: 'edit',
  locale: getLocale(state),
  languages: getActiveLanguages(state),
  defaultLanguage: getDefaultLanguage(state),
  labelCode: params.labelCode,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: (labelCode) => {
    dispatch(fetchLanguages({ page: 1, pageSize: 0 }));
    dispatch(fetchLabel(labelCode));
  },
  onSubmit: (label) => {
    dispatch(updateLabel(label));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LabelsForm));
