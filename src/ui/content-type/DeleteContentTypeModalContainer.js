import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { sendDeleteContentType, fetchContentTypeListPaged } from 'state/content-type/actions';
import { ROUTE_CMS_CONTENTTYPE_LIST } from 'app-init/router';

import DeleteContentTypeModal from 'ui/content-type/DeleteContentTypeModal';

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = (dispatch, { history }) => ({
  onConfirmDelete: (contentTypeCode) => {
    dispatch(setVisibleModal(''));
    dispatch(sendDeleteContentType(contentTypeCode)).then((result) => {
      if (result) {
        dispatch(fetchContentTypeListPaged({ page: 1, pageSize: 10 }));
        history.push(ROUTE_CMS_CONTENTTYPE_LIST);
      }
    });
  },
});

const DeleteContentTypeModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteContentTypeModal);

export default withRouter(DeleteContentTypeModalContainer);
