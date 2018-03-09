import { connect } from 'react-redux';

import PageConfigPage from 'ui/pages/config/PageConfigPage';

import { initConfigPage } from 'state/page-config/actions';
import { setSelectedPageModel } from 'state/page-models/actions';


export const mapDispatchToProps = dispatch => ({
  onWillMount: () => dispatch(initConfigPage()),
  onWillUnmount: () => dispatch(setSelectedPageModel(null)),
});


const PageConfigPageContainer = connect(null, mapDispatchToProps)(PageConfigPage);
export default PageConfigPageContainer;
