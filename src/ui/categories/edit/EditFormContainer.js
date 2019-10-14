import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchCategory, sendPutCategory } from 'state/categories/actions';
import { fetchLanguages } from 'state/languages/actions';
import CategoryForm from 'ui/categories/common/CategoryForm';
import { getActiveLanguages, getDefaultLanguage } from 'state/languages/selectors';
import { activeLangQueryString, noPagination } from 'ui/categories/common/formUtils';

export const mapStateToProps = (state, { match: { params } }) => ({
  mode: 'edit',
  activeLanguages: getActiveLanguages(state),
  defaultLanguage: getDefaultLanguage(state),
  categoryCode: params.categoryCode,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: ({ categoryCode }) => {
    dispatch(fetchLanguages(noPagination, activeLangQueryString));
    dispatch(fetchCategory(categoryCode));
  },
  onSubmit: data => (dispatch(sendPutCategory(data))),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(CategoryForm));
