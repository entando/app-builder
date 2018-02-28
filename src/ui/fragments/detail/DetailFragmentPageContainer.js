import { connect } from 'react-redux';
import DetailFragmentPage from 'ui/app-pages/fragments/detail/DetailFragmentPage';
import { fecthFragment } from 'ui/app-pages/fragments/detail/DetailFragmentPage';

export const mapDispatchToProps = dispatch => ({
  onWillMount: (props) => {
    console.log('mapDispatchToProps- props ', props);
    dispatch(fecthFragment(props.code));
  },
  handleEdit: () => {},
  referencesFragments: () => {},
  referencesPageModels: () => {},

});

const DetailFragmentPageContainer = connect(null, mapDispatchToProps)(DetailFragmentPage);
export default DetailFragmentPageContainer;
