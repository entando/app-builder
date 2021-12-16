import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Alert } from 'patternfly-react';


class DataTypeReferenceStatus extends Component {
  constructor(props) {
    super(props);
    this.onClickReload = this.onClickReload.bind(this);
  }
  componentWillMount() {
    this.props.onWillMount();
  }

  onClickReload() {
    this.props.onReload(this.props.status.dataTypesCodes);
  }

  render() {
    const { status } = this.props;
    if (status.type === 'success') { return null; }
    return (
      <Alert type={status.type} className="DataTypeReferenceStatus">
        <FormattedMessage id="reference.text" values={{ count: status.count }} />
        <FormattedMessage
          id="reference.reload"
          values={{
            link:
  <a role="presentation" onClick={this.onClickReload}>
    <FormattedMessage id="app.here" />
  </a>,
          }}
        />

      </Alert>
    );
  }
}

DataTypeReferenceStatus.propTypes = {
  onWillMount: PropTypes.func.isRequired,
  onReload: PropTypes.func.isRequired,
  status: PropTypes.shape({
    status: PropTypes.string,
    count: PropTypes.number,
    type: PropTypes.string,
    dataTypesCodes: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};


export default DataTypeReferenceStatus;
