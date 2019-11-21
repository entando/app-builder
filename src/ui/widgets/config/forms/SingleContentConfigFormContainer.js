import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { clearErrors } from '@entando/messages';
import { getContentModelList } from 'state/content-model/selectors';
import SingleContentConfigForm from 'ui/widgets/config/forms/SingleContentConfigForm';


export const mapStateToProps = state => ({
  contentModels: getContentModelList(state),
});

export const mapDispatchToProps = dispatch => ({
  onDidMount: () => {
  },
  onSubmit: (values) => {
    dispatch(clearErrors());
    console.log('config form submit: ', values);
  },
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(injectIntl(SingleContentConfigForm));
