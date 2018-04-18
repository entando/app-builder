import { connect } from 'react-redux';
import { fetchDataTypeAttributes } from 'state/data-types/actions';
import { formValueSelector } from 'redux-form';
import DateAttributeForm from 'ui/common/form/DateAttributeForm';
import {
  getDataTypeSelectedAttribute,
  getDataTypeAttributesIdList,
  getDataTypeSelectedAttributeAllowedRoles,
} from 'state/data-types/selectors';

export const mapStateToProps = (state) => {
  console.log('joinRoles ', formValueSelector('Attribute')(state, 'joinRoles'));

  return ({
    dataTypeAttributeCode: getDataTypeSelectedAttribute(state).type,
    attributesList: getDataTypeAttributesIdList(state),
    attributeCode: formValueSelector('DataType')(state, 'type'),
    allowedRoles: getDataTypeSelectedAttributeAllowedRoles(state),
    allowedDisablingCodes: getDataTypeSelectedAttributeAllowedRoles(state),
    JoinAllowedOptions: formValueSelector('DateAttribute')(state, 'joinRoles') || [],
    initialValues: {
      code: 'Date',
    },
  });
};
export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchDataTypeAttributes());
  },
  handleSubmit: values => (values),

});
const DataAttributeDateFormContainer =
connect(mapStateToProps, mapDispatchToProps)(DateAttributeForm);
export default DataAttributeDateFormContainer;
