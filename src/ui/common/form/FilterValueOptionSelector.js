import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { get, isUndefined, isEqual } from 'lodash';
import { FormattedMessage, FormattedHTMLMessage, intlShape } from 'react-intl';
import { Collapse } from 'react-collapse';

import FormLabel from 'ui/common/form/FormLabel';
import RadioInput from 'ui/common/form/RenderRadioInput';
import TextInput from 'ui/common/form/RenderTextInput';
import DateFilterInput from 'ui/common/form/RenderDateFilterInput';
import SwitchRenderer from 'ui/common/form/SwitchRenderer';

import {
  TEXT_FILTERABLE_ATTRIBUTES,
  DATE_FILTERABLE_ATTRIBUTES,
  BOOL_FILTERABLE_ATTRIBUTES,
} from 'state/content-type/selectors';

const TEXT_FILTERABLE = 'text_filterable_type';
const DATE_FILTERABLE = 'date_filterable_type';
const BOOL_FILTERABLE = 'boolean_filterable_type';

const HAS_VALUE = 'valuePresence';
const HAS_NO_VALUE = 'valueAbsence';
const BY_VALUE_ONLY = 'valueOnly';
const BY_VALUE_PARTIAL = 'valuePartial';
const BY_RANGE = 'valueRange';

const CLEAN_VALUES = {
  value: undefined,
  nullValue: undefined,
  likeOption: undefined,
  valueDateDelay: undefined,
  startDateDelay: undefined,
  endDateDelay: undefined,
  start: undefined,
  end: undefined,
};

class FilterValueOptionSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterableType: '',
      expanded: false,
      optionSelected: '',
      keyChanged: false,
    };
    this.handleHeadlineClick = this.handleHeadlineClick.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleValueTypeChange = this.handleValueTypeChange.bind(this);
  }

  componentDidMount() {
    this.beginFillState();
  }

  componentDidUpdate(prevProps) {
    const {
      attributeFilterChoices: prevAttr,
      value: prevValue,
    } = prevProps;
    const { key: prevKey } = prevValue;

    const {
      attributeFilterChoices: attr,
      value,
    } = this.props;
    const { key } = value;

    const hasAllValueChanged = !isEqual({ ...prevValue, key: 1 }, { ...value, key: 1 });

    const keyChanged = prevKey !== key;
    if (keyChanged || prevAttr.length !== attr.length) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ keyChanged });
      this.beginFillState(hasAllValueChanged);
    }
  }

  componentWillUnmount() {
    this.setState({
      filterableType: '',
      expanded: false,
      optionSelected: '',
    });
  }

  getAttributeType() {
    const { value } = this.props;
    const { key } = value;
    const { attributeFilterChoices } = this.props;
    const selectedAttributeType = attributeFilterChoices.find(attribute => attribute.code === key);
    return get(selectedAttributeType, 'type', '');
  }

  beginFillState(valuePropChanged) {
    const {
      attributeFilterChoices: attrChoices,
      value: { attributeFilter },
    } = this.props;
    const { keyChanged } = this.state;

    if (attributeFilter && attrChoices && attrChoices.length > 0) {
      const filterableType = this.determineFilterableType();
      if (keyChanged && !valuePropChanged) {
        if (filterableType === BOOL_FILTERABLE) {
          this.handleValueChange({ ...CLEAN_VALUES, value: true });
        } else {
          this.handleValueChange({ ...CLEAN_VALUES });
        }
      }
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        filterableType,
        optionSelected: this.determineOptionSelected(filterableType),
      });
    }
  }

  determineFilterableType() {
    const type = this.getAttributeType();
    if (TEXT_FILTERABLE_ATTRIBUTES.includes(type)) {
      return TEXT_FILTERABLE;
    }
    if (DATE_FILTERABLE_ATTRIBUTES.includes(type)) {
      return DATE_FILTERABLE;
    }
    if (BOOL_FILTERABLE_ATTRIBUTES.includes(type)) {
      return BOOL_FILTERABLE;
    }
    return '';
  }

  determineOptionSelected(filterableType) {
    const { value: propValue } = this.props;
    const {
      value,
      start,
      end,
      nullValue,
    } = propValue;
    if (!isUndefined(start) || !isUndefined(end)) {
      return BY_RANGE;
    }
    if (value) {
      return filterableType === TEXT_FILTERABLE ? BY_VALUE_PARTIAL : BY_VALUE_ONLY;
    }
    if (nullValue) {
      return HAS_NO_VALUE;
    }
    return HAS_VALUE;
  }

  handleHeadlineClick() {
    const { expanded } = this.state;
    this.setState({ expanded: !expanded });
  }

  handleValueChange(newProp) {
    const { value: propValue, onChange, fieldIndex } = this.props;
    const newValue = {
      ...propValue,
      ...newProp,
    };
    onChange(newValue, fieldIndex);
  }

  resetValueKeys(option, filterableType) {
    switch (option) {
      case BY_VALUE_ONLY:
        if (filterableType === DATE_FILTERABLE) {
          this.handleValueChange({ ...CLEAN_VALUES, value: 'today' });
        } else {
          this.handleValueChange({ ...CLEAN_VALUES, value: '' });
        }
        break;
      case BY_VALUE_PARTIAL:
        this.handleValueChange({ ...CLEAN_VALUES, value: '', likeOption: false });
        break;
      case BY_RANGE:
        this.handleValueChange({ ...CLEAN_VALUES, start: '', end: '' });
        break;
      case HAS_NO_VALUE:
        this.handleValueChange({ ...CLEAN_VALUES, nullValue: true });
        break;
      case HAS_VALUE:
      default:
        this.handleValueChange({ ...CLEAN_VALUES });
    }
  }

  handleValueTypeChange({ currentTarget: { value } }) {
    const { filterableType } = this.state;
    this.resetValueKeys(value, filterableType);
    this.setState({ optionSelected: value });
  }

  renderLabelWithSort(node) {
    const { value } = this.props;
    const { order } = value;
    return (
      <Fragment>
        {node}{order && (
          <FormattedMessage id={`widget.form.filterable.sort${order}`} />
        )}
      </Fragment>
    );
  }

  renderLabelValue() {
    const { value, intl } = this.props;
    const { key, attributeFilter } = value;
    const { optionSelected, filterableType } = this.state;
    if (!attributeFilter) {
      return this.renderLabelWithSort(
        <FormattedMessage
          id={`widget.form.filteropt.${key === 'created' ? 'creationDate' : 'lastModify'}`}
        />,
      );
    }
    const {
      value: filterValue,
      start,
      end,
      valueDateDelay,
      startDateDelay,
      endDateDelay,
      likeOption,
    } = value;

    if (filterableType === BOOL_FILTERABLE) {
      if (!isUndefined(filterValue)) {
        return this.renderLabelWithSort(
          <FormattedHTMLMessage
            id="widget.form.filterable.valueOnly"
            values={{ value: filterValue ? 'true' : 'false' }}
          />,
        );
      }
      return this.renderLabelWithSort(
        <FormattedHTMLMessage
          id="widget.form.filterable.valueOnly"
          values={{ value: 'all' }}
        />,
      );
    }

    switch (optionSelected) {
      case BY_VALUE_ONLY: {
        return this.renderLabelWithSort(
          <Fragment>
            <FormattedHTMLMessage
              id="widget.form.filterable.valueOnly"
              values={{ value: filterValue }}
            />
            {valueDateDelay && (
              <FormattedHTMLMessage
                id="widget.form.filterable.valueDateDelay"
                values={{ delay: valueDateDelay }}
              />
            )}
          </Fragment>,
        );
      }
      case BY_VALUE_PARTIAL: {
        const partial = likeOption
          && intl.formatMessage({ id: 'widget.form.filterable.valuePartialPhrase' });
        return this.renderLabelWithSort(
          <FormattedHTMLMessage
            id="widget.form.filterable.valuePartial"
            values={{ value: filterValue, partial }}
          />,
        );
      }
      case BY_RANGE: {
        const fromMsg = start && (
          <Fragment>
            <FormattedHTMLMessage
              id="widget.form.filterable.valueRangeStart"
              values={{ start }}
            />
            {startDateDelay && (
              <FormattedHTMLMessage
                id="widget.form.filterable.valueDateDelay"
                values={{ delay: startDateDelay }}
              />
            )}
          </Fragment>
        );
        const toMsg = end && (
          <Fragment>
            <FormattedHTMLMessage
              id="widget.form.filterable.valueRangeEnd"
              values={{ end }}
            />
            {endDateDelay && (
              <FormattedHTMLMessage
                id="widget.form.filterable.valueDateDelay"
                values={{ delay: endDateDelay }}
              />
            )}
          </Fragment>
        );

        return this.renderLabelWithSort(
          <Fragment>
            <FormattedMessage id="widget.form.filterable.labelRangeField" />
            {' '}
            {fromMsg}
            {' '}
            {toMsg}
          </Fragment>,
        );
      }
      case HAS_NO_VALUE:
        return this.renderLabelWithSort(
          <FormattedMessage id="widget.form.filterable.valueAbsence" />,
        );
      default:
        return this.renderLabelWithSort(
          <FormattedMessage id="widget.form.filterable.valuePresence" />,
        );
    }
  }

  renderSelectOptions(options, keyCode = 'value') {
    const { intl } = this.props;
    return options
      .map(item => (
        <option key={`opt-${item[keyCode]}`} value={item[keyCode]}>
          {item.name || intl.formatMessage({ id: item.nameId })}
        </option>
      ));
  }

  renderBooleanFilterValueOptions() {
    const { intl, value: propValue, filter } = this.props;
    const { value: filterValue } = propValue;
    const boolChoices = [
      {
        id: 'true',
        label: intl.formatMessage({ id: 'cms.label.yes' }),
      },
      {
        id: 'false',
        label: intl.formatMessage({ id: 'cms.label.no' }),
      },
      {
        id: 'all',
        label: intl.formatMessage({ id: 'cms.label.all' }),
      },
    ];
    const boolValue = filterValue ? 'true' : 'false';
    const value = isUndefined(filterValue) ? 'all' : boolValue;

    const input = {
      name: `${filter}.value`,
      type: 'radio',
      value,
      onChange: (valueSelected) => {
        switch (valueSelected) {
          case 'true':
            this.handleValueChange({ value: true });
            break;
          case 'false':
            this.handleValueChange({ value: false });
            break;
          case 'all':
          default:
            this.handleValueChange({ value: undefined });
            break;
        }
      },
    };

    return (
      <Fragment>
        <h5><FormattedMessage id="widget.form.options" /></h5>
        <RadioInput
          input={input}
          hasLabel={false}
          toggleElement={boolChoices}
          meta={{ touched: false, error: false }}
        />
      </Fragment>
    );
  }

  renderValueOnlyFields() {
    const { value: propValue, filter } = this.props;
    const { value } = propValue;
    const { filterableType } = this.state;
    const input = {
      name: `${filter}.value`,
      value,
    };
    return (
      filterableType !== DATE_FILTERABLE ? (
        <div className="FilterValueOptionSelector__top-options">
          <TextInput
            input={{
              ...input,
              onChange: ({ currentTarget: { value: v } }) => (
                this.handleValueChange({ value: v })
              ),
            }}
            label={<FormLabel labelId="widget.form.filterable.whichcontains" />}
          />
        </div>
      ) : (
        <div className="FilterValueOptionSelector__top-options">
          <DateFilterInput
            input={{
              ...input,
              ...propValue,
              onChange: values => this.handleValueChange(values),
            }}
            delayKey="valueDateDelay"
            label={<FormLabel labelId="widget.form.filterable.whichcontains" />}
          />
        </div>
      )
    );
  }

  renderRangeFields() {
    const { value: propValue, filter } = this.props;
    const { start, end } = propValue;
    const { filterableType } = this.state;

    if (filterableType === TEXT_FILTERABLE) {
      const handleChangeRange = forValue => ({ target: { value } }) => (
        this.handleValueChange({ [forValue]: value })
      );

      return (
        <div className="FilterValueOptionSelector__top-options">
          <TextInput
            input={{
              name: `${filter}.start`,
              value: start,
              onChange: handleChangeRange('start'),
            }}
            label={<FormLabel labelId="cms.label.from" />}
          />
          <TextInput
            input={{
              name: `${filter}.end`,
              value: end,
              onChange: handleChangeRange('end'),
            }}
            label={<FormLabel labelId="cms.label.to" />}
          />
        </div>
      );
    }
    const handleChangeDateRange = forValue => values => (
      this.handleValueChange({
        ...values,
        [forValue]: values.value,
        value: undefined,
      })
    );
    return (
      <div className="FilterValueOptionSelector__top-options">
        <DateFilterInput
          input={{
            name: `${filter}.start`,
            ...propValue,
            value: start,
            onChange: handleChangeDateRange('start'),
          }}
          hasNone
          delayKey="startDateDelay"
          label={<FormLabel labelId="cms.label.from" />}
        />
        <DateFilterInput
          input={{
            name: `${filter}.end`,
            ...propValue,
            value: end,
            onChange: handleChangeDateRange('end'),
          }}
          hasNone
          delayKey="endDateDelay"
          label={<FormLabel labelId="cms.label.to" />}
        />
      </div>
    );
  }

  renderFilterValueOptions() {
    const { filterableType, optionSelected } = this.state;
    const { value: propValue, filter } = this.props;
    const { value, likeOption } = propValue;
    const filterChoices = [
      { value: HAS_VALUE, nameId: 'widget.form.filterable.labelPresence' },
      { value: HAS_NO_VALUE, nameId: 'widget.form.filterable.labelAbsence' },
      (
        filterableType === TEXT_FILTERABLE ? (
          { value: BY_VALUE_PARTIAL, nameId: 'widget.form.filterable.labelPartial' }
        ) : (
          { value: BY_VALUE_ONLY, nameId: 'widget.form.filterable.labelOnly' }
        )
      ),
      { value: BY_RANGE, nameId: 'widget.form.filterable.labelRange' },
    ];

    return (
      <Fragment>
        <h5><FormattedMessage id="widget.form.options" /></h5>
        <select
          value={optionSelected}
          className="form-control"
          onChange={this.handleValueTypeChange}
        >
          {this.renderSelectOptions(filterChoices)}
        </select>
        {optionSelected === BY_VALUE_ONLY && (
          this.renderValueOnlyFields()
        )}
        {optionSelected === BY_VALUE_PARTIAL && (
          <div className="FilterValueOptionSelector__top-options">
            <TextInput
              input={{
                name: `${filter}.value`,
                value,
                onChange: ({ currentTarget: { value: v } }) => (
                  this.handleValueChange({ value: v })
                ),
              }}
              labelSize={3}
              label={<FormLabel labelId="widget.form.filterable.whichcontains" />}
            />
            <SwitchRenderer
              input={{
                name: `${filter}.likeOption`,
                value: likeOption || false,
                onChange: like => this.handleValueChange({ likeOption: like || undefined }),
              }}
              label={<FormLabel labelId="widget.form.filterable.valuePartialLabel" />}
              labelSize={3}
              switchVals={{
                trueValue: 'true',
                falseValue: 'false',
              }}
            />
          </div>
        )}
        {optionSelected === BY_RANGE && this.renderRangeFields()}
      </Fragment>
    );
  }

  renderAttributeFilter() {
    const { filterableType } = this.state;
    if (filterableType === BOOL_FILTERABLE) {
      return this.renderBooleanFilterValueOptions();
    }
    return this.renderFilterValueOptions();
  }

  render() {
    const { expanded } = this.state;
    const { value: propValue, intl, filter } = this.props;
    const {
      order,
      attributeFilter,
      key,
    } = propValue;

    const sortFilters = [
      {
        id: '',
        label: intl.formatMessage({ id: 'app.enumerator.none' }),
      },
      {
        id: 'ASC',
        label: intl.formatMessage({ id: 'widget.form.asc' }),
      },
      {
        id: 'DESC',
        label: intl.formatMessage({ id: 'widget.form.desc' }),
      },
    ];

    if (!key) return null;

    return (
      <Fragment>
        <legend className="FilterValueOptionSelector__top">
          <div
            onClick={this.handleHeadlineClick}
            onKeyDown={this.handleHeadlineClick}
            role="button"
            tabIndex={0}
            className="FilterValueOptionSelector__top-select"
          >
            <div className="FilterValueOptionSelector__top-caption">
              {this.renderLabelValue()}
            </div>
            <span
              className={`icon fa fa-chevron-${expanded ? 'up' : 'down'} FilterValueOptionSelector__collapse-button`}
            />
          </div>
        </legend>
        <Collapse isOpened={expanded}>
          <div className="FilterValueOptionSelector__settings">
            {attributeFilter && this.renderAttributeFilter()}
            <h5><FormattedMessage id="widget.form.order" /></h5>
            <RadioInput
              input={{
                name: `${filter}.order`,
                type: 'radio',
                value: order,
                onChange: ord => this.handleValueChange({ order: ord }),
              }}
              hasLabel={false}
              toggleElement={sortFilters}
              meta={{ touched: false, error: false }}
            />
          </div>
        </Collapse>
      </Fragment>
    );
  }
}

FilterValueOptionSelector.propTypes = {
  intl: intlShape.isRequired,
  value: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
    ]),
    start: PropTypes.string,
    end: PropTypes.string,
    nullValue: PropTypes.bool,
    key: PropTypes.string,
    attributeFilter: PropTypes.bool,
    likeOption: PropTypes.bool,
    order: PropTypes.string,
    valueDateDelay: PropTypes.string,
    startDateDelay: PropTypes.string,
    endDateDelay: PropTypes.string,
  }),
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  fieldIndex: PropTypes.number.isRequired,
  attributeFilterChoices: PropTypes.arrayOf(PropTypes.shape({})),
};

FilterValueOptionSelector.defaultProps = {
  value: {},
  attributeFilterChoices: [],
};

export default FilterValueOptionSelector;
