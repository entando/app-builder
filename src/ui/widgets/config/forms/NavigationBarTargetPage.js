import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';
import { Field } from 'redux-form';
import { ToggleButton, ButtonToolbar } from 'react-bootstrap';

import ToggleButtonGroupField from 'ui/widgets/config/forms/ToggleButtonGroupField';
import { APP_TOUR_STARTED } from 'state/app-tour/const';

const NavigationBarTargetPage = ({
  intl, pages, language, onSpecificPageChoose, appTourProgress,
}) => (
  <div>
    <ButtonToolbar>
      <Field name="addConfig.spec" component={ToggleButtonGroupField} onBlur={(e) => { e.preventDefault(); }}>
        <ToggleButton
          value="current"
        >
          <FormattedMessage id="widget.navigationBar.config.this" />
        </ToggleButton>
        <ToggleButton
          value="parent"
        >
          <FormattedMessage id="widget.navigationBar.config.parent" />
        </ToggleButton>
        <ToggleButton
          value="super"
        >
          <span><FormattedMessage id="widget.navigationBar.config.fromThis" /></span>
          <Field
            name="addConfig.specSuperLevel"
            component="select"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(v => (
              <option key={`${v}`} value={v}>{v}</option>
            ))}
          </Field>
        </ToggleButton>
        <ToggleButton
          value="abs"
        >
          <span><FormattedMessage id="widget.navigationBar.config.fromRoot" /></span>
          <Field
            name="addConfig.specAbsLevel"
            component="select"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(v => (
              <option key={`${v}`} value={v}>{v}</option>
            ))}
          </Field>
        </ToggleButton>
        <ToggleButton
          value="code"
          className="app-tour-step-14"
        >
          <span><FormattedMessage id="widget.navigationBar.config.specific" /></span>
          <Field
            name="addConfig.targetCode"
            component="select"
            disabled={appTourProgress === APP_TOUR_STARTED}
            onChange={e => onSpecificPageChoose(e.target.value, appTourProgress)}
          >
            <option key="chooseOption" value="">{intl.formatMessage({ id: 'app.chooseAnOption' })}</option>
            {pages.map(page => (
              <option key={`${page.code}`} value={page.code}>{page.fullTitles[language]}</option>
            ))}
          </Field>
        </ToggleButton>
      </Field>
    </ButtonToolbar>
  </div>
);

NavigationBarTargetPage.propTypes = {
  intl: intlShape.isRequired,
  pages: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    fullTitles: PropTypes.shape({}).isRequired,
  })).isRequired,
  language: PropTypes.string.isRequired,
  onSpecificPageChoose: PropTypes.func.isRequired,
  appTourProgress: PropTypes.string.isRequired,
};

export default NavigationBarTargetPage;
