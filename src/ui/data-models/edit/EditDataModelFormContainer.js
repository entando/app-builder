import { connect } from 'react-redux';
import { getParams } from '@entando/router';

import { fetchDataTypes } from 'state/data-types/actions';
import { getDataTypeList } from 'state/data-types/selectors';
import { fetchDataModel, sendPutDataModel } from 'state/data-models/actions';
import { clearErrors } from 'state/errors/actions';
import DataModelForm from 'ui/data-models/common/DataModelForm';

export const mapStateToProps = state => ({
  dataTypes: getDataTypeList(state),
  dataModelId: getParams(state).dataModelId,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: (dataModelId) => {
    dispatch(clearErrors());
    dispatch(fetchDataTypes());
    dispatch(fetchDataModel(dataModelId));
  },
  onSubmit: (values) => {
    dispatch(sendPutDataModel(values));
  },

});
const DataModelFormContainer = connect(mapStateToProps, mapDispatchToProps)(DataModelForm);
export default DataModelFormContainer;
