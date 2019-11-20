import React, { PureComponent, Fragment } from 'react';
import AsyncTypeAheadSelect from 'ui/widgets/config/forms/AsyncTypeAheadSelect';

import PropTypes from 'prop-types';
import { Button, Row, Col, FormGroup } from 'patternfly-react';

import { Field, reduxForm } from 'redux-form';

import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import FormLabel from 'ui/common/form/FormLabel';
import RenderTextInput from 'ui/common/form/RenderTextInput';


class ContentPickerBody extends PureComponent {
  componentDidMount() {
    this.props.onDidMount();
  }

  render() {
    const {
      contentTypeList, contentStatusList, fetchContents, handleSubmit, change,
    } = this.props;
    return (
      <Fragment>
        <Row>
          <Col xs={6}>
            <Field
              name="typeCode"
              component={RenderSelectInput}
              label={
                <FormLabel labelId="contentPicker.type" />
              }
              options={contentTypeList}
              optionValue="code"
              optionDisplayName="name"
              defaultOptionId="contentPicker.allTypes"
            />
          </Col>
          <Col xs={6}>
            <Field
              name="status"
              component={RenderSelectInput}
              label={
                <FormLabel labelId="contentPicker.status" />
              }
              options={contentStatusList}
              optionValue="code"
              optionDisplayName="name"
              defaultOptionId="contentPicker.allStatuses"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={10}>
            <AsyncTypeAheadSelect
              id="content-picker"
              label={
                <FormLabel labelId="contentPicker.description" />
              }
              placeholder="Type to search for a content, ENTER to select it"
              onSearch={fetchContents}
              onChange={selectedOptions => change('content', selectedOptions[0].id)}
              labelKey={option => `${option.id} - ${option.description}`}
              useCache={false}
            />
            <Field
              component={RenderTextInput}
              name="content"
              type="hidden"
            />
          </Col>
          <Col xs={2}>
            <FormGroup>
              <Button bsStyle="primary" type="submit" onClick={handleSubmit}>
              +
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

const ContentPicker = reduxForm()(ContentPickerBody);

ContentPickerBody.propTypes = {
  change: PropTypes.func.isRequired,
  onDidMount: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  fetchContents: PropTypes.func.isRequired,
  contentTypeList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  contentStatusList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  // invalid: PropTypes.bool.isRequired,
  // submitting: PropTypes.bool.isRequired,
};

ContentPickerBody.defaultProps = {
};

export default ContentPicker;
