import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { TabContainer, Nav, NavItem, TabContent, TabPane } from 'patternfly-react';

import GroupDetailTabPages from 'ui/groups/detail/GroupDetailTabPages';

class GroupDetailTabs extends React.Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  render() {
    return (
      <div>
        <TabContainer id="basic-tabs" defaultActiveKey={1}>
          <div>
            <Nav bsClass="nav nav-tabs" onSelect={() => {}}>
              <NavItem eventKey={1}>
                <FormattedMessage id="app.pages" />
              </NavItem>
              <NavItem eventKey={2}>
                <FormattedMessage id="group.detail.title.users" />
              </NavItem>
              <NavItem eventKey={3}>
                <FormattedMessage id="group.detail.title.widgetTypes" />
              </NavItem>
              <NavItem eventKey={4}>
                <FormattedMessage id="group.detail.title.contents" />
              </NavItem>
              <NavItem eventKey={5}>
                <FormattedMessage id="group.detail.title.resources" />
              </NavItem>
            </Nav>
            <TabContent>
              <TabPane eventKey={1} >
                <GroupDetailTabPages />
              </TabPane>
              <TabPane eventKey={2}>Tab 2 content</TabPane>
              <TabPane eventKey={3}>Tab 3 content</TabPane>
            </TabContent>
          </div>
        </TabContainer>
      </div>

    );
  }
}

GroupDetailTabs.propTypes = {
  onWillMount: PropTypes.func,
};

GroupDetailTabs.defaultProps = {
  onWillMount: () => {},
};
export default GroupDetailTabs;
