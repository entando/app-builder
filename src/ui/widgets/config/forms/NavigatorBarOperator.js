import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Col, Button } from 'patternfly-react';

import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import FormLabel from 'ui/common/form/FormLabel';

const operatorTypeOptionIds = [
  'widget.navigationBar.config.none',
  'widget.navigationBar.config.allChildren',
  'widget.navigationBar.config.fromTheRootToSelected',
  'widget.navigationBar.config.subtree',
];

const NavigatorBarOperator = ({ intl, onAddNewExpression }) => (
  <div>
    <Field
      component={RenderSelectInput}
      options={operatorTypeOptionIds.map((optionId, i) => ({
        text: intl.formatMessage({ id: optionId }),
        value: i,
      }))}
      label={
        <FormLabel labelId="widget.navigationBar.config.type" />
      }
      name="operator"
    />
    <Field
      component={RenderSelectInput}
      options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(v => ({ text: `${v}`, value: v }))}
      label={
        <FormLabel labelId="widget.navigationBar.config.subtreeDepth" />
      }
      name="operatorSubtreeLevel"
    />
    <Col lg={6} xs={10} smOffset={2} style={{ paddingLeft: '7px' }}>
      <Button onClick={onAddNewExpression} bsStyle="primary">
        <FormattedMessage
          id="widget.navigationBar.config.addNewExpression"
        />
      </Button>
    </Col>
  </div>
);

NavigatorBarOperator.propTypes = {
  intl: intlShape.isRequired,
  onAddNewExpression: PropTypes.func.isRequired,
};

export default injectIntl(NavigatorBarOperator);
