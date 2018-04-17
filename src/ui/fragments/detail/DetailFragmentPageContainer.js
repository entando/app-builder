import { connect } from 'react-redux';
import DetailFragmentPage from 'ui/fragments/detail/DetailFragmentPage';
import { fetchFragmentDetail } from 'state/fragments/actions';
import { getFragmentSelected } from 'state/fragments/selectors';
import { getParams } from '@entando/router';


export const mapStateToProps = state => ({
  code: getParams(state).fragmentCode,
  fragment: getFragmentSelected(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: (props) => {
    dispatch(fetchFragmentDetail(props.code));
  },
  handleEdit: code => (code),
  referencesFragments: item => (item),
  referencesPageModels: item => (item),

});

const DetailFragmentPageContainer =
  connect(mapStateToProps, mapDispatchToProps)(DetailFragmentPage);

export default DetailFragmentPageContainer;
