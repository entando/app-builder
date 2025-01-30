import { connect } from 'react-redux';

import { fetchFragments } from 'state/fragments/actions';
import { getFragmentList, getFilters } from 'state/fragments/selectors';
import { getLoading } from 'state/loading/selectors';
import { getCurrentPage, getTotalItems, getPageSize, getLastPage } from 'state/pagination/selectors';
import { setVisibleModal, setInfo } from 'state/modal/actions';

import FragmentGrid from 'ui/fragments/list/FragmentGrid';
import { MODAL_ID } from 'ui/fragments/list/DeleteFragmentModal';

export const mapStateToProps = state => (
  {
    fragments: getFragmentList(state).map((f => (
      {
        title: f.code,
        subtitle: Object.is(f.widgetType, null) ? '' : f.widgetType.title,
        description: f.pluginCode || '',
        ...f,
      }))),
    page: getCurrentPage(state),
    totalItems: getTotalItems(state),
    pageSize: getPageSize(state),
    lastPage: getLastPage(state),
    loading: getLoading(state).fragments,
    filters: getFilters(state),
  }
);

export const mapDispatchToProps = dispatch => ({
  onWillMount: (page = { page: 1, pageSize: 20 }, params) => {
    dispatch(fetchFragments(page, params));
  },
  onClickDelete: (fragment) => {
    dispatch(setVisibleModal(MODAL_ID));
    dispatch(setInfo({ type: 'fragment', code: fragment.code }));
  },
});

const FragmentGridContainer =
  connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {
      pure: false,
    },
  )(FragmentGrid);

export default FragmentGridContainer;
