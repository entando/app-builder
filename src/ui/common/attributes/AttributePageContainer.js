import { connect } from 'react-redux';
import AttributePage from 'ui/common/attributes/AttributePage';
import { getDataTypeSelectedAttributeCode } from 'state/data-types/selectors';

export const mapStateToProps = (state) => {
  console.log('CONTAINER PAGE --->  ', getDataTypeSelectedAttributeCode(state));
  return ({
    container: getDataTypeSelectedAttributeCode(state),
  });
};

const AttributePageContainer =
connect(mapStateToProps)(AttributePage);
export default AttributePageContainer;
