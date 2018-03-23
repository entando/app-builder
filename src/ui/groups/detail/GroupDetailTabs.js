import React from 'react';
import PropTypes from 'prop-types';
import { TabContainer, Nav, NavItem, TabContent, TabPane } from 'patternfly-react';


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
              <NavItem eventKey={1}>html tab1</NavItem>
              <NavItem eventKey={2}>html tab2</NavItem>
              <NavItem eventKey={3}>html tab3</NavItem>
            </Nav>
            <TabContent>
              <TabPane eventKey={1}>Tab 1 content</TabPane>
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
