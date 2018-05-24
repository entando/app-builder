import { connect } from 'react-redux';
import { getParams } from '@entando/router';
import { fetchCategory, sendPutCategory } from 'state/categories/actions';
import { fetchLanguages } from 'state/languages/actions';
import CategoryForm from 'ui/categories/common/CategoryForm';
import { getActiveLanguages, getDefaultLanguage } from 'state/languages/selectors';
import { activeLangQueryString, noPagination } from 'ui/categories/common/formUtils';

export const mapStateToProps = state => ({
  mode: 'edit',
  activeLanguages: getActiveLanguages(state),
  defaultLanguage: getDefaultLanguage(state),
  categoryCode: getParams(state).categoryCode,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: ({ categoryCode }) => {
    dispatch(fetchLanguages(noPagination, activeLangQueryString));
    dispatch(fetchCategory(categoryCode));
  },
  onSubmit: data => (dispatch(sendPutCategory(data))),
});

const EditFormContainer = connect(mapStateToProps, mapDispatchToProps)(CategoryForm);

export default EditFormContainer;
