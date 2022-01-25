import { connect } from 'react-redux';
import { createLabel, setSelectedLabel } from 'state/labels/actions';
import LabelsForm from 'ui/labels/common/LabelsForm';
import { getLocale } from 'state/locale/selectors';
import { getActiveLanguages, getDefaultLanguage } from 'state/languages/selectors';
import { fetchLanguages } from 'state/languages/actions';
import { getLoading } from 'state/loading/selectors';

export const mapStateToProps = (state) => {
  const languages = getActiveLanguages(state);
  return {
    locale: getLocale(state),
    languages,
    defaultLanguage: getDefaultLanguage(state),
    loadingLangs: getLoading(state).languages,
    initialValues: {
      key: '',
      ...languages.reduce((acc, curr) => ({
        ...acc,
        [`titles.${curr.code}`]: '',
      }), {}),
    },
  };
};

export const mapDispatchToProps = dispatch => ({
  onDidMount: () => {
    dispatch(fetchLanguages({ page: 1, pageSize: 0 }));
  },
  onSubmit: values => dispatch(createLabel(values)),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(LabelsForm);
