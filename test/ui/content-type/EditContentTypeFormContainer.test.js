import { mapStateToProps, mapDispatchToProps } from 'ui/content-type/EditContentTypeFormContainer';
import { ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_EDIT } from 'app-init/router';
import { createMockHistory } from 'test/legacyTestUtils';

jest.mock('redux-form', () => ({
  formValueSelector: jest.fn().mockReturnValue(() => 'formValueSelector_result'),
  reduxForm: () => () => () => 'span',
}));

jest.mock('state/content-type/actions', () => ({
  fetchContentTypeAttributeRefs: jest.fn().mockReturnValue('fetchContentTypeAttributeRefs_result'),
  fetchContentType: jest.fn().mockReturnValue('fetchContentType_result'),
  fetchContentTypeAttributeRef: jest.fn().mockReturnValue('fetchContentTypeAttributeRef_result'),
  setSelectedAttributeRef: jest.fn().mockReturnValue('setSelectedAttributeRef_result'),
  setSelectedContentTypeAttribute: jest.fn().mockReturnValue('setSelectedContentTypeAttribute_result'),
  sendMoveAttributeUp: jest.fn().mockReturnValue('sendMoveAttributeUp_result'),
  sendMoveAttributeDown: jest.fn().mockReturnValue('sendMoveAttributeDown_result'),
}));

jest.mock('state/content-type/selectors', () => ({
  getSelectedContentTypeAttributes: jest
    .fn()
    .mockReturnValue('getSelectedContentTypeAttributes_result'),
  getContentTypeAttributesIdList: jest
    .fn()
    .mockReturnValue('getContentTypeAttributesIdList_result'),
}));

jest.mock('state/pages/selectors', () => ({
  getViewPages: jest.fn().mockReturnValue(['test viewPages']),
}));

jest.mock('state/content-template/selectors', () => ({
  getContentTemplateList: jest.fn().mockReturnValue(['test contentTemplates']),
}));

const ownProps = {
  match: {
    params: {
      code: 'contenttypeCode_code',
    },
  },
};

describe('EditContentTypeFormContainer', () => {
  const dispatchMock = jest.fn();

  describe('mapStateToProps', () => {
    let props;
    beforeEach(() => {
      props = mapStateToProps({}, ownProps);
    });

    it('maps the properties by state', () => {
      expect(props).toHaveProperty('mode', 'edit');
      expect(props).toHaveProperty('contentTypeCode', 'contenttypeCode_code');
      expect(props).toHaveProperty('attributes', 'getSelectedContentTypeAttributes_result');
      expect(props).toHaveProperty('attributesType', 'getContentTypeAttributesIdList_result');
      expect(props).toHaveProperty('attributeCode', 'formValueSelector_result');
      expect(props).toHaveProperty('routeToEdit', ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_EDIT);
      expect(props).toHaveProperty('viewPages', ['test viewPages']);
      expect(props).toHaveProperty('contentTemplates', ['test contentTemplates']);
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    const history = createMockHistory();
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock, { history });
    });

    it('maps the "onDidMount" prop a "fetchContentType" and "fetchContentTypeAttributeRefs" dispatch', () => {
      expect(props.onDidMount).toBeDefined();
      props.onDidMount('contenttypeCode_code');
      expect(dispatchMock).toHaveBeenCalledWith('setSelectedAttributeRef_result');
      expect(dispatchMock).toHaveBeenCalledWith('setSelectedContentTypeAttribute_result');
      expect(dispatchMock).toHaveBeenCalledWith('fetchContentType_result');
      expect(dispatchMock).toHaveBeenCalledWith('fetchContentTypeAttributeRefs_result');
    });

    it('maps the "onAddAttribute" prop a "fetchContentTypeAttributeRef" dispatch', () => {
      expect(props.onAddAttribute).toBeDefined();
      props.onAddAttribute('attribute_code', 'contentType_code');
      expect(dispatchMock).toHaveBeenCalledWith('fetchContentTypeAttributeRef_result');
    });

    it('maps the "onMoveUp" prop a "fetchContentTypeAttributeRef" dispatch', () => {
      expect(props.onMoveUp).toBeDefined();
      props.onMoveUp('attribute_code');
      expect(dispatchMock).toHaveBeenCalledWith('sendMoveAttributeUp_result');
    });

    it('maps the "onMoveDown" prop a "fetchContentTypeAttributeRef" dispatch', () => {
      expect(props.onMoveDown).toBeDefined();
      props.onMoveDown('attribute_code');
      expect(dispatchMock).toHaveBeenCalledWith('sendMoveAttributeDown_result');
    });
  });
});
