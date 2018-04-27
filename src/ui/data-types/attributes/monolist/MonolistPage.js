import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import { BreadcrumbItem } from 'frontend-common-components';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import FormContainer from 'ui/data-types/attributes/monolist/FormContainer';
import {
  ROUTE_DATA_TYPE_LIST,
  // ROUTE_DATA_TYPE_EDIT,
} from 'app-init/router';

class MonolistPage extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }


  render() {
    return (
      <InternalPage className="MonolistPage">
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <Breadcrumb>
                <BreadcrumbItem>
                  <FormattedMessage id="menu.data" />
                </BreadcrumbItem>
                <BreadcrumbItem route={ROUTE_DATA_TYPE_LIST}>
                  <FormattedMessage id="menu.dataType" />
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <FormattedMessage id="app.edit" /> :
                  &nbsp;{this.props.dataTypeCode}
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <FormattedMessage id="app.edit.attribute" />
                  {this.props.attributeCode}
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  {this.props.selectedAttribute}
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <PageTitle
            titleId={`app.edit.${this.props.selectedAttribute}`}
            helpId="dataType.help"
          />
          <Row>
            <Col xs={12} >
              <FormContainer />
            </Col>
          </Row>
        </Grid>
      </InternalPage>
    );
  }
}


MonolistPage.propTypes = {
  onWillMount: PropTypes.func,
  dataTypeCode: PropTypes.string,
  attributeCode: PropTypes.string,
  selectedAttribute: PropTypes.string,
};

MonolistPage.defaultProps = {
  onWillMount: () => {},
  dataTypeCode: '',
  attributeCode: '',
  selectedAttribute: '',
};


export default MonolistPage;
