import { connect } from 'react-redux';
import { createLabel } from 'state/labels/actions';
import LabelsForm from 'ui/labels/common/LabelsForm';
import { getLocale } from 'state/locale/selectors';
import { getActiveLanguages, getDefaultLanguage } from 'state/languages/selectors';
import { fetchLanguages } from 'state/languages/actions';
import { getLoading } from 'state/loading/selectors';

export const mapStateToProps = state => ({
  locale: getLocale(state),
  languages: getActiveLanguages(state),
  defaultLanguage: getDefaultLanguage(state),
  loadingLangs: getLoading(state).languages,

});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchLanguages({ page: 1, pageSize: 0 }));
  },
  onSubmit: (label) => {
    dispatch(createLabel(label));
  },
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(LabelsForm);
