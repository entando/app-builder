import { connect } from 'react-redux';
import DetailFragmentPage from 'ui/fragments/detail/DetailFragmentPage';
import { fetchFragmentDetail } from 'state/fragments/actions';
import { getFragmentSelected } from 'state/fragments/selectors';
import { gotoRoute, getParams } from '@entando/router';
import { ROUTE_FRAGMENT_EDIT } from 'app-init/router';

export const mapStateToProps = state => ({
  code: getParams(state).fragmentCode,
  fragment: getFragmentSelected(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: (props) => {
    dispatch(fetchFragmentDetail(props.code));
  },
  handleEdit: (code) => {
    gotoRoute(ROUTE_FRAGMENT_EDIT, { fragmentCode: code });
  },
  referencesFragments: item => (item),
  referencesPageModels: item => (item),

});

const DetailFragmentPageContainer =
  connect(mapStateToProps, mapDispatchToProps)(DetailFragmentPage);

export default DetailFragmentPageContainer;
