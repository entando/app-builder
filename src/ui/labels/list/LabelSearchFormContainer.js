import { connect } from 'react-redux';
import { fetchLabels, setSearchTerm } from 'state/labels/actions';
import { injectIntl } from 'react-intl';
import LabelSearchForm from 'ui/labels/list/LabelSearchForm';
import { convertToQueryString, FILTER_OPERATORS } from '@entando/utils';
import { getPagination } from 'state/pagination/selectors';

export const FIELD_OPERATORS = {
  text: FILTER_OPERATORS.LIKE,
  key: FILTER_OPERATORS.LIKE,
};

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
  onSubmit: (values, pageSize) => {
    dispatch(fetchLabels({ page: 1, pageSize }, convertToQueryString({
      formValues: values,
      operators: FIELD_OPERATORS,
    })));
    dispatch(setSearchTerm(values.key));
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
