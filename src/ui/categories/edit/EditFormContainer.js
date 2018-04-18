import { connect } from 'react-redux';
import { sendPutCategory } from 'state/categories/actions';
import { fetchLanguages } from 'state/languages/actions';
import CategoryForm from 'ui/categories/common/CategoryForm';
import { getActiveLanguages, getDefaultLanguage } from 'state/languages/selectors';

export const mapStateToProps = state => ({
  mode: 'edit',
  activeLanguages: getActiveLanguages(state),
  defaultLanguage: getDefaultLanguage(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchLanguages());
  },
  onSubmit: data => (dispatch(sendPutCategory(data))),
});

const EditFormContainer = connect(mapStateToProps, mapDispatchToProps)(CategoryForm);

export default EditFormContainer;
