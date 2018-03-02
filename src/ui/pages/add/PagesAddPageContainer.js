import { connect } from 'react-redux';

import PagesAddPage from 'ui/pages/add/PagesAddPage';
import { fetchGroups } from 'state/groups/actions';
import { fetchPageModels } from 'state/page-models/actions';
import { handleExpandPage } from 'state/pages/actions';


export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchGroups());
    dispatch(fetchPageModels());
    dispatch(handleExpandPage());
  },
});


const PagesAddPageContainer = connect(null, mapDispatchToProps)(PagesAddPage);


export default PagesAddPageContainer;
