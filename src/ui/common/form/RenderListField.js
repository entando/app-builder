import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
import { getComponentType } from 'helpers/entities';
import { Button, ButtonGroup, Col, FormGroup } from 'patternfly-react';
import Panel from 'react-bootstrap/lib/Panel';

class RenderListField extends Component {
  buttonMoveUp(index) {
    const {
      fields,
    } = this.props;
    if ((index) > 0) {
      return (
        <Button
          className="pull-right"
          bsStyle="default"
          title={`Move up ${index + 1}`}
          onClick={() => fields.swap(index, index - 1)}
        >
          <i className="fa fa-sort-asc" />
        </Button>
      );
    }
    return null;
  }
  buttonMoveDown(index, arraySize) {
    const {
      fields,
    } = this.props;
    if ((index) < arraySize - 1) {
      return (
        <Button
          className="pull-right"
          bsStyle="default"
          title={`Move down ${index + 1}`}
          onClick={() => fields.swap(index, index + 1)}
        >
          <i className="fa fa-sort-desc" />
        </Button>
      );
    }
    return null;
  }

  render() {
    const {
      attributeType, fields, options, optionValue,
      optionDisplayName, label,
    } = this.props;

    return (
      <div>
        <FormGroup>
          <label className="col-xs-2 text-right control-label">
            <div>{label}</div>
            <Button
              bsStyle="primary"
              title="Add"
              onClick={() => fields.push()}
            >
              <FormattedMessage id="app.add" />
            </Button>
          </label>
          <Col xs={10}>
            {fields.map((name, index) => (
              <Panel key={name}>
                <Panel.Heading>
                  <b>{index + 1}</b>
                  <div className="pull-right">
                    <ButtonGroup>
                      {this.buttonMoveUp(index)}
                      {this.buttonMoveDown(index, fields.length)}
                    </ButtonGroup>

                    <Button
                      bsStyle="danger"
                      title={`Remove ${index + 1}`}
                      onClick={() => fields.remove(index)}
                    >
                      <FormattedMessage id="app.delete" />
                    </Button>
                  </div>
                </Panel.Heading>
                <Panel.Body>
                  <Field
                    name={name}
                    type="text"
                    component={getComponentType(attributeType)}
                    label={index + 1}
                    options={options}
                    optionValue={optionValue}
                    optionDisplayName={optionDisplayName}
                  />
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
  fields: PropTypes.shape({
    push: PropTypes.func,
    map: PropTypes.func,
    remove: PropTypes.func,
    length: PropTypes.number,
  }).isRequired,
  attributeType: PropTypes.string.isRequired,
  label: PropTypes.node,
  options: PropTypes.arrayOf(PropTypes.shape({
    optionDisplayName: PropTypes.string,
    value: PropTypes.string,
  })),
  optionValue: PropTypes.string,
  optionDisplayName: PropTypes.string,
};

RenderListField.defaultProps = {
  label: null,
  options: [],
  optionValue: 'value',
  optionDisplayName: 'optionDisplayName',
};

export default RenderListField;
