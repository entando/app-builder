import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
import { ToggleButton, ButtonToolbar } from 'react-bootstrap';

import ToggleButtonGroupField from 'ui/widgets/config/forms/ToggleButtonGroupField';

const NavigationBarTargetPage = ({ pages }) => (
  <div>
    <ButtonToolbar>
      <Field name="spec" component={ToggleButtonGroupField}>
        <ToggleButton
          value={1}
        >
          <FormattedMessage id="widget.navigationBar.config.this" />
        </ToggleButton>
        <ToggleButton
          value={2}
        >
          <FormattedMessage id="widget.navigationBar.config.parent" />
        </ToggleButton>
        <ToggleButton
          value={3}
        >
          <span><FormattedMessage id="widget.navigationBar.config.fromThis" /></span>
          <Field
            name="specSuperLevel"
            component="select"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(v => (
              <option key={`${v}`} value={v}>{v}</option>
            ))}
          </Field>
        </ToggleButton>
        <ToggleButton
          value={4}
        >
          <span><FormattedMessage id="widget.navigationBar.config.fromRoot" /></span>
          <Field
            name="specAbsLevel"
            component="select"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(v => (
              <option key={`${v}`} value={v}>{v}</option>
            ))}
          </Field>
        </ToggleButton>
        <ToggleButton
          value={5}
        >
          <span><FormattedMessage id="widget.navigationBar.config.specific" /></span>
          <Field
            name="targetCode"
            component="select"
          >
            {pages.map(page => (
              <option key={`${page.code}`} value={page.code}>{page.path}</option>
            ))}
          </Field>
        </ToggleButton>
      </Field>
    </ButtonToolbar>
  </div>
);

NavigationBarTargetPage.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  })).isRequired,
};

export default NavigationBarTargetPage;
