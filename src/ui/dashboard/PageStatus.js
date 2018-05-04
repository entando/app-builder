import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DonutChart } from 'patternfly-react';

class PageStatus extends Component {
  componentDidMount() {
    this.props.onWillMount();
  }

  render() {
    const { pageStatus: { draft, unpublished, published } } = this.props;
    return (
      <div className="PageStatus">
        <h2>Page Status</h2>
        <DonutChart
          id="donunt-chart-2"
          data={{
            colors: { Online: '#6ca100', Draft: '#72767b', 'Online ≠ draft': '#f0ab00' },
            columns: [
              ['Online ≠ draft', draft],
              ['Draft', unpublished],
              ['Online', published],
            ],
            type: 'donut',
          }}
          title={{ type: 'total', secondary: 'pages' }}
          legend={{ show: true, position: 'right' }}
          tooltip={{
            format: {
            value: v => v,
            },
          }}
        />
      </div>
    );
  }
}

PageStatus.propTypes = {
  onWillMount: PropTypes.func.isRequired,
  pageStatus: PropTypes.shape({
    draft: PropTypes.number,
    unpublished: PropTypes.number,
    published: PropTypes.number,
  }).isRequired,
};

export default PageStatus;
