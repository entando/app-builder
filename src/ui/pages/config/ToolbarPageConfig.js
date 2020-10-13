import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Tabs, Tab, Icon } from 'patternfly-react';

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
        <Icon name="table" />&nbsp;
        <span>Widgets</span>
      </Fragment>
    );

    const renderedPageTreeTabTitle = (
      <Fragment>
        <Icon name="list-alt" />&nbsp;
        <span>Page Tree</span>
      </Fragment>
    );
    return (
      <div className={classContainer.join(' ').trim()} >
        <Tabs id="toolbar-tab" defaultActiveKey={0} className={classScrollContainer.join(' ')} mountOnEnter unmountOnExit>
          <Tab eventKey={0} title={renderedWidgetTabTitle}>
            <ContentWidgetContainer />
          </Tab>
          <Tab eventKey={1} title={renderedPageTreeTabTitle}>
            <ContentPagesContainer />
          </Tab>
        </Tabs>
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
