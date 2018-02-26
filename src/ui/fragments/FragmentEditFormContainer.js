import { connect } from 'react-redux';

// import the Component to be connected
import FragmentForm from 'ui/fragments/FragmentForm';

const EDIT_MODE = 'edit';

export const mapStateToProps = () => (
  {
    mode: EDIT_MODE,
  });

// map the props
export const mapDispatchToProps = () => ({
  onSubmit: () => {},
});

// connect the component
const FragmentEditFormContainer = connect(mapStateToProps, mapDispatchToProps)(FragmentForm);

// export connected component (Container)
export default FragmentEditFormContainer;
