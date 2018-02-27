import React, { Component } from 'react';
import InternalPage from 'ui/internal-page/InternalPage';
import { FormattedMessage } from 'react-intl';
import { Breadcrumb, Grid } from 'patternfly-react';
import { Row, Col } from 'react-bootstrap';
import { BreadcrumbItem } from 'frontend-common-components';
import EditFormContainer from 'ui/fragments/edit/EditFormContainer';
import PropTypes from 'prop-types';
import PageTitle from 'ui/internal-page/PageTitle';

const FRAGMENT_HELP = 'fragment.help';
const PAGE_TITLE = 'app.edit';

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
                  <FormattedMessage id={PAGE_TITLE} />
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <PageTitle titleId={PAGE_TITLE} helpId={FRAGMENT_HELP} />
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
