import { connect } from 'react-redux';
import { fetchDataTypeAttribute } from 'state/data-types/actions';
import AttributePageMonolist from 'ui/common/attributes/AttributePageMonolist';
// import { getParams } from '@entando/router';
// import { formValueSelector } from 'redux-form';
import {
  getDataTypeSelectedAttributeCode,
  getDataTypeAttributesIdList,
  getSelectedDataTypeAttributes,
  getDataTypeSelectedAttributeIsList,
} from 'state/data-types/selectors';

export const mapStateToProps = (state) => {
  console.log('1', getDataTypeSelectedAttributeCode(state));
  console.log('2', getDataTypeAttributesIdList(state));
  console.log('3', getSelectedDataTypeAttributes(state));
  console.log('4', getDataTypeSelectedAttributeIsList(state));
  return {
    composite: getDataTypeSelectedAttributeCode(state),
    // datatypeCode: getParams(state).datatypeCode,
    // attributeCode2: getParams(state).attributeCode,
    // attributeCode: formValueSelector('DataType')(state, 'type'),
    // dataTypeAttributeCode: getParams(state).entityCode,
    // attributesType: getDataTypeAttributesIdList(state),
  };
};

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchDataTypeAttribute());
  },
  handleSubmit: values => (values),
});

const AttributePageMonolistContainer =
connect(mapStateToProps)(AttributePageMonolist);
export default AttributePageMonolistContainer;
