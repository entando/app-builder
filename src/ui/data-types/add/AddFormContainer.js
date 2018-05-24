import { connect } from 'react-redux';
import { fetchDataTypeAttributes, sendPostDataType } from 'state/data-types/actions';
import { getDataTypeAttributesIdList } from 'state/data-types/selectors';
import DataTypeForm from 'ui/data-types/common/DataTypeForm';
import { formValueSelector } from 'redux-form';

export const mapStateToProps = state => ({
  mode: 'add',
  attributesType: getDataTypeAttributesIdList(state),
  attributeCode: formValueSelector('DataType')(state, 'type'),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchDataTypeAttributes());
  },
  onSubmit: (values) => {
    dispatch(sendPostDataType(values));
  },

});
const AddFormContainer = connect(mapStateToProps, mapDispatchToProps)(DataTypeForm);
export default AddFormContainer;
