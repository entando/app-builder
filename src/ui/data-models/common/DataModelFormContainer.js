import { connect } from 'react-redux';
import DataModelForm from 'ui/data-models/common/DataModelForm';
import { fetchDataTypes } from 'state/data-types/action';

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => { dispatch(fetchDataTypes()); },
  handleSubmit: () => {},

});
const DataModelFormContainer = connect(null, mapDispatchToProps)(DataModelForm);
export default DataModelFormContainer;
