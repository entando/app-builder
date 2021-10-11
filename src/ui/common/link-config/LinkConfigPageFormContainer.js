import { connect } from 'react-redux';
import { formValueSelector, submit } from 'redux-form';
import { omit } from 'lodash';
import LinkConfigPageForm from './LinkConfigPageForm';

const selector = formValueSelector('LinkConfigPage');

export const mapStateToProps = (state, { parameters, joinGroups, mainGroup }) => ({
  initialValues: {
    page: parameters.pageDest || '',
    attributes: { ...omit(parameters, 'pageDest') },
  },
  page: selector(state, 'page') || '',
  attributes: selector(state, 'attributes'),
  joinGroups,
  mainGroup,
});

export const mapDispatchToProps = (dispatch, { onSubmit, onCancel }) => ({
  handleSubmit: (data) => {
    submit('LinkConfigPage');
    onSubmit(data);
  },
  onCancel,
});

const LinkConfigPageFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false,
  },
)(LinkConfigPageForm);
export default LinkConfigPageFormContainer;
