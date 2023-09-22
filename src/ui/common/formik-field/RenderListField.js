import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'formik';
import { TYPE_COMPOSITE } from 'state/data-types/const';
import { getComponentType } from 'helpers/formikEntities';
import { CompositeField } from 'ui/user-profile/common/UserProfileField';
import { Button, ButtonGroup, Col, FormGroup } from 'patternfly-react';
import Panel from 'react-bootstrap/lib/Panel';

class RenderListField extends Component {
  buttonMoveUp(index) {
    const {
      swap,
    } = this.props;
    if ((index) > 0) {
      return (
        <Button
          className="pull-right"
          bsStyle="default"
          title={`Move up ${index + 1}`}
          onClick={() => swap(index, index - 1)}
        >
          <i className="fa fa-sort-asc" />
        </Button>
      );
    }
    return null;
  }
  buttonMoveDown(index, arraySize) {
    const {
      swap,
    } = this.props;
    if ((index) < arraySize - 1) {
      return (
        <Button
          className="pull-right"
          bsStyle="default"
          title={`Move down ${index + 1}`}
          onClick={() => swap(index, index + 1)}
        >
          <i className="fa fa-sort-desc" />
        </Button>
      );
    }
    return null;
  }

  render() {
    const {
      attributeType, options, optionValue,
      optionDisplayName, label, nestedAttribute, intl,
      push, remove, form, name,
    } = this.props;
    return (
      <div>
        <FormGroup>
          <label className="col-xs-2 text-right control-label">
            <div>{label}</div>
            <Button
              bsStyle="primary"
              title="Add"
              onClick={() => push()}
            >
              <FormattedMessage id="app.add" />
            </Button>
          </label>
          <Col xs={10}>
            {form.initialValues[name] && form.initialValues[name].map((item, index) => (
              <Panel key={item}>
                <Panel.Heading>
                  <b>{index + 1}</b>
                  <div className="pull-right">
                    <ButtonGroup>
                      {this.buttonMoveUp(index)}
                      {this.buttonMoveDown(index, form.values[name].length)}
                    </ButtonGroup>

                    <Button
                      bsStyle="danger"
                      title={`Remove ${index + 1}`}
                      onClick={() => remove(index)}
                    >
                      <FormattedMessage id="app.delete" />
                    </Button>
                  </div>
                </Panel.Heading>
                <Panel.Body>
                  {attributeType === TYPE_COMPOSITE ? (
                    <CompositeField
                      fieldName={`${name}.${index}`}
                      attribute={nestedAttribute}
                      intl={intl}
                      noLabel
                    />
                  ) : (
                    <Field
                      name={`${name}.${index}`}
                      type="text"
                      component={getComponentType(attributeType)}
                      label={index + 1}
                      options={options}
                      optionValue={optionValue}
                      optionDisplayName={optionDisplayName}
                    />
                  )}
                </Panel.Body>
              </Panel>
            ))}
          </Col>
        </FormGroup>
      </div>
    );
  }
}

RenderListField.propTypes = {
  nestedAttribute: PropTypes.shape({}),
  attributeType: PropTypes.string,
  label: PropTypes.node,
  options: PropTypes.arrayOf(PropTypes.shape({
    optionDisplayName: PropTypes.string,
    value: PropTypes.string,
  })),
  intl: PropTypes.shape({}).isRequired,
  optionValue: PropTypes.string,
  optionDisplayName: PropTypes.string,
  push: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  swap: PropTypes.func.isRequired,
  form: PropTypes.shape({
    values: PropTypes.shape({}).isRequired,
    initialValues: PropTypes.shape({}).isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
};

RenderListField.defaultProps = {
  label: null,
  options: [],
  optionValue: 'value',
  optionDisplayName: 'optionDisplayName',
  nestedAttribute: null,
  attributeType: null,
};

export default RenderListField;
