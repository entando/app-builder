import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContentWidgetContainer from 'ui/pages/config/ContentWidgetContainer';
import { FormattedMessage } from 'react-intl';
import { WIDGET_LIST } from 'state/page-config/const';

class ToolbarPageConfig extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  render() {
    return (
      <div className="ToolbarPageConfig ToolbarPageConfig__drawer-pf-sidebar-right">
        <a
          href=""
          onClick={this.showContentPages}
          className="ToolbarPageConfig__drawer-pf-title
          drawer-pf-title-right-menu
          ToolbarPageConfig__drawer-pf-title-clickable"
        >
          <span className="ToolbarPageConfig__right-bar-title">
            <i className="ToolbarPageConfig__sitemap fa fa-sitemap" aria-hidden="true" />
            <span className="ToolbarPageConfig__title">
              <FormattedMessage id="app.pages" />
            </span>
            <span className="ToolbarPageConfig__open-button-menu-right pull-right">
              <i className="fa fa-angle-right" aria-hidden="true" />
            </span>
          </span>
        </a>
        <div className="panel-group">
          <div className="ToolbarPageConfig__drawer-pf-container" >
            {this.props.content === WIDGET_LIST ? <ContentWidgetContainer /> : null }
          </div>
        </div>
      </div>
    );
  }
}


ToolbarPageConfig.propTypes = {
  onWillMount: PropTypes.func,
  content: PropTypes.string,
};

ToolbarPageConfig.defaultProps = {
  onWillMount: () => {},
  content: WIDGET_LIST,
};
export default ToolbarPageConfig;
