import { connect } from 'react-redux';

import { fetchDataTypes } from 'state/data-types/actions';
import { getDataTypeList } from 'state/data-types/selectors';
import DataModelForm from 'ui/data-models/common/DataModelForm';
import { sendPostDataModel } from 'state/data-models/actions';

export const mapStateToProps = state => ({
  dataTypes: getDataTypeList(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => { dispatch(fetchDataTypes()); },
  onSubmit: (values) => {
    dispatch(sendPostDataModel(values));
  },

});
const DataModelFormContainer = connect(mapStateToProps, mapDispatchToProps)(DataModelForm);
export default DataModelFormContainer;
