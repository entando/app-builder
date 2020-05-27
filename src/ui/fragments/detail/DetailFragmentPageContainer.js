import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { routeConverter } from '@entando/utils';
import DetailFragmentPage from 'ui/fragments/detail/DetailFragmentPage';
import { fetchFragmentDetail } from 'state/fragments/actions';
import { getFragmentSelected } from 'state/fragments/selectors';
import { history, ROUTE_FRAGMENT_EDIT } from 'app-init/router';
import withPermissions from 'ui/auth/withPermissions';
import { ROLE_SUPERUSER } from 'state/permissions/const';

export const mapStateToProps = (state, { match: { params } }) => ({
  code: params.fragmentCode,
  fragment: getFragmentSelected(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: (props) => {
    dispatch(fetchFragmentDetail(props.code));
  },
  handleEdit: (code) => {
    history.push(routeConverter(ROUTE_FRAGMENT_EDIT, { fragmentCode: code }));
  },
  referencesFragments: item => (item),
  referencesPageTemplates: item => (item),

});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(withPermissions(ROLE_SUPERUSER)(DetailFragmentPage)));
