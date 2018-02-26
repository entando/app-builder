import { connect } from 'react-redux';

// import the Component to be connected
import FragmentEditPage from 'ui/app-pages/FragmentEditPage';
import { fetchFragment } from 'state/fragment-form/actions';
import { getParams } from 'frontend-common-components';

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
const FragmentEditFormContainer = connect(mapStateToProps, mapDispatchToProps)(FragmentEditPage);

// export connected component (Container)
export default FragmentEditFormContainer;
