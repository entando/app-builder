import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { formattedText } from 'frontend-common-components';
import { Row, Col, FormGroup, Button } from 'patternfly-react';


export const FragmentSearchFormBody = (props) => {
  const { handleSubmit, widgetTypes, plugins } = props;
  const onSubmit = (ev) => {
    ev.preventDefault();
    handleSubmit();
  };
  return (
    <form onSubmit={onSubmit} className="FragmentSearchForm form-horizontal well">
      <h3><FormattedMessage id="app.search" /></h3>
      <FormGroup>
        <Row>
          <label className="control-label col-sm-2" htmlFor="code">
            <FormattedMessage id="fragment.searchForm.code" />
          </label>
          <Col sm={9}>
            <Field
              id="fragmentcode"
              component="input"
              className="form-control"
              name="code"
              placeholder={formattedText('fragment.searchForm.code')}
            />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Row>
          <label className="control-label col-sm-2" htmlFor="widgetType">
            <FormattedMessage id="fragment.searchForm.code" />
          </label>
          <Col sm={9}>
            <Field
              component="select"
              className="form-control"
              name="widgetType"
              // {widgetTypes.map(wt =>
              //   <option key={wt.code} value={et.code}>{wt.name}</option>)}
              placeholder={formattedText('fragment.searchForm.widgetType')}
            />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Row>
          <label className="control-label col-sm-2" htmlFor="plugin">
            <FormattedMessage id="fragment.searchForm.plugin" />
          </label>
          <Col sm={9}>
            <Field
              component="select"
              className="form-control"
              name="plugin"
              // {plugins.map(plugin =>
              //   <option key={plugin.code} value={plugin.code}>{plugin.name}</option>)}
              placeholder={formattedText('fragment.searchForm.plugin')}
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

FragmentSearchFormBody.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  widgetTypes: PropTypes.arrayOf(PropTypes.shape({})),
  plugins: PropTypes.arrayOf(PropTypes.shape({})),
};

FragmentSearchFormBody.propTypes = {
  widgetTypes: [],
  plugins: [],
};

const FragmentSearchForm = reduxForm({
  form: 'fragmentSearch',
})(FragmentSearchFormBody);

export default FragmentSearchForm;
