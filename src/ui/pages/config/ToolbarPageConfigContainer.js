import { connect } from 'react-redux';
import ToolbarPageConfig from 'ui/pages/config/ToolbarPageConfig';
import { fetchWidgetList } from 'state/widgets/thunks';
import { toggleContent, toggleContentToolbarExpanded } from 'state/page-config/actions';
import { getContent, getToolbarExpanded } from 'state/page-config/selectors';
import { WIDGET_LIST, PAGES } from 'state/page-config/const';

export const mapStateToProps = (state, ownProps) => ({
  content: getContent(state),
  fixedView: ownProps ? ownProps.fixedView : false,
  toggleExpanded: getToolbarExpanded(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => { dispatch(fetchWidgetList()); },
  onWillUnmount: (content) => {
    if (content === PAGES) {
      dispatch(toggleContent());
      dispatch(toggleContentToolbarExpanded(false));
    }
  },
  changeContent: (content) => {
    if (content === WIDGET_LIST) {
      dispatch(toggleContent());
      dispatch(toggleContentToolbarExpanded(false));
    }
  },
  toggleContentToolbar: (content) => {
    if (content === PAGES) {
      dispatch(toggleContentToolbarExpanded());
    }
  },
});


const ToolbarPageConfigContainer = connect(
  mapStateToProps, mapDispatchToProps,
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    onWillUnmount: () => {
      dispatchProps.onWillUnmount(stateProps.content);
    },
  }),
)(ToolbarPageConfig);

export default ToolbarPageConfigContainer;
