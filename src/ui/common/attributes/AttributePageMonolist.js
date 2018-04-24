import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import { BreadcrumbItem } from 'frontend-common-components';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import { ROUTE_DATA_TYPE_LIST } from 'app-init/router';
import StepDataBooleanAttributeContainer from 'ui/data-types/common/StepDataBooleanAttributeContainer';
import StepDataCheckboxAttributeContainer from 'ui/data-types/common/StepDataCheckboxAttributeContainer';
import StepDataThreeStateAttributeContainer from 'ui/data-types/common/StepDataThreeStateAttributeContainer';
import StepDataDateAttributeContainer from 'ui/data-types/common/StepDataDateAttributeContainer';
import StepDataEnumeratorAttributeContainer from 'ui/data-types/common/StepDataEnumeratorAttributeContainer';
import StepDataEnumeratorMapAttributeContainer from 'ui/data-types/common/StepDataEnumeratorMapAttributeContainer';
import StepDataHypertextAttributeContainer from 'ui/data-types/common/StepDataHypertextAttributeContainer';
import StepDataMonotextAttributeContainer from 'ui/data-types/common/StepDataMonotextAttributeContainer';
import StepDataLongtextAttributeContainer from 'ui/data-types/common/StepDataLongtextAttributeContainer';
import StepDataNumberAttributeContainer from 'ui/data-types/common/StepDataNumberAttributeContainer';

const AttributePage = ({ composite }) => {
  const LoadContainerMono = () => {
    console.log('STEP', composite);
    switch (composite) {
      case 'Boolean':
        return <StepDataBooleanAttributeContainer />;
      case 'Checkbox':
        return <StepDataCheckboxAttributeContainer />;
      case 'ThreeState':
        return <StepDataThreeStateAttributeContainer />;
      case 'Date':
        return <StepDataDateAttributeContainer />;
      case 'Enumerator':
        return <StepDataEnumeratorAttributeContainer />;
      case 'EnumeratorMap':
        return <StepDataEnumeratorMapAttributeContainer />;
      case 'Hypertext':
        return <StepDataHypertextAttributeContainer />;
      case 'Monotext':
        return <StepDataMonotextAttributeContainer />;
      case 'Longtext':
        return <StepDataLongtextAttributeContainer />;
      case 'Number':
        return <StepDataNumberAttributeContainer />;

      default: return <StepDataBooleanAttributeContainer />;
    }
  };
  return (
    <InternalPage className="AttributePage">
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
              <BreadcrumbItem active>
                <FormattedMessage id="app.add" />
              </BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>
        <PageTitle
          titleId="app.attribute"
          helpId="dataType.help"
        />
        <Row>
          <Col xs={12} >
            {LoadContainerMono()}
          </Col>
        </Row>
      </Grid>
    </InternalPage>
  );
};

AttributePage.propTypes = {
  composite: PropTypes.node.isRequired,
};

export default AttributePage;
