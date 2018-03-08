import { connect } from 'react-redux';
import ToolbarPageConfig from 'ui/pages/config/ToolbarPageConfig';
import { fetchWidgetList } from 'state/widgets/actions';


const mapDispatchToProps = dispatch => ({
  onWillMount: () => { dispatch(fetchWidgetList()); },
});


const ToolbarPageConfigContainer = connect(null, mapDispatchToProps)(ToolbarPageConfig);

export default ToolbarPageConfigContainer;
