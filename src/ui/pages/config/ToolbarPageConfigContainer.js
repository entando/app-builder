import { connect } from 'react-redux';
import ToolbarPageConfig from 'ui/pages/config/ToolbarPageConfig';
import { fetchWidgetList } from 'state/widgets/actions';
import { setContentToolbar, expandContentToolbar } from 'state/page-config/actions';
import { getContent, getToolbarExpanded } from 'state/page-config/selectors';
import { WIDGET_LIST, PAGES } from 'state/page-config/const';

export const mapStateToProps = state => ({
  content: getContent(state),
  toolbarExpanded: getToolbarExpanded(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => { dispatch(fetchWidgetList()); },
  changeContent: (content) => {
    if (content === WIDGET_LIST) {
      dispatch(setContentToolbar());
    }
  },
  expandContentToolbar: (content) => {
    if (content === PAGES) {
      dispatch(expandContentToolbar());
    }
  },
});


const ToolbarPageConfigContainer = connect(mapStateToProps, mapDispatchToProps)(ToolbarPageConfig);

export default ToolbarPageConfigContainer;
