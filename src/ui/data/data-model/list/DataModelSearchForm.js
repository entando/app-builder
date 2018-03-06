import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { formattedText } from 'frontend-common-components';
import { Row, Col, FormGroup, Button } from 'patternfly-react';


export const DataModelSearchFormBody = (props) => {
  const { handleSubmit } = props;
  const onSubmit = (ev) => {
    ev.preventDefault();
    handleSubmit();
  };
  return (
    <form onSubmit={onSubmit} className="DataModelSearchForm form-horizontal well">
      <h3><FormattedMessage id="app.search" /></h3>
      <FormGroup>
        <Row>
          <label className="control-label col-sm-2" htmlFor="pagecode">
            <FormattedMessage id="app.type" />
          </label>
          <Col sm={9}>
            <Field
              id={formattedText('app.type')}
              component="select"
              className="form-control"
              name="type"
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

DataModelSearchFormBody.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const DataModelSearchForm = reduxForm({
  form: 'dataModelSearch',
})(DataModelSearchFormBody);

export default DataModelSearchForm;
