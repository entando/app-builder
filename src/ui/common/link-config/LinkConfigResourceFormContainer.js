import { omit } from 'lodash';
import { connect } from 'react-redux';
import { formValueSelector, submit } from 'redux-form';
import LinkConfigResourceForm from './LinkConfigResourceForm';

const selector = formValueSelector('LinkConfigResource');

export const mapStateToProps = (state, { joinGroups, mainGroup, parameters }) => ({
  initialValues: {
    resource: parameters.contentDest,
    attributes: { ...omit(parameters, 'dest') },
  },
  resource: selector(state, 'resource'),
  attributes: selector(state, 'attributes'),
  joinGroups,
  mainGroup,
});

export const mapDispatchToProps = (dispatch, { onSubmit, onCancel }) => ({
  handleSubmit: (content) => {
    submit('LinkConfigResource');
    onSubmit(content);
  },
  onCancel,
});
const LinkConfigResourceFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null, { pure: false },
)(LinkConfigResourceForm);

export default LinkConfigResourceFormContainer;
