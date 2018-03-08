import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';

class ToolbarPageConfig extends Component {
  constructor(props) {
    super(props);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.onClickClose = this.onClickClose.bind(this);
    this.state = { addClass: false };
  }
  componentWillMount() {
    this.props.onWillMount();
  }

  onClickClose(ev) {
    ev.preventDefault();
    this.props.closeDrawer();
  }
  toggleDrawer(ev) {
    ev.preventDefault();
    this.setState({ addClass: !this.state.addClass });
  }

  render() {
    return (
      <div className="ToolbarPageConfig">
        <div className="drawer-pf drawer-pf-notifications-non-clickable">
          <div className="ToolbarPageConfig__title drawer-pf-title">
            <a>
              <span className="ToolbarPageConfig__header">
                <i className="fa fa-sitemap hidden-xs" />
                <span>Pages</span>
                <i className="drawer-pf-close fa fa-angle-right hidden-xs" />
              </span>
            </a>
          </div>
          <div className="panel-group" id="notification-drawer-accordion" />
        </div>
      </div>


    );
  }
}


ToolbarPageConfig.propTypes = {
  onWillMount: PropTypes.func,
  closeDrawer: PropTypes.func,
  // children: PropTypes.node,
};

ToolbarPageConfig.defaultProps = {
  onWillMount: () => {},
  // children: null,
  closeDrawer: () => {},
};
export default ToolbarPageConfig;
