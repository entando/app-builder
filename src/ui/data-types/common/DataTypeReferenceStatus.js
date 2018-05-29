import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Alert, Label } from 'patternfly-react';


class DataTypeReferenceStatus extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  references() {
    const { status } = this.props;
    return (
      status.dataTypesCode.map(code => (
        <li key={code}>{code}</li>
      ))
    );
  }

  render() {
    const { status } = this.props;
    return (
      <Alert type={status.type} className="DataTypeReferenceStatus">
        <p className="DataTypeReferenceStatus__text">
          <FormattedMessage id="reference.status" />
        </p>
        <FormattedMessage id="reference.text" />
        <Label bsStyle={status.type}>
          <FormattedMessage id={`reference.status.${status.status}`} />
        </Label>
        <ul>
          {this.references()}
        </ul>
      </Alert>
    );
  }
}

DataTypeReferenceStatus.propTypes = {
  onWillMount: PropTypes.func.isRequired,
  status: PropTypes.shape({
    status: PropTypes.string,
    type: PropTypes.string,
    dataTypesCode: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};


export default DataTypeReferenceStatus;
