import { omit } from 'lodash';
import { connect } from 'react-redux';
import { formValueSelector, submit } from 'redux-form';
import LinkConfigContentForm from 'ui/common/link-config/LinkConfigContentForm';

const selector = formValueSelector('LinkConfigContent');

export const mapStateToProps = (state, { parameters }) => ({
  initialValues: {
    content: parameters.contentDest,
    attributes: { ...omit(parameters, 'pageDest') },
  },
  content: selector(state, 'content'),
  attributes: selector(state, 'attributes'),
});

export const mapDispatchToProps = (dispatch, { onSubmit }) => ({
  handleClick: (content) => {
    submit('LinkConfigContent');
    onSubmit(content);
  },
});

const LinkConfigContentFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false,
  },
)(LinkConfigContentForm);

export default LinkConfigContentFormContainer;
