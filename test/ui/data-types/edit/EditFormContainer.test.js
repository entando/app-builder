import 'test/enzyme-init';
import { getParams } from '@entando/router';
import { formValueSelector } from 'redux-form';
import { mapStateToProps, mapDispatchToProps } from 'ui/data-types/edit/EditFormContainer';
import { ROUTE_DATA_TYPE_ATTRIBUTE_EDIT } from 'app-init/router';

const TEST_STATE = { datatypeCode: 'datatypeCode_code' };

getParams.mockReturnValue(TEST_STATE);

formValueSelector.mockReturnValue(() => 'formValueSelector_result');

jest.mock('state/data-types/actions', () => ({
  fetchDataTypeAttributes: jest.fn().mockReturnValue('fetchDataTypeAttributes_result'),
  sendPutDataType: jest.fn().mockReturnValue('sendPutDataType_result'),
  fetchDataType: jest.fn().mockReturnValue('fetchDataType_result'),
  fetchDataTypeAttribute: jest.fn().mockReturnValue('fetchDataTypeAttribute_result'),
  sendMoveAttributeUp: jest.fn().mockReturnValue('sendMoveAttributeUp_result'),
  sendMoveAttributeDown: jest.fn().mockReturnValue('sendMoveAttributeDown_result'),
}));

jest.mock('state/data-types/selectors', () => ({
  getSelectedDataTypeAttributes: jest.fn().mockReturnValue('getSelectedDataTypeAttributes_result'),
  getDataTypeAttributesIdList: jest.fn().mockReturnValue('getDataTypeAttributesIdList_result'),
}));

describe('EditFormContainer', () => {
  const dispatchMock = jest.fn();

  describe('mapStateToProps', () => {
    let props;
    beforeEach(() => {
      props = mapStateToProps({});
    });

    it('maps the properties by state', () => {
      expect(props).toHaveProperty('mode', 'edit');
      expect(props).toHaveProperty('datatypeCode', 'datatypeCode_code');
      expect(props).toHaveProperty('attributes', 'getSelectedDataTypeAttributes_result');
      expect(props).toHaveProperty('attributesType', 'getDataTypeAttributesIdList_result');
      expect(props).toHaveProperty('attributeCode', 'formValueSelector_result');
      expect(props).toHaveProperty('routeToEdit', ROUTE_DATA_TYPE_ATTRIBUTE_EDIT);
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('maps the "onWillMount" prop a "fetchDataType" and "fetchDataTypeAttributes" dispatch', () => {
      expect(props.onWillMount).toBeDefined();
      props.onWillMount('dataType_code');
      expect(dispatchMock).toHaveBeenCalledWith('fetchDataType_result');
      expect(dispatchMock).toHaveBeenCalledWith('fetchDataTypeAttributes_result');
    });

    it('maps the "onAddAttribute" prop a "fetchDataTypeAttribute" dispatch', () => {
      expect(props.onAddAttribute).toBeDefined();
      props.onAddAttribute('attribute_code', 'dataType_code');
      expect(dispatchMock).toHaveBeenCalledWith('fetchDataTypeAttribute_result');
    });

    it('maps the "onMoveUp" prop a "fetchDataTypeAttribute" dispatch', () => {
      expect(props.onMoveUp).toBeDefined();
      props.onMoveUp('attribute_code');
      expect(dispatchMock).toHaveBeenCalledWith('sendMoveAttributeUp_result');
    });

    it('maps the "onMoveDown" prop a "fetchDataTypeAttribute" dispatch', () => {
      expect(props.onMoveDown).toBeDefined();
      props.onMoveDown('attribute_code');
      expect(dispatchMock).toHaveBeenCalledWith('sendMoveAttributeDown_result');
    });

    it('maps the "onSubmit" prop a "sendPutDataType" dispatch', () => {
      expect(props.onSubmit).toBeDefined();
      props.onSubmit();
      expect(dispatchMock).toHaveBeenCalledWith('sendPutDataType_result');
    });
  });
});
