import { connect } from 'react-redux';

import PagesAddPage from 'ui/pages/add/PagesAddPage';
import { fetchGroups } from 'state/groups/actions';
import { fetchPageModels } from 'state/page-models/actions';
import { handleExpandPage, clearTree } from 'state/pages/actions';


export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(clearTree());
    dispatch(fetchGroups({ page: 1, pageSize: 0 }));
    dispatch(fetchPageModels({ page: 1, pageSize: 0 }));
    dispatch(handleExpandPage());
  },
});


const PagesAddPageContainer = connect(null, mapDispatchToProps)(PagesAddPage);


export default PagesAddPageContainer;
