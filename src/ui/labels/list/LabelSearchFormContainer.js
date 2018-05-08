import { connect } from 'react-redux';
import { fetchLabels } from 'state/labels/actions';
import LabelSearchForm from 'ui/labels/list/LabelSearchForm';
import { convertToQueryString, FILTER_OPERATORS } from '@entando/utils';

const FIELD_OPERATORS = {
  text: FILTER_OPERATORS.LIKE,
};

export const mapDispatchToProps = dispatch => ({
  onSubmit: (values) => {
    dispatch(fetchLabels({ page: 1, pageSize: 10 }, convertToQueryString({
      formValues: values,
      operators: FIELD_OPERATORS,
    })));
  },
});

const LabelSearchFormContainer = connect(
  null,
  mapDispatchToProps,
)(LabelSearchForm);
export default LabelSearchFormContainer;
