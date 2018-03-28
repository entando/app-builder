import { connect } from 'react-redux';
import { createLabel } from 'state/labels/actions';
import AddLabelsPageForm from 'ui/labels/common/AddLabelsPageForm';
import { getLocale } from 'state/locale/selectors';
import { getActiveLanguages, getDefaultLanguage } from 'state/languages/selectors';
import { fetchLanguages } from 'state/languages/actions';


export const mapStateToProps = state => ({
  locale: getLocale(state),
  languages: getActiveLanguages(state),
  defaultLanguage: getDefaultLanguage(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchLanguages());
  },
  onSubmit: (label) => {
    dispatch(createLabel(label));
  },
});

const AddLabelsPageContainer = connect(mapStateToProps, mapDispatchToProps)(AddLabelsPageForm);
export default AddLabelsPageContainer;
