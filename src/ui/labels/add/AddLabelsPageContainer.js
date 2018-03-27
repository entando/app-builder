import { connect } from 'react-redux';
import { createLabel } from 'state/labels/actions';
import AddLabelsPageForm from 'ui/labels/common/AddLabelsPageForm';
import { getLocale } from 'state/locale/selectors';
import { getActiveLanguages } from 'state/languages/selectors';


export const mapStateToProps = state => ({
  locale: getLocale(state),
  languages: getActiveLanguages(state),
});

export const mapDispatchToProps = dispatch => ({
  onSubmit: (label) => {
    dispatch(createLabel(label));
  },
});

const AddLabelsPageContainer = connect(mapStateToProps, mapDispatchToProps)(AddLabelsPageForm);
export default AddLabelsPageContainer;
