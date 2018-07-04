import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { getComponentType } from 'helpers/entities';
import { Button, ButtonGroup, Icon, Col, FormGroup } from 'patternfly-react';

class RenderMonolistField extends Component {
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
          <Icon size="lg" name="caret-up" />
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
          <Icon size="lg" name="caret-down" />
        </Button>
      );
    }
    return null;
  }

  render() {
    const {
      attributeType, fields, options, optionValue,
      optionDisplayName,
    } = this.props;

    return (
      <div>
        <FormGroup>

          <Col xs={2} className="text-right">
            {this.props.label}
          </Col>
          <Col xs={1}>
            <Button
              bsStyle="default"
              title="Add"
              onClick={() => fields.push()}
            >
              <Icon size="lg" name="plus" />
            </Button>
          </Col>
        </FormGroup>
        <FormGroup>
          <ul className="list-unstyled">
            {fields.map((name, index) => (
          // eslint-disable-next-line
          <li key={index}>
            <Col xs={10}>
              <Field
                name={name}
                type="text"
                component={getComponentType(attributeType)}
                label={index + 1}
                options={options}
                optionValue={optionValue}
                optionDisplayName={optionDisplayName}
              />
            </Col>
            <Col xs={1}>
              <ButtonGroup>
                {this.buttonMoveUp(index)}
                {this.buttonMoveDown(index, fields.length)}
              </ButtonGroup>

              <Button
                className="pull-right"
                bsStyle="danger"
                title={`Remove ${index + 1}`}
                onClick={() => fields.remove(index)}
              >
                <Icon size="lg" name="times" />
              </Button>

            </Col>
          </li>
        ))}
          </ul>
        </FormGroup>
      </div>
    );
  }
}

RenderMonolistField.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  attributeType: PropTypes.shape({}).isRequired,
  label: PropTypes.node,
  options: PropTypes.arrayOf(PropTypes.shape({
    optionDisplayName: PropTypes.string,
    value: PropTypes.string,
  })),
  optionValue: PropTypes.string,
  optionDisplayName: PropTypes.string,
};

RenderMonolistField.defaultProps = {
  label: null,
  options: [],
  optionValue: 'value',
  optionDisplayName: 'optionDisplayName',
};

export default RenderMonolistField;
