import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { routeConverter } from '@entando/utils';

import { fetchContents } from 'state/contents/actions';
import { getContentsWithNamespace } from 'state/contents/selectors';

import { withPermissionValues } from 'ui/auth/withPermissions';

import { setColumnOrder } from 'state/table-column-order/actions';
import { getColumnOrder } from 'state/table-column-order/selectors';
import { getPagination } from 'state/pagination/selectors';

import ContentListCard from 'ui/contents/list-card/ContentListCard';
import { setWorkMode, setNewContentsType } from 'state/edit-content/actions';
import { WORK_MODE_ADD } from 'state/edit-content/types';
import { ROUTE_CMS_ADD_CONTENT } from 'app-init/router';
import { fetchContentTypeListPaged } from 'state/content-type/actions';
import { getContentTypeList } from 'state/content-type/selectors';

const namespace = 'contentsTile';

const mapStateToProps = state => ({
  contents: getContentsWithNamespace(state, namespace),
  contentTypes: getContentTypeList(state),
  pagination: getPagination(state, namespace),
  columnOrder: getColumnOrder(state, 'dashboardContentList'),
});

const mapDispatchToProps = (dispatch, { history }) => ({
  onDidMount: (page = 1, pageSize = 5) => {
    dispatch(fetchContents({ page, pageSize }, '?sort=lastModified&direction=DESC', namespace));
    dispatch(fetchContentTypeListPaged({ page: 1, pageSize: 0 }, '', 'contentTypesTile'));
  },
  onSetColumnOrder: columnOrder => dispatch(setColumnOrder(columnOrder, 'dashboardContentList')),
  onClickAddContent: (contentType) => {
    dispatch(setWorkMode(WORK_MODE_ADD));
    dispatch(setNewContentsType(contentType));
    history.push(routeConverter(ROUTE_CMS_ADD_CONTENT, { contentType: contentType.typeCode }));
  },
});

const ContentsStatusCardContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContentListCard));

export default withPermissionValues(ContentsStatusCardContainer);
