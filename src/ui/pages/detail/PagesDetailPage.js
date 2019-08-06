import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Grid, Col, Row, Breadcrumb } from 'patternfly-react';
import { Panel, Button } from 'react-bootstrap';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import SelectedPageInfoTableContainer from 'ui/pages/common/SelectedPageInfoTableContainer';
import EmptyData from 'ui/fragments/detail/EmptyData';


class PagesDetailPage extends Component {
  constructor(props) {
    super(props);
    this.toggleInfoTable = this.toggleInfoTable.bind(this);
    this.state = {
      infoTableOpen: false,
    };
  }
  componentWillMount() {
    this.props.onWillMount(this.props);
  }
  toggleInfoTable() {
    this.setState({
      infoTableOpen: !this.state.infoTableOpen,
    });
  }
  render() {
    const { references } = this.props;

    return (
      <InternalPage className="PagesDetailPage">
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <Breadcrumb>
                <BreadcrumbItem to="home" active>
                  <FormattedMessage id="menu.pageDesigner" />
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <FormattedMessage id="menu.details" />
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <PageTitle
            titleId="pageDetails.title"
            helpId="pageDetails.help"
          />
          <Row className="PageConfigPage__toolbar-row">
            <Col xs={10}>

              <Button
                className="PageConfigPage__info-btn"
                bsStyle="info"
                onClick={this.toggleInfoTable}
              >
                <span className="icon fa fa-chevron-down" />&nbsp;
                <FormattedMessage id="app.info" />
              </Button>

            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Panel
                className="PagesDetailPage__info-panel"
                id="collapsible-info-table"
                expanded={this.state.infoTableOpen}
                onToggle={() => {}}
              >
                <Panel.Collapse>
                  <SelectedPageInfoTableContainer />
                </Panel.Collapse>
              </Panel>
            </Col>
          </Row>
          <Row>
            <Col xs={12} >
              {
                references.length === 0 ? <EmptyData messageId="pageDetails.emptyContent" /> : null
              }
            </Col>
          </Row>
          <Row>
            <Col xs={12} >
              {
                references.length === 0 ? <EmptyData messageId="pageDetails.emptyContentLink" /> : null
              }
            </Col>
          </Row>
        </Grid>
      </InternalPage>
    );
  }
}

PagesDetailPage.propTypes = {
  onWillMount: PropTypes.func.isRequired,
  references: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PagesDetailPage;
