import { connect } from 'react-redux';
import { fetchDataTypeAttributes, sendPostAttributeFromDataType } from 'state/data-types/actions';
import { formValueSelector } from 'redux-form';
import { getParams, gotoRoute } from '@entando/router';
import AttributeForm from 'ui/common/form/AttributeForm';
import {
  getDataTypeSelectedAttribute,
  getDataTypeSelectedAttributeCode,
  getDataTypeSelectedAttributeIsList,
} from 'state/data-types/selectors';

import { ROUTE_DATA_TYPE_EDIT } from 'app-init/router';

export const mapStateToProps = state => ({
  dataTypeAttributeCode: getParams(state).entityCode,
  JoinAllowedOptions: formValueSelector('attribute')(state, 'joinRoles') || [],
  selectedAttributeType: getDataTypeSelectedAttribute(state),
  initialValues: {
    type: getDataTypeSelectedAttributeCode(state),
  },
});

export const mapDispatchToProps = (dispatch, state) => ({
  onWillMount: () => {
    dispatch(fetchDataTypeAttributes());
  },
  onSubmit: (values) => {
    dispatch(sendPostAttributeFromDataType(values));
    if (getDataTypeSelectedAttributeIsList(state)) {
      gotoRoute(ROUTE_DATA_TYPE_EDIT, { datatypeCode: getParams(state).entityCode });
    } else {
      gotoRoute(ROUTE_DATA_TYPE_EDIT, { datatypeCode: getParams(state).entityCode });
    }
  },
});

const AddFormContainer =
connect(mapStateToProps, mapDispatchToProps)(AttributeForm);
export default AddFormContainer;
