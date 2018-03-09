import { connect } from 'react-redux';
import { formValueSelector, change } from 'redux-form';

import PageForm from 'ui/pages/common/PageForm';
import { getGroups } from 'state/groups/selectors';
import { getPageModelsList } from 'state/page-models/selectors';
import { getCharsets, getContentTypes } from 'state/pages/selectors';
import { sendPostPage } from 'state/pages/actions';

export const mapStateToProps = state => ({
  groups: getGroups(state),
  pageModels: getPageModelsList(state),
  charsets: getCharsets(state),
  contentTypes: getContentTypes(state),
  selectedJoinGroups: formValueSelector('page')(state, 'joinGroups') || [],
  initialValues: {
    seo: false,
    displayedInMenu: true,
    charset: 'utf-8',
    contentType: 'text/html',
  },
  mode: 'add',
});


export const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch(sendPostPage(data)),
  onChangeEnTitle: title =>
    dispatch(change('page', 'code', title.replace(/\W/g, '_').toLowerCase())),
});


const PagesAddFormContainer = connect(mapStateToProps, mapDispatchToProps)(PageForm);


export default PagesAddFormContainer;
