import { connect } from 'react-redux';
import { fetchDataTypes } from 'state/data-types/actions';
import { getDataTypeList } from 'state/data-types/selectors';
import DataModelForm from 'ui/data-models/common/DataModelForm';

export const mapStateToProps = state => ({
  dataTypes: getDataTypeList(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => { dispatch(fetchDataTypes()); },
  onSubmit: (values) => {
    console.log(values);
  },

});
const DataModelFormContainer = connect(mapStateToProps, mapDispatchToProps)(DataModelForm);
export default DataModelFormContainer;
