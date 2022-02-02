import { connect } from 'react-redux';
import { fetchLabels, setLabelFilters } from 'state/labels/actions';
import { injectIntl } from 'react-intl';
import LabelSearchForm from 'ui/labels/list/LabelSearchForm';

const DEFAULT_PAGE = { page: 1, pageSize: 10 };

export const mapStateToProps = (state) => {
  const {
    page, pageSize,
  } = getPagination(state);
  return ({
    page,
    pageSize,
  });
};

export const mapDispatchToProps = dispatch => ({
  onSubmit: (values) => {
    dispatch(setLabelFilters({ keyword: values.key }));
    dispatch(fetchLabels(DEFAULT_PAGE));
  },
  onUnmount: () => {
    dispatch(setLabelFilters({ keyword: '' }));
  },
  onMount: () => {
    dispatch(fetchLabels(DEFAULT_PAGE));
  },
});

const LabelSearchFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false,
  },
)(LabelSearchForm);
export default injectIntl(LabelSearchFormContainer);
