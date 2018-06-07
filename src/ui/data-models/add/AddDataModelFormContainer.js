import { connect } from 'react-redux';
import { clearErrors } from '@entando/messages';

import { fetchDataTypes } from 'state/data-types/actions';
import { getDataTypeList } from 'state/data-types/selectors';
import { sendPostDataModel } from 'state/data-models/actions';
import DataModelForm from 'ui/data-models/common/DataModelForm';

export const mapStateToProps = state => ({
  dataTypes: getDataTypeList(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(clearErrors());
    dispatch(fetchDataTypes());
  },
  onSubmit: (values) => {
    dispatch(sendPostDataModel(values));
  },
});
const DataModelFormContainer = connect(mapStateToProps, mapDispatchToProps)(DataModelForm);
export default DataModelFormContainer;
