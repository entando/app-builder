import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { formattedText } from 'frontend-common-components';
import { Row, Col, FormGroup, Button } from 'patternfly-react';


export const FragmentFormBody = (props) => {
  const { handleSubmit } = props;
  const onSubmit = (ev) => {
    ev.preventDefault();
    handleSubmit();
  };
  return (
    <form onSubmit={onSubmit} className="form-horizontal well">
      <h3>Search</h3>
      <FormGroup>
        <Row>
          <label className="control-label col-sm-2" htmlFor="pagecode">
            <FormattedMessage id="pageTree.searchForm.code" />
          </label>
          <Col sm={9}>
            <Field
              id="pagecode"
              component="input"
              className="form-control"
              name="code"
              placeholder={formattedText('pageTree.searchForm.code')}
            />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Row>
          <Col xs={11}>
            <Button
              type="submit"
              bsStyle="primary"
              className="pull-right"
            >
              <FormattedMessage id="app.search" />
            </Button>
          </Col>
        </Row>
      </FormGroup>
    </form>

  );
};

FragmentFormBody.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const FragmentForm = reduxForm({
  form: 'pageSearch',
})(FragmentFormBody);

export default FragmentForm;
