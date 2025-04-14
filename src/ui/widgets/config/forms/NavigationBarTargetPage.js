import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';
import { Field } from 'formik';
import { ToggleButton, ButtonToolbar } from 'react-bootstrap';

import ToggleButtonGroupField from 'ui/widgets/config/forms/ToggleButtonGroupField';
import { APP_TOUR_STARTED } from 'state/app-tour/const';

const NavigationBarTargetPage = ({
  intl, pages, language, onSpecificPageChoose, appTourProgress, handleChange, setFieldValue,
}) => (
  <div>
    <ButtonToolbar>
      <Field name="addConfig.spec" component={ToggleButtonGroupField} onBlur={(e) => { e.preventDefault(); }} >
        <ToggleButton
          value="current"
          onChange={handleChange}
        >
          <FormattedMessage id="widget.navigationBar.config.this" />
        </ToggleButton>
        <ToggleButton
          value="parent"
          onChange={handleChange}
        >
          <FormattedMessage id="widget.navigationBar.config.parent" />
        </ToggleButton>
        <ToggleButton
          value="super"
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
          className="app-tour-step-14"
        >
          <span><FormattedMessage id="widget.navigationBar.config.specific" /></span>
          <Field
            name="addConfig.targetCode"
            as="select"
            disabled={appTourProgress === APP_TOUR_STARTED}
            onChange={(e) => {
              onSpecificPageChoose(e.target.value, appTourProgress, setFieldValue);
              handleChange(e);
            }}
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
  handleChange: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

export default NavigationBarTargetPage;
