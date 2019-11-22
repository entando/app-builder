import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { clearErrors } from '@entando/messages';
import { getContentModelList } from 'state/content-model/selectors';
import HandpickedContentsConfigForm from 'ui/widgets/config/forms/HandpickedContentsConfigForm';
import { fetchContentModelListPaged } from 'state/content-model/actions';

export const mapStateToProps = state => ({
  contentModels: getContentModelList(state),
});

export const mapDispatchToProps = dispatch => ({
  onDidMount: () => {
    dispatch(fetchContentModelListPaged());
  },
  onSubmit: (values) => {
    dispatch(clearErrors());
    console.log('config form submit: ', values);
  },
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(injectIntl(HandpickedContentsConfigForm));
