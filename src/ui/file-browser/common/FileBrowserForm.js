import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field, reduxForm } from 'redux-form';
import { FormGroup } from 'patternfly-react';
import RenderFileInput from 'ui/common/form/RenderFileInput';

export const FileBrowserBody = (props) => {
  const { handleSubmit } = props;


  return (
    <Form onSubmit={handleSubmit} >
      <FormGroup>
        <Field
          className="FileBrowserForm__file"
          name="upload"
          component={RenderFileInput}
          label="Upload"

        />
      </FormGroup>
    </Form>
  );
};

FileBrowserBody.propTypes = {
  handleSubmit: PropTypes.func,
};

FileBrowserBody.defaultProps = {
  handleSubmit: () => {},
};
const FileBrowserForm = reduxForm({
  form: 'fileBroswer',
})(FileBrowserBody);
export default FileBrowserForm;
