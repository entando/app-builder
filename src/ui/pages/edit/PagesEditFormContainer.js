import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { getParams } from 'frontend-common-components';

import PageForm from 'ui/pages/common/PageForm';
import { getGroups } from 'state/groups/selectors';
import { getPageModels } from 'state/page-models/selectors';
import { getCharsets, getContentTypes } from 'state/pages/selectors';
import { handleExpandPage, sendPutPage, fetchPageForm } from 'state/pages/actions';
import { fetchGroups } from 'state/groups/actions';
import { fetchPageModels } from 'state/page-models/actions';

export const mapStateToProps = state => ({
  groups: getGroups(state),
  pageModels: getPageModels(state),
  charsets: getCharsets(state),
  contentTypes: getContentTypes(state),
  selectedJoinGroups: formValueSelector('page')(state, 'joinGroups') || [],
  mode: 'edit',
  pageCode: getParams(state).pageCode,
});


export const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch(sendPutPage(data)),
  onWillMount: ({ pageCode }) => {
    dispatch(fetchGroups());
    dispatch(fetchPageModels());
    dispatch(handleExpandPage());
    dispatch(fetchPageForm(pageCode));
  },
});


const PagesEditFormContainer = connect(mapStateToProps, mapDispatchToProps)(PageForm);


export default PagesEditFormContainer;
