import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import { routeConverter } from '@entando/utils';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import FormContainer from 'ui/profile-types/attributes/monolist/FormContainer';
import {
  ROUTE_PROFILE_TYPE_LIST,
  ROUTE_PROFILE_TYPE_ATTRIBUTE_EDIT,
} from 'app-init/router';

class MonolistPage extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

  render() {
    const {
      attributeCode, profileTypeCode, selectedAttribute, entityCode,
    } = this.props;

    const renderTitle = () => {
      if (selectedAttribute) {
        return (<PageTitle
          titleId={`app.edit.${selectedAttribute}`}
          helpId="profileTypes.help"
        />
        );
      }
      return null;
    };
    return (
      <InternalPage className="MonolistPage">
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <Breadcrumb>
                <BreadcrumbItem>
                  <FormattedMessage id="menu.profile" />
                </BreadcrumbItem>
                <BreadcrumbItem to={ROUTE_PROFILE_TYPE_LIST}>
                  <FormattedMessage id="menu.profileTypes" />
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <FormattedMessage id="app.edit" /> :
                  &nbsp;{profileTypeCode}
                </BreadcrumbItem>

                <BreadcrumbItem
                  to={routeConverter(
                    ROUTE_PROFILE_TYPE_ATTRIBUTE_EDIT,
                    { entityCode, attributeCode },
                  )}
                >
                  <FormattedMessage id="app.edit.attribute" />
                  {attributeCode}
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  {selectedAttribute}
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          {renderTitle()}
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
  profileTypeCode: PropTypes.string,
  attributeCode: PropTypes.string,
  selectedAttribute: PropTypes.string,
  entityCode: PropTypes.string,
};

MonolistPage.defaultProps = {
  onWillMount: () => {},
  profileTypeCode: '',
  attributeCode: '',
  selectedAttribute: '',
  entityCode: '',
};


export default MonolistPage;
