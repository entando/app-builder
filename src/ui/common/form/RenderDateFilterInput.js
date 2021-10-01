import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, ControlLabel } from 'patternfly-react';
import { injectIntl, FormattedMessage, intlShape } from 'react-intl';
import DatePicker from 'react-datepicker';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { isNull, isUndefined } from 'lodash';

class RenderDateFilterInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueType: 'today',
    };
    this.handleDateTypeChange = this.handleDateTypeChange.bind(this);
    this.handleChangeDelay = this.handleChangeDelay.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { onDidMount, ...otherProps } = this.props;
    onDidMount(otherProps);
  }

  componentDidUpdate(prevProps) {
    const { input: prevInput } = prevProps;
    const { input, hasNone, delayKey } = this.props;
    if (prevInput !== input) {
      const { value: inputValue } = input;
      const firstValue = hasNone ? 'none' : 'today';
      if (!isUndefined(input[delayKey]) && !isNull(input[delayKey])) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ valueType: 'today-delay' });
      } else if (inputValue && inputValue !== 'today') {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ valueType: 'chosen-date' });
      } else {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ valueType: firstValue });
      }
    }
  }

  handleDateTypeChange(valueType) {
    const { input, delayKey, dateFormat } = this.props;
    switch (valueType) {
      case 'chosen-date':
        input.onChange({ value: moment().format(dateFormat), [delayKey]: undefined });
        break;
      case 'today-delay':
        input.onChange({ value: 'today', [delayKey]: '0' });
        break;
      case 'today':
        input.onChange({ value: 'today', [delayKey]: undefined });
        break;
      default:
        input.onChange({ value: undefined, [delayKey]: undefined });
    }
  }

  handleChangeDelay({ currentTarget: { value } }) {
    const { input, delayKey } = this.props;
    input.onChange({ value: 'today', [delayKey]: value });
  }

  handleChange(date) {
    const { dateFormat, input } = this.props;
    const value = !isNull(date) ? date.format(dateFormat) : '';
    input.onChange({ value });
  }

  render() {
    const {
      input,
      name,
      label,
      intl,
      delayKey,
      help,
      locale,
      dateFormat,
      alignClass,
      meta: { touched, error },
      isClearable,
      hasLabel,
      hasNone,
      xsClass,
    } = this.props;

    const { valueType } = this.state;

    const firstValue = hasNone ? 'none' : 'today';
    const errorblock = touched ? error : '';

    return (
      <div className="form-group">
        {hasLabel && (
        <Col xs={12} className={`${alignClass} ${xsClass}`}>
          <ControlLabel htmlFor={name}>
            {label} {help}
          </ControlLabel>
        </Col>
        )}
        <Col xs={12} className="RenderDateFilterInput__container">
          <ToggleButtonGroup name="valueType" type="radio" value={valueType} onChange={this.handleDateTypeChange}>
            <ToggleButton value={firstValue} className="RenderDateFilterInput__toggle-btn">
              <FormattedMessage
                id={hasNone ? 'cms.label.none' : 'widget.form.filterable.labelDateToday'}
              />
            </ToggleButton>
            <ToggleButton value="today-delay" className="RenderDateFilterInput__toggle-btn">
              <FormattedMessage id="widget.form.filterable.labelDateToday" />
              {' '}
              <input
                type="text"
                value={input[delayKey]}
                className="extra form-control"
                placeholder={intl.formatMessage({ id: 'widget.form.filterable.labelDateDelay' })}
                disabled={valueType !== 'today-delay'}
                onChange={this.handleChangeDelay}
              />
            </ToggleButton>
            <ToggleButton value="chosen-date" className="RenderDateFilterInput__toggle-btn">
              <FormattedMessage id="widget.form.filterable.labelChosenDate" />
              <DatePicker
                placeholder={dateFormat}
                selected={valueType === 'chosen-date' && input.value ? moment(input.value, dateFormat) : null}
                onChange={this.handleChange}
                disabledKeyboardNavigation
                locale={locale}
                dateFormat={dateFormat}
                isClearable={isClearable}
                className="extra"
                disabled={valueType !== 'chosen-date'}
                style={{ after: 'fa fa-calendar' }}
              />
            </ToggleButton>
          </ToggleButtonGroup>
          <div className="help-block help-block-error">{errorblock}</div>
        </Col>
      </div>
    );
  }
}

RenderDateFilterInput.propTypes = {
  onDidMount: PropTypes.func,
  intl: intlShape.isRequired,
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.shape({}),
  }),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  alignClass: PropTypes.string,
  xsClass: PropTypes.string,
  label: PropTypes.node,
  help: PropTypes.node,
  language: PropTypes.string,
  dateFormat: PropTypes.string,
  locale: PropTypes.string,
  isClearable: PropTypes.bool,
  hasLabel: PropTypes.bool,
  hasNone: PropTypes.bool,
  delayKey: PropTypes.string,
};

RenderDateFilterInput.defaultProps = {
  onDidMount: () => {},
  name: '',
  placeholder: '',
  label: '',
  help: null,
  language: 'en',
  dateFormat: 'DD/MM/YYYY',
  locale: 'en',
  meta: {},
  isClearable: true,
  hasLabel: true,
  hasNone: false,
  alignClass: '',
  xsClass: 'mobile-left',
  delayKey: 'delay',
};
export default injectIntl(RenderDateFilterInput);
