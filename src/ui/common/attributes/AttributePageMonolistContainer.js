import { connect } from 'react-redux';
import { fetchDataTypeAttribute } from 'state/data-types/actions';
import AttributePageMonolist from 'ui/common/attributes/AttributePageMonolist';
import { getDataTypeSelectedAttributeCode } from 'state/data-types/selectors';

export const mapStateToProps = state => ({
  composite: getDataTypeSelectedAttributeCode(state),
});
export const mapDispatchToProps = dispatch => ({
  onWillMount: (attributeCode) => {
    dispatch(fetchDataTypeAttribute(attributeCode));
  },
  handleSubmit: values => (values),
});
const AttributePageMonolistContainer =
connect(mapStateToProps)(AttributePageMonolist);
export default AttributePageMonolistContainer;
