import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

class AssetsCount extends React.Component {
  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
  }

  render() {
    const { imageCount, fileCount } = this.props;
    return (
      <div className="AssetsCount">
        <div className="AssetsCount__box">
          <span className="AssetsCount__count">{imageCount}</span>
          <div>
            <FormattedMessage id="cms.label.images" />
          </div>
        </div>
        <div className="AssetsCount__box">
          <span className="AssetsCount__count">{fileCount}</span>
          <div>
            <FormattedMessage id="cms.label.documents" />
          </div>
        </div>
      </div>
    );
  }
}

AssetsCount.propTypes = {
  imageCount: PropTypes.number,
  fileCount: PropTypes.number,
  onDidMount: PropTypes.func.isRequired,
};

AssetsCount.defaultProps = {
  imageCount: 0,
  fileCount: 0,
};

export default AssetsCount;
