import { connect } from 'react-redux';

import PageConfigGrid from 'ui/pages/config/PageConfigGrid';

import { fetchPageConfigData } from 'state/pages/actions';


export const mapDispatchToProps = dispatch => ({
  onWillMount: () => dispatch(fetchPageConfigData()),
});


const PageConfigPageContainer = connect(null, mapDispatchToProps)(PageConfigGrid);
export default PageConfigPageContainer;
