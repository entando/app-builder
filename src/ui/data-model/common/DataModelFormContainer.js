import { connect } from 'react-redux';
import DataModelForm from 'ui/data-model/common/DataModelForm';
import { fetchDataModels } from 'state/data-models/action';


export const mapDispatchToProps = dispatch => ({
  onWillMount: () => { dispatch(fetchDataModels()); },
  handleSubmit: () => {},

});
const DataModelFormContainer = connect(null, mapDispatchToProps)(DataModelForm);
export default DataModelFormContainer;
