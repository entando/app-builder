import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { routeConverter, convertToQueryString, FILTER_OPERATORS } from '@entando/utils';
import { addToast, TOAST_SUCCESS } from '@entando/messages';
import {
  setQuickFilter, checkStatus, checkAccess, checkAuthor, sendCloneContent,
  setCurrentAuthorShow, setCurrentStatusShow, fetchContentsPaged,
  setContentType, setGroup, setSort, selectRows, selectAllRows, resetJoinContentCategories,
  setTabSearch,
  resetAuthorStatus, leaveContentsPage,
} from 'state/contents/actions';
import { fetchCategoryTree } from 'state/categories/actions';
import { setNewContentsType, setWorkMode } from 'state/edit-content/actions';
import { fetchContentTypeListPaged } from 'state/content-type/actions';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { fetchUsers } from 'state/users/actions';
import {
  getContents, getCurrentQuickFilter, getFilteringCategories,
  getStatusChecked, getAccessChecked, getAuthorChecked, getCurrentAuthorShow,
  getCurrentStatusShow, getSortingColumns,
  getSelectedRows, getGroup,
} from 'state/contents/selectors';
import { setColumnOrder } from 'state/table-column-order/actions';
import { getColumnOrder } from 'state/table-column-order/selectors';
import { ROUTE_CMS_EDIT_CONTENT, ROUTE_CMS_ADD_CONTENT } from 'app-init/router';
import { getPagination } from 'state/pagination/selectors';
import { NAMESPACE_CONTENTS } from 'state/pagination/const';
import { getContentTypeList } from 'state/content-type/selectors';
import { getLoading } from 'state/loading/selectors';
import { getGroupsList } from 'state/groups/selectors';
import { getLocale } from 'state/locale/selectors';
import { getUsername } from '@entando/apimanager';
import { DELETE_CONTENT_MODAL_ID } from 'ui/contents/DeleteContentModal';
import { PUBLISH_CONTENT_MODAL_ID } from 'ui/contents/PublishContentModal';
import { JOIN_CATEGORIES_MODAL_ID } from 'ui/contents/JoinCategoriesModal';
import { WORK_MODE_EDIT, WORK_MODE_ADD } from 'state/edit-content/types';
import Contents from 'ui/contents/Contents';
import { getUserList } from 'state/users/selectors';

const noPage = { page: 1, pageSize: 0 };

const paramsForStatusAndAuthor = (status, author) => {
  const published = status === 'published';
  const all = author === 'all';
  const eq = FILTER_OPERATORS.EQUAL;

  const formValues = {
    ...((!published && status !== 'all') && { status }),
    ...(!all && { author }),
  };
  const operators = {
    ...((!published && status !== 'all') && { status: eq }),
    ...(!all && { author: eq }),
  };
  const query = `${convertToQueryString({
    formValues,
    operators,
  })}${published ? '&status=published' : ''}`;

  return query.slice(1);
};

export const mapStateToProps = (state) => {
  const {
    page, lastPage, totalItems, pageSize,
  } = getPagination(state, NAMESPACE_CONTENTS);
  return ({
    loading: getLoading(state).contents,
    language: getLocale(state),
    contents: getContents(state),
    currentQuickFilter: getCurrentQuickFilter(state),
    groups: getGroupsList(state),
    groupFilter: getGroup(state),
    contentTypes: getContentTypeList(state),
    filteringCategories: getFilteringCategories(state),
    statusChecked: getStatusChecked(state),
    accessChecked: getAccessChecked(state),
    authorChecked: getAuthorChecked(state),
    currentAuthorShow: getCurrentAuthorShow(state),
    currentStatusShow: getCurrentStatusShow(state),
    currentColumnsShow: getColumnOrder(state, 'contentListPage'),
    page,
    lastPage,
    totalItems,
    pageSize,
    sortingColumns: getSortingColumns(state),
    selectedRows: getSelectedRows(state),
    currentUsername: getUsername(state),
    users: getUserList(state),
  });
};

export const mapDispatchToProps = (dispatch, { intl, history }) => ({
  onDidMount: () => {
    dispatch(fetchContentsPaged());
    dispatch(fetchCategoryTree());
    dispatch(fetchContentTypeListPaged(noPage));
    dispatch(fetchUsers(noPage));
  },
  onSetQuickFilter: filter => dispatch(setQuickFilter(filter)),
  onFilteredSearch: (params, page, sort, tabSearch) => (
    dispatch(fetchContentsPaged({
      params, page, sort, tabSearch,
    }))
  ),
  onSetTabSearch: tabSearch => dispatch(setTabSearch(tabSearch)),
  onCheckStatus: status => dispatch(checkStatus(status)),
  onCheckAccess: access => dispatch(checkAccess(access)),
  onCheckAuthor: author => dispatch(checkAuthor(author)),
  onSetCurrentAuthorShow: (author, status) => {
    dispatch(setCurrentAuthorShow(author));
    dispatch(fetchContentsPaged({
      params: paramsForStatusAndAuthor(status, author),
      tabSearch: true,
    }));
  },
  onSetCurrentStatusShow: (status, author) => {
    dispatch(setCurrentStatusShow(status));
    dispatch(fetchContentsPaged({
      params: paramsForStatusAndAuthor(status, author),
      tabSearch: true,
    }));
  },
  onAdvancedFilterSearch: () => {
    dispatch(resetAuthorStatus());
    dispatch(fetchContentsPaged());
  },
  onSetCurrentColumnsShow: columnOrder => dispatch(setColumnOrder(columnOrder, 'contentListPage')),
  onSetContentType: contentType => dispatch(setContentType(contentType)),
  onSetGroup: group => dispatch(setGroup(group)),
  onSetSort: sort => dispatch(setSort(sort)),
  onSelectRows: contentIds => dispatch(selectRows(contentIds)),
  onSelectAllRows: checked => dispatch(selectAllRows(checked)),
  onEditContent: (contentId) => {
    dispatch(setWorkMode(WORK_MODE_EDIT));
    dispatch(setCurrentStatusShow('all'));
    history.push(routeConverter(ROUTE_CMS_EDIT_CONTENT, { id: contentId }));
  },
  onClickDelete: (item) => {
    dispatch(setVisibleModal(DELETE_CONTENT_MODAL_ID));
    dispatch(setInfo(item));
  },
  onClickPublish: (contents, onLine) => {
    dispatch(setVisibleModal(PUBLISH_CONTENT_MODAL_ID));
    dispatch(setInfo({ contents, onLine }));
  },
  onClickAddContent: (contentType) => {
    dispatch(setWorkMode(WORK_MODE_ADD));
    dispatch(setCurrentStatusShow('all'));
    dispatch(setNewContentsType(contentType));
    history.push(routeConverter(ROUTE_CMS_ADD_CONTENT, { contentType: contentType.typeCode }));
  },
  onClickJoinCategories: (contents) => {
    dispatch(resetJoinContentCategories());
    dispatch(setVisibleModal(JOIN_CATEGORIES_MODAL_ID));
    dispatch(setInfo({ contents }));
  },
  onClickClone: (content) => {
    dispatch(setWorkMode(WORK_MODE_EDIT));
    dispatch(sendCloneContent(content.id)).then((res) => {
      if (res) {
        dispatch(addToast(
          intl.formatMessage({ id: 'cms.contents.cloned', defaultMessage: 'Cloned' }),
          TOAST_SUCCESS,
        ));
        history.push(routeConverter(ROUTE_CMS_EDIT_CONTENT, { id: res.id }));
      }
    });
  },
  onWillUnmount: () => dispatch(leaveContentsPage()),
});

const ContentsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Contents);

export default withRouter(injectIntl(ContentsContainer));
