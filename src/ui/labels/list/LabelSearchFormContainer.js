import { connect } from 'react-redux';
import { fetchLabels, setLabelFilters } from 'state/labels/actions';
import { injectIntl } from 'react-intl';
import LabelSearchForm from 'ui/labels/list/LabelSearchForm';

export const mapDispatchToProps = dispatch => ({
  onSubmit: (values) => {
    dispatch(setLabelFilters({ keyword: values.key }));
    dispatch(fetchLabels({ page: 1, pageSize: 10 }));
  },
});

const LabelSearchFormContainer = connect(
  null,
  mapDispatchToProps,
  null,
  {
    pure: false,
  },
)(LabelSearchForm);
export default injectIntl(LabelSearchFormContainer);
