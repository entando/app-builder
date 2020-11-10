import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button, Tabs, Tab, Icon } from 'patternfly-react';

import WidgetGroupingsContainer from 'ui/pages/config/WidgetGroupingsContainer';
import ContentPagesContainer from 'ui/pages/config/ContentPagesContainer';

class ToolbarPageConfig extends Component {
  constructor(props) {
    super(props);
    this.handleTabSelect = this.handleTabSelect.bind(this);
  }

  componentWillMount() {
    this.props.onWillMount();
  }

  componentWillUnmount() {
    this.props.onWillUnmount();
  }

  handleTabSelect() {
    const { collapsed, onToggleCollapse } = this.props;
    if (collapsed) {
      onToggleCollapse();
    }
  }

  render() {
    const { collapsed, onToggleCollapse } = this.props;
    const classContainer = ['ToolbarPageConfig', 'ToolbarPageConfig__drawer-pf-sidebar-right'];
    if (collapsed) {
      classContainer.push('ToolbarPageConfig__collapse-mode');
    }
    const classScrollContainer = ['ToolbarPageConfig__tab-main'];
    if (this.props.toggleExpanded) {
      classContainer.push('ToolbarPageConfig__drawer-pf-sidebar-right-expanded');
    }
    if (this.props.fixedView) {
      classContainer.push('ToolbarPageConfig__drawer-pf-sidebar-right-fixed');
      classScrollContainer.push('ToolbarPageConfig__drawer-pf-container-fixed');
    }
    const renderedWidgetTabTitle = (
      <Fragment>
        <Icon name="table" />
        <FormattedMessage id="pages.designer.tabWidgetList" />
      </Fragment>
    );

    const renderedPageTreeTabTitle = (
      <Fragment>
        <Icon name="list-alt" />
        <FormattedMessage id="pages.designer.tabPageTree" />
      </Fragment>
    );
    return (
      <div className={classContainer.join(' ').trim()}>
        <div className="ToolbarPageConfig__tab-container">
          <Button className="ToolbarPageConfig__collapse-main" onClick={onToggleCollapse}>
            <Icon name={`angle-double-${collapsed ? 'left' : 'right'}`} />
          </Button>
          <Tabs
            id="toolbar-tab"
            defaultActiveKey={0}
            className={classScrollContainer.join(' ')}
            onSelect={this.handleTabSelect}
            mountOnEnter
            unmountOnExit
          >
            <Tab eventKey={0} title={renderedWidgetTabTitle}>
              <WidgetGroupingsContainer />
            </Tab>
            <Tab eventKey={1} title={renderedPageTreeTabTitle}>
              <ContentPagesContainer />
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}


ToolbarPageConfig.propTypes = {
  onWillMount: PropTypes.func,
  onWillUnmount: PropTypes.func,
  fixedView: PropTypes.bool,
  toggleExpanded: PropTypes.bool,
  collapsed: PropTypes.bool.isRequired,
  onToggleCollapse: PropTypes.func.isRequired,
};

ToolbarPageConfig.defaultProps = {
  onWillMount: () => {},
  onWillUnmount: () => {},
  fixedView: false,
  toggleExpanded: false,
};
export default ToolbarPageConfig;
