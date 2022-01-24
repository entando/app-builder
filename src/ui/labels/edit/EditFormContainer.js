import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateLabel, fetchLabel } from 'state/labels/actions';
import { getSelectedLabel } from 'state/labels/selectors';
import LabelsForm from 'ui/labels/common/LabelsForm';
import { getLocale } from 'state/locale/selectors';
import { getActiveLanguages, getDefaultLanguage } from 'state/languages/selectors';
import { fetchLanguages } from 'state/languages/actions';

export const mapStateToProps = (state, { match: { params } }) => {
  const languages = getActiveLanguages(state);
  const selectedLabel = getSelectedLabel(state);
  return {
    mode: 'edit',
    locale: getLocale(state),
    languages,
    defaultLanguage: getDefaultLanguage(state),
    labelCode: params.labelCode,
    initialValues: selectedLabel ? {
      key: selectedLabel.key,
      ...Object.keys(selectedLabel.titles).reduce((acc, curr) => ({
        ...acc,
        [`titles.${curr}`]: selectedLabel.titles[curr],
      }), {}),
    } : {},
  };
};

export const mapDispatchToProps = dispatch => ({
  onDidMount: (labelCode) => {
    dispatch(fetchLanguages({ page: 1, pageSize: 0 }));
    dispatch(fetchLabel(labelCode));
  },
  onSubmit: label => dispatch(updateLabel(label)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(LabelsForm));
