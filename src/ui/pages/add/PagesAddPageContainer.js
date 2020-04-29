import { connect } from 'react-redux';

import PagesAddPage from 'ui/pages/add/PagesAddPage';
import { fetchGroups } from 'state/groups/actions';
import { fetchPageTemplates } from 'state/page-templates/actions';
import { handleExpandPage, clearTree } from 'state/pages/actions';


export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(clearTree());
    dispatch(fetchGroups({ page: 1, pageSize: 0 }));
    dispatch(fetchPageTemplates({ page: 1, pageSize: 0 }));
    dispatch(handleExpandPage());
  },
});


const PagesAddPageContainer = connect(null, mapDispatchToProps)(PagesAddPage);


export default PagesAddPageContainer;
