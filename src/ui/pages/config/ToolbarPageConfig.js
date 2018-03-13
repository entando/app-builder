import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { WIDGET_LIST } from 'state/page-config/const';
import ToolbarContentIcon from 'ui/pages/config/ToolbarContentIcon';
import ContentWidgetContainer from 'ui/pages/config/ContentWidgetContainer';
import ContentPages from 'ui/pages/config/ContentPages';

class ToolbarPageConfig extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  render() {
    const classContainer = ['ToolbarPageConfig', 'ToolbarPageConfig__drawer-pf-sidebar-right'];
    if (this.props.toolbarExpanded) {
      classContainer.push('ToolbarPageConfig__drawer-pf-sidebar-right-expanded');
    }
    return (
      <div className={classContainer.join(' ').trim()} >
        <span
          role="link"
          tabIndex={0}
          onKeyDown={() => {}}
          onClick={() => { this.props.changeContent(this.props.content); }}
          className="
          ToolbarPageConfig__drawer-pf-title
          drawer-pf-title-right-menu"
        >
          <span className="ToolbarPageConfig__right-bar-title">
            <ToolbarContentIcon
              content={this.props.content}
              position="left"
              toolbarExpanded={this.props.toolbarExpanded}
              handleClick={this.props.expandContentToolbar}
            />
            <span className="ToolbarPageConfig__title">
              <FormattedMessage id="app.pages" />
            </span>
            <span className="ToolbarPageConfig__open-button-menu-right pull-right">
              <ToolbarContentIcon
                content={this.props.content}
                handleClick={this.props.changeContent}
                position="right"
              />
            </span>
          </span>
        </span>
        <div className="panel-group">
          <div className="ToolbarPageConfig__drawer-pf-container" >
            {this.props.content === WIDGET_LIST ? <ContentWidgetContainer /> : <ContentPages /> }
          </div>
        </div>
      </div>
    );
  }
}


ToolbarPageConfig.propTypes = {
  onWillMount: PropTypes.func,
  changeContent: PropTypes.func,
  content: PropTypes.string,
  toolbarExpanded: PropTypes.bool,
  expandContentToolbar: PropTypes.func,
};

ToolbarPageConfig.defaultProps = {
  onWillMount: () => {},
  changeContent: PropTypes.noop,
  content: WIDGET_LIST,
  toolbarExpanded: false,
  expandContentToolbar: PropTypes.noop,
};
export default ToolbarPageConfig;
