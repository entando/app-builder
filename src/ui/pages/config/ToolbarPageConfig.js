import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { WIDGET_LIST } from 'state/page-config/const';
import ToolbarContentIcon from 'ui/pages/config/ToolbarContentIcon';
import ContentWidgetContainer from 'ui/pages/config/ContentWidgetContainer';
import ContentPagesContainer from 'ui/pages/config/ContentPagesContainer';

class ToolbarPageConfig extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  render() {
    const classContainer = ['ToolbarPageConfig', 'ToolbarPageConfig__drawer-pf-sidebar-right'];
    const classScrollContainer = ['ToolbarPageConfig__drawer-pf-container'];
    if (this.props.toggleExpanded) {
      classContainer.push('ToolbarPageConfig__drawer-pf-sidebar-right-expanded');
    }
    if (this.props.fixedView) {
      classContainer.push('ToolbarPageConfig__drawer-pf-sidebar-right-fixed');
      classScrollContainer.push('ToolbarPageConfig__drawer-pf-container-fixed');
    }
    const container = this.props.content === WIDGET_LIST ?
      <ContentWidgetContainer /> :
      <ContentPagesContainer />;
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
              toggleExpanded={this.props.toggleExpanded}
              handleClick={this.props.toggleContentToolbar}
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
          <div
            className={classScrollContainer.join(' ')}
            onMouseEnter={(
              () => {
                document.body.style.overflow = 'hidden';
              }
            )}
            onMouseLeave={(
              () => {
                document.body.style.overflow = 'auto';
              }
            )}
          >
            {container}
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
  fixedView: PropTypes.bool,
  toggleExpanded: PropTypes.bool,
  toggleContentToolbar: PropTypes.func,
};

ToolbarPageConfig.defaultProps = {
  onWillMount: () => {},
  changeContent: PropTypes.noop,
  content: WIDGET_LIST,
  fixedView: false,
  toggleExpanded: false,
  toggleContentToolbar: PropTypes.noop,
};
export default ToolbarPageConfig;
