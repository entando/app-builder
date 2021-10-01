import React, { Component } from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { FormattedMessage, intlShape } from 'react-intl';
import { Button, ButtonGroup } from 'patternfly-react';

import FilterValueOptionSelector from 'ui/common/form/FilterValueOptionSelector';

class FiltersSelectRenderer extends Component {
  filterOptions(options) {
    const { intl } = this.props;
    return options
      .map(item => (
        <option key={`opt-${item.code}`} value={item.code}>
          {item.name || intl.formatMessage({ id: item.nameId })}
        </option>
      ));
  }

  render() {
    const {
      fields, filterName, attributeFilterChoices,
      options, suboptions, intl,
      onChangeFilterValue, onChangeFilterAttribute,
      onResetFilterOption,
    } = this.props;

    const handleAddNewFilter = () => fields.push();

    const handleFilterAttributeChange = (value, index) => {
      onResetFilterOption(filterName, index);
      const attributeFilter = attributeFilterChoices.findIndex(({ code }) => code === value) > -1;
      onChangeFilterAttribute(fields.name, index, attributeFilter);
    };

    const handleFilterChange = (value, index) => (
      onChangeFilterValue(fields.name, index, value)
    );

    const renderFilters = fields.map((filter, i) => {
      const filterField = fields.get(i) || {};
      const { key } = filterField;
      return (
        // eslint-disable-next-line react/no-array-index-key
        <tr key={i}>
          <td className="text-center" style={{ verticalAlign: 'middle' }}>
            <div
              onClick={() => fields.remove(i)}
              onKeyDown={() => fields.remove(i)}
              tabIndex={0}
              role="button"
            >
              <span className="pficon pficon-delete" />
            </div>
          </td>
          <td style={{ verticalAlign: 'middle' }}>
            <Field
              name={`${filter}.key`}
              component="select"
              className="form-control"
              onChange={({ currentTarget }) => handleFilterAttributeChange(currentTarget.value, i)}
            >
              {this.filterOptions(options)}
            </Field>
          </td>
          <td>
            {filterName === 'filters' && (
              <FilterValueOptionSelector
                value={filterField}
                intl={intl}
                filter={filter}
                filterName={filterName}
                fieldIndex={i}
                attributeFilterChoices={attributeFilterChoices}
                onChange={handleFilterChange}
              />
            )}
            {filterName !== 'filters' && key
              && suboptions[key] && suboptions[key].length > 0 && (
                <Field
                  name={`${filter}.categoryCode`}
                  component="select"
                  className="form-control"
                >
                  {this.filterOptions(suboptions[key])}
                </Field>
            )}
          </td>
          <td className="text-center">
            <ButtonGroup bsSize="small">
              {
                i !== 0
                && (
                <Button onClick={() => fields.swap(i, i - 1)}>
                  <span className="icon fa fa-sort-asc" />
                </Button>
                )
              }
              {
                i !== fields.length - 1
                && (
                <Button onClick={() => fields.swap(i, i + 1)}>
                  <span className="icon fa fa-sort-desc" />
                </Button>
                )
              }
            </ButtonGroup>
          </td>
        </tr>
      );
    });

    return (
      <div className="FiltersSelectRenderer">
        <Table bordered>
          <thead>
            <tr>
              <th
                width="5%"
              >
                <FormattedMessage id="widget.form.remove" />
              </th>
              <th
                width="25%"
              >
                <FormattedMessage id="widget.form.filters" />
              </th>
              <th
                width="25%"
              >
                <FormattedMessage
                  id={`widget.form.${filterName === 'filters' ? 'settings' : 'options'}`}
                />
              </th>
              <th
                width="5%"
              >
                <FormattedMessage id="widget.form.reorder" />
              </th>
            </tr>
          </thead>
          <tbody>
            {renderFilters}
          </tbody>
        </Table>
        <div className="FiltersSelectRenderer__add-wrapper">
          <Button
            className="FiltersSelectRenderer__add"
            onClick={handleAddNewFilter}
          ><FormattedMessage id="app.add" />
          </Button>
        </div>
        <br />
      </div>
    );
  }
}


FiltersSelectRenderer.propTypes = {
  intl: intlShape.isRequired,
  fields: PropTypes.shape({
    name: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    push: PropTypes.func,
    map: PropTypes.func,
    get: PropTypes.func,
    remove: PropTypes.func,
    length: PropTypes.number,
    swap: PropTypes.func,
  }).isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  suboptions: PropTypes.shape({}),
  onChangeFilterAttribute: PropTypes.func.isRequired,
  onChangeFilterValue: PropTypes.func.isRequired,
  onResetFilterOption: PropTypes.func.isRequired,
  filterName: PropTypes.string.isRequired,
  attributeFilterChoices: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

FiltersSelectRenderer.defaultProps = {
  suboptions: {},
};

export default FiltersSelectRenderer;
