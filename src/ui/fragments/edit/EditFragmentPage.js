import React, { Component } from 'react';
import InternalPage from 'ui/internal-page/InternalPage';
import { FormattedMessage } from 'react-intl';
import { Breadcrumb, OverlayTrigger, Popover, Grid } from 'patternfly-react';
import { Row, Col } from 'react-bootstrap';
import { BreadcrumbItem } from 'frontend-common-components';
import EditFormContainer from 'ui/fragments/edit/EditFormContainer';
import PropTypes from 'prop-types';

const FRAGMENT_EDIT_HELP = 'fragment.page.help';

const popover = () => (
  <Popover id="popover-admin-app-switch" title="">
    <p>
      <FormattedMessage id={FRAGMENT_EDIT_HELP} />
    </p>
  </Popover>
);

class EditFragmentPage extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

  render() {
    return (
      <InternalPage className="FragmentEditPage">
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <Breadcrumb>
                <BreadcrumbItem>
                  <FormattedMessage id="menu.uxPattern" />
                </BreadcrumbItem>
                {/* FIXME change route when fragmentlist component is avaible */}
                <BreadcrumbItem route="home">
                  <FormattedMessage id="menu.uxPattern.fragment" />
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  <FormattedMessage id="app.edit" />
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              {/* FIXME replace with PageHeader component when available */}
              <div className="FragmentEditPage__header">
                <h1>
                  <span><FormattedMessage id="app.edit" /></span>
                  <span className="pull-right">
                    <OverlayTrigger
                      overlay={popover()}
                      placement="left"
                      trigger={['click']}
                      rootClose
                    >
                      <i className="FragmentEditPage__icon fa pficon-help" />
                    </OverlayTrigger>
                  </span>
                </h1>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <EditFormContainer />
            </Col>
          </Row>
        </Grid>
      </InternalPage>
    );
  }
}

EditFragmentPage.propTypes = {
  onWillMount: PropTypes.func,
};

EditFragmentPage.defaultProps = {
  onWillMount: () => {},
};

export default EditFragmentPage;
