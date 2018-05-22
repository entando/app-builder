import { connect } from 'react-redux';
import { getParams } from '@entando/router';
import { fetchCategory, sendPutCategory } from 'state/categories/actions';
import { fetchLanguages } from 'state/languages/actions';
import CategoryForm from 'ui/categories/common/CategoryForm';
import { getActiveLanguages, getDefaultLanguage } from 'state/languages/selectors';

export const mapStateToProps = state => ({
  mode: 'edit',
  activeLanguages: getActiveLanguages(state),
  defaultLanguage: getDefaultLanguage(state),
  categoryCode: getParams(state).categoryCode,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: ({ categoryCode }) => {
    dispatch(fetchLanguages({ page: 1, pageSize: 0 }));
    dispatch(fetchCategory(categoryCode));
  },
  onSubmit: data => (dispatch(sendPutCategory(data))),
});

const EditFormContainer = connect(mapStateToProps, mapDispatchToProps)(CategoryForm);

export default EditFormContainer;
