import { connect } from 'react-redux';

// import the Component to be connected
import EditFragmentPage from 'ui/fragments/edit/EditFragmentPage';
import { fetchFragment } from 'state/fragments/actions';
import { getParams } from '@entando/router';

export const mapStateToProps = state => (
  {
    fragmentCode: getParams(state).fragmentCode,
  });

  // map the props
export const mapDispatchToProps = dispatch => ({
  onWillMount: (props) => {
    dispatch(fetchFragment(props.fragmentCode));
  },
});

// connect the component
const EditFragmentFormContainer = connect(mapStateToProps, mapDispatchToProps)(EditFragmentPage);

// export connected component (Container)
export default EditFragmentFormContainer;
