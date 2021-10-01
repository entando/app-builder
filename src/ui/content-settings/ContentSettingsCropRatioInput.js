import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, FormControl, Button, Icon } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

const propTypes = {
  value: PropTypes.string,
  isNew: PropTypes.bool,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
  onSave: PropTypes.func,
  onError: PropTypes.func,
};

const defaultProps = {
  value: '',
  isNew: false,
  onAdd: () => {},
  onDelete: () => {},
  onSave: () => {},
  onError: () => {},
};

class ContentSettingsCropRatioInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getValidationState() {
    const { value: initialValue } = this.props;
    const { value } = this.state;
    if ((value.length > 0 || initialValue.length > 0) && value !== initialValue) {
      const isRatio = /^\d+[:]\d+$/.test(value);
      if (isRatio) return 'success';
      return 'error';
    }

    return null;
  }

  handleInputChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  handleInputBlur() {
    const { isNew, onError } = this.props;
    if (this.getValidationState() === 'success') {
      const { onSave } = this.props;
      const { value } = this.state;
      onSave(value);
    } else if (!isNew) {
      onError('cropvalueerror');
    }
  }

  handleAddClick() {
    this.handleSubmit();
  }

  handleDeleteClick() {
    const { onDelete } = this.props;
    onDelete();
  }

  handleSubmit(e) {
    if (e) e.preventDefault();

    const { isNew, onError } = this.props;
    if (isNew && this.getValidationState() === 'success') {
      const { onAdd } = this.props;
      const { value } = this.state;
      onAdd(value);

      this.setState({
        value: '',
      });
    } else {
      onError('cropvalueerror');
    }
  }

  render() {
    const { isNew } = this.props;
    const { value } = this.state;

    const renderedBtn = isNew ? (
      <Button
        data-test-id="content-settings-crop-ratio-input-add"
        bsStyle="primary"
        onClick={this.handleAddClick}
      >
        <FormattedMessage id="cms.label.add" defaultMessage="Add" />
      </Button>
    ) : (
      <Button
        data-test-id="content-settings-crop-ratio-input-delete"
        bsStyle="danger"
        onClick={this.handleDeleteClick}
      >
        <Icon type="pf" name="delete" />
      </Button>
    );

    return (
      <Form inline onSubmit={this.handleSubmit}>
        <FormGroup
          className="ContentSettingsCropRatioInput__form-group"
          validationState={this.getValidationState()}
        >
          <FormControl
            data-test-id="content-settings-crop-ratio-input-field"
            type="text"
            value={value}
            onChange={this.handleInputChange}
            onBlur={this.handleInputBlur}
          />
        </FormGroup>
        {renderedBtn}
      </Form>
    );
  }
}

ContentSettingsCropRatioInput.propTypes = propTypes;
ContentSettingsCropRatioInput.defaultProps = defaultProps;

export default ContentSettingsCropRatioInput;
