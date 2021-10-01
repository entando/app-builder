import { connect } from 'react-redux';
import { formValueSelector, submit } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { routeConverter } from '@entando/utils';
import {
  fetchContentTypeAttributeRefs,
  fetchContentType,
  fetchContentTypeAttributeRef,
  sendPutContentType,
  setSelectedAttributeRef,
  setSelectedContentTypeAttribute,
  sendMoveAttributeUp,
  sendMoveAttributeDown,
} from 'state/content-type/actions';
import {
  getSelectedContentTypeAttributes,
  getContentTypeAttributesIdList,
} from 'state/content-type/selectors';
import AddContentTypeForm from 'ui/content-type/AddContentTypeForm';

import { setVisibleModal, setInfo } from 'state/modal/actions';
import { MODAL_ID } from 'ui/content-type/attributes/DeleteAttributeModal';
import {
  ROUTE_CMS_CONTENTTYPE_LIST,
  ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_ADD,
  ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_EDIT,
} from 'app-init/router';
import { fetchContentTemplatesByContentType } from 'state/content-template/actions';
import { getViewPages } from 'state/pages/selectors';
import { fetchViewPages } from 'state/pages/actions';
import { getContentTemplateList } from 'state/content-template/selectors';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';
import { getLocale } from 'state/locale/selectors';

export const mapStateToProps = (state, { match: { params } }) => ({
  mode: 'edit',
  contentTypeCode: params.code,
  attributes: getSelectedContentTypeAttributes(state),
  attributesType: getContentTypeAttributesIdList(state),
  attributeCode: formValueSelector('ContentType')(state, 'type'),
  routeToEdit: ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_EDIT,
  viewPages: getViewPages(state),
  contentTemplates: getContentTemplateList(state),
  locale: getLocale(state),
});

export const mapDispatchToProps = (dispatch, { history }) => ({
  onDidMount: ({ contentTypeCode }) => {
    dispatch(setSelectedAttributeRef({}));
    dispatch(setSelectedContentTypeAttribute());
    dispatch(fetchContentType(contentTypeCode));
    dispatch(fetchContentTypeAttributeRefs());
    dispatch(fetchContentTemplatesByContentType(contentTypeCode));
    dispatch(fetchViewPages());
  },
  onAddAttribute: ({ attributeCode, contentTypeCode }) => {
    dispatch(fetchContentTypeAttributeRef(contentTypeCode, attributeCode, () => (
      history.push(routeConverter(
        ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_ADD,
        { entityCode: contentTypeCode },
      ))
    )));
  },

  onMoveUp: (entityCode, attributeCode, attributeIndex) => {
    dispatch(sendMoveAttributeUp({ entityCode, attributeCode, attributeIndex }));
  },
  onMoveDown: (entityCode, attributeCode, attributeIndex) => {
    dispatch(sendMoveAttributeDown({ entityCode, attributeCode, attributeIndex }));
  },
  onClickDelete: (code) => {
    dispatch(setVisibleModal(MODAL_ID));
    dispatch(setInfo({ type: 'attribute', code }));
  },
  onSubmit: (values) => {
    dispatch(sendPutContentType(values)).then((res) => {
      if (res) {
        history.push(ROUTE_CMS_CONTENTTYPE_LIST);
      }
    });
  },
  onSave: () => { dispatch(setVisibleModal('')); dispatch(submit('ContentType')); },
  onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
  onDiscard: () => { dispatch(setVisibleModal('')); history.push(routeConverter(ROUTE_CMS_CONTENTTYPE_LIST)); },
});

const EditContentTypeFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false,
  },
)(AddContentTypeForm);

export default withRouter(injectIntl(EditContentTypeFormContainer));
