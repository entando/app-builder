import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { clearErrors } from '@entando/messages';
import { formValueSelector } from 'redux-form';
import { routeConverter } from '@entando/utils';

import {
  fetchAttributeFromContentType,
  fetchContentTypeAttributeRef,
  sendPostAttributeFromContentTypeMonolist,
  sendPutAttributeFromContentTypeMonolist,
  setActionMode,
  removeAttributeFromComposite,
  moveAttributeFromComposite,
  fetchNestedAttribute,
} from 'state/content-type/actions';
import {
  getActionModeContentTypeSelectedAttribute,
  getContentTypeAttributesIdList,
  getContentTypeSelectedAttribute,
  getAttributeSelectFromContentType,
  getSelectedCompositeAttributes,
  getContentTypeSelectedNestedAttributeIndexable,
  getContentTypeSelectedNestedAttributeSearchable,
} from 'state/content-type/selectors';
import {
  TYPE_COMPOSITE,
  MODE_ADD_MONOLIST_ATTRIBUTE_COMPOSITE,
  MODE_ADD_SUB_ATTRIBUTE_MONOLIST_COMPOSITE,
} from 'state/content-type/const';

import {
  ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_MONOLIST_ADD,
  ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_ADD,
} from 'app-init/router';

import ContentTypeMonolistAttributeForm from 'ui/common/form/ContentTypeMonolistAttributeForm';

export const mapStateToProps = (state, { match: { params } }) => ({
  mode: getActionModeContentTypeSelectedAttribute(state),
  attributeCode: params.attributeCode,
  contentTypeCode: params.entityCode,
  isIndexable: getContentTypeSelectedNestedAttributeIndexable(state),
  isSearchable: getContentTypeSelectedNestedAttributeSearchable(state),
  type: formValueSelector('monoListAttribute')(state, 'nestedAttribute.type'),
  selectedAttribute: getAttributeSelectFromContentType(state),
  selectedAttributeTypeForAddComposite: getContentTypeSelectedAttribute(state),
  selectedAttributeType: formValueSelector('monoListAttribute')(state, 'type'),
  attributesList: getContentTypeAttributesIdList(state),
  compositeAttributes: getSelectedCompositeAttributes(state),
});

export const mapDispatchToProps = (dispatch, { match: { params }, history }) => ({
  onDidMount: ({
    attributeCode, contentTypeCode, mode,
  }) => {
    dispatch(clearErrors());
    if (mode === MODE_ADD_MONOLIST_ATTRIBUTE_COMPOSITE) {
      dispatch(fetchContentTypeAttributeRef(
        contentTypeCode,
        TYPE_COMPOSITE,
        () => (
          history.push(routeConverter(ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_MONOLIST_ADD, {
            entityCode: contentTypeCode,
            attributeCode,
          }))
        ),
        '',
        'monoListAttribute',
      ));
    } else {
      dispatch(fetchAttributeFromContentType('monoListAttribute', contentTypeCode, attributeCode));
    }
  },
  onFetchNestedAttribute: ({ contentTypeCode, type, mode }) => {
    if (mode !== MODE_ADD_MONOLIST_ATTRIBUTE_COMPOSITE) {
      dispatch(fetchNestedAttribute(contentTypeCode, type));
    }
  },
  onSubmit: (values, mode, selectedAttribute) => {
    if (mode === MODE_ADD_MONOLIST_ATTRIBUTE_COMPOSITE) {
      dispatch(sendPostAttributeFromContentTypeMonolist(
        selectedAttribute,
        params.entityCode,
        history,
      ));
    } else {
      dispatch(sendPutAttributeFromContentTypeMonolist(values, params.entityCode, history));
    }
  },
  onAddAttribute: ({ contentTypeCode, type }) => {
    dispatch(setActionMode(MODE_ADD_SUB_ATTRIBUTE_MONOLIST_COMPOSITE));
    dispatch(fetchContentTypeAttributeRef(
      contentTypeCode,
      type,
      () => history.push(routeConverter(ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_ADD, {
        entityCode: contentTypeCode,
      })),
      type,
      'addAttribute',
    ));
  },
  onClickDelete: (attributeCode) => {
    dispatch(removeAttributeFromComposite(attributeCode));
  },
  onMove: (fromIndex, toIndex) => {
    dispatch(moveAttributeFromComposite(fromIndex, toIndex));
  },
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false },
)(ContentTypeMonolistAttributeForm));
