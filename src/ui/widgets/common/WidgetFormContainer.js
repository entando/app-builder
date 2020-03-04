import { connect } from 'react-redux';
import { change, initialize } from 'redux-form';
import { clearErrors } from '@entando/messages';

import { fetchLanguages } from 'state/languages/actions';
import { fetchGroups } from 'state/groups/actions';
import { getGroupsList } from 'state/groups/selectors';
import WidgetForm from 'ui/widgets/common/WidgetForm';
import { sendPostWidgets } from 'state/widgets/actions';

export const mapStateToProps = state => ({
  groups: getGroupsList(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchLanguages({ page: 1, pageSize: 0 }));
    dispatch(fetchGroups({ page: 1, pageSize: 0 }));
    dispatch(initialize('widget'));
  },
  onSubmit: (values) => {
    const jsonData = {
      ...values,
      configUi: values.configUi ? JSON.parse(values.configUi) : null,
    };
    dispatch(clearErrors());
    dispatch(sendPostWidgets(jsonData));
  },
  onChangeDefaultTitle: title =>
    dispatch(change('widget', 'code', title.replace(/\W/g, '_').toLowerCase())),

});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(WidgetForm);
