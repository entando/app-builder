import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Col, Button } from 'patternfly-react';

import FormLabel from 'ui/common/form/FormLabel';
import SelectInput from 'ui/common/formik-field/SelectInput';

const operatorTypeOptionIds = [
  { labelId: 'widget.navigationBar.config.none', code: '' },
  { labelId: 'widget.navigationBar.config.allChildren', code: 'children' },
  { labelId: 'widget.navigationBar.config.fromTheRootToSelected', code: 'path' },
  { labelId: 'widget.navigationBar.config.subtree', code: 'subtree' },
];

const NavigatorBarOperator = ({
  intl,
  onAddNewExpression, addConfig: { spec, targetCode }, appTourProgress,
}) => (
  <div>
    <Field
      component={SelectInput}
      options={operatorTypeOptionIds.map(({ labelId, code }) => ({
        text: intl.formatMessage({ id: labelId }),
        value: code,
      }))}
      label={
        <FormLabel labelId="widget.navigationBar.config.type" />
      }
      name="addConfig.operator"
    />
    <Field
      component={SelectInput}
      options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(v => ({ text: `${v}`, value: v }))}
      label={
        <FormLabel labelId="widget.navigationBar.config.subtreeDepth" />
      }
      name="addConfig.operatorSubtreeLevel"
    />
    <Col lg={6} xs={10} smOffset={2} style={{ paddingLeft: '7px' }}>
      <Button
        className="app-tour-step-15"
        onClick={config => onAddNewExpression(config, appTourProgress)}
        bsStyle="primary"
        disabled={!spec || (spec === 'code' && !targetCode)}
      >
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
  addConfig: PropTypes.shape({
    spec: PropTypes.string,
    targetCode: PropTypes.string,
  }).isRequired,
  appTourProgress: PropTypes.string.isRequired,
};

export default injectIntl(NavigatorBarOperator);
