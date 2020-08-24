import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Alert } from 'patternfly-react';


class ProfileTypeReferenceStatus extends Component {
  constructor(props) {
    super(props);
    this.onClickReload = this.onClickReload.bind(this);
  }
  componentWillMount() {
    this.props.onWillMount();
  }

  onClickReload() {
    this.props.onReload(this.props.status.profileTypesCodes);
  }

  render() {
    const { status } = this.props;
    if (status.type === 'success') {
      return (
        <Alert type={status.type} className="ProfileTypeReferenceStatus">
          <p>
            <strong><FormattedMessage id="reference.status.title" /></strong>
          </p>
          <FormattedMessage id="reference.text.success" />
          <span className="label label-success">
            <FormattedMessage id="reference.label.success" />
          </span>
        </Alert>);
    }
    return (
      <Alert type={status.type} className="ProfileTypeReferenceStatus">
        <FormattedMessage id="reference.text" values={{ count: status.count }} />
        <FormattedMessage
          id="reference.reload"
          values={{
            link:
  <a
    role="presentation"
    onClick={this.onClickReload}
  >
    <FormattedMessage id="app.here" />
  </a>,
          }}
        />

      </Alert>
    );
  }
}

ProfileTypeReferenceStatus.propTypes = {
  onWillMount: PropTypes.func.isRequired,
  onReload: PropTypes.func.isRequired,
  status: PropTypes.shape({
    status: PropTypes.string,
    type: PropTypes.string,
    profileTypesCodes: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};


export default ProfileTypeReferenceStatus;
