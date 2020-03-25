import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { clearErrors } from '@entando/messages';

import { fetchDataTypes } from 'state/data-types/actions';
import { getDataTypeList } from 'state/data-types/selectors';
import { fetchDataModel, sendPutDataModel } from 'state/data-models/actions';
import DataModelForm from 'ui/data-models/common/DataModelForm';

export const mapStateToProps = (state, { match: { params } }) => ({
  dataTypes: getDataTypeList(state),
  dataModelId: params.dataModelId,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: (dataModelId) => {
    dispatch(clearErrors());
    dispatch(fetchDataTypes({ page: 1, pageSize: 0 }));
    dispatch(fetchDataModel(dataModelId));
  },
  onSubmit: values => dispatch(sendPutDataModel(values)),

});
export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(DataModelForm));
