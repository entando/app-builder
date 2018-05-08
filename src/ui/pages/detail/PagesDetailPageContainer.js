import { connect } from 'react-redux';
import { getParams } from '@entando/router';
import PagesDetailPage from 'ui/pages/detail/PagesDetailPage';
import { loadSelectedPage, setReferenceSelectedPage } from 'state/pages/actions';
import { getReferencesFromSelectedPage } from 'state/pages/selectors';

export const mapStateToProps = state => ({
  pageCode: getParams(state).pageCode,
  references: getReferencesFromSelectedPage(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: props =>
    dispatch(loadSelectedPage(props.pageCode)).then(() => {
      dispatch(setReferenceSelectedPage());
    }),
});

const PagesDetailPageContainer = connect(mapStateToProps, mapDispatchToProps)(PagesDetailPage);
export default PagesDetailPageContainer;
