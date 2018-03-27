import { connect } from 'react-redux';
import AddLabelsPageForm from 'ui/labels/common/AddLabelsPageForm';

export const mapDispatchToProps = () => ({
  onSubmit: () => {},
});

const AddLabelsContainer = connect(null, mapDispatchToProps)(FragmentForm);
export default AddLabelsContainer;
