import React from 'react';
import { Field, getIn } from 'formik';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { FormattedMessage, intlShape } from 'react-intl';
import { Button, ButtonGroup } from 'patternfly-react';

import FilterValueOptionSelector from 'ui/common/formik-field/FilterValueOptionSelector';

const FiltersSelectRenderer = (props) => {
  const {
    filterName, attributeFilterChoices,
    options, suboptions, intl,
    onChangeFilterValue, onChangeFilterAttribute,
    onResetFilterOption, form, push, swap, remove, name,
  } = props;

  const filterOptions = opts => opts
    .map(item => (
      <option key={`opt-${item.code}`} value={item.code}>
        {item.name || intl.formatMessage({ id: item.nameId })}
      </option>
    ));

  const handleAddNewFilter = () => push({});

  const handleFilterAttributeChange = (value, index) => {
    onResetFilterOption(filterName, index, value);
    const attributeFilter = attributeFilterChoices.findIndex(({ code }) => code === value) > -1;
    onChangeFilterAttribute(name, index, attributeFilter);
  };

  const handleFilterChange = (value, index) => (
    onChangeFilterValue(name, index, value)
  );

  const renderFilters = getIn(form.values, name) && getIn(form.values, name).map((filter, i) => {
    const { key } = filter;
    return (
      // eslint-disable-next-line react/no-array-index-key
      <tr key={i}>
        <td className="text-center" style={{ verticalAlign: 'middle' }}>
          <div
            onClick={() => remove(i)}
            onKeyDown={() => remove(i)}
            tabIndex={0}
            role="button"
          >
            <span className="pficon pficon-delete" />
          </div>
        </td>
        <td style={{ verticalAlign: 'middle' }}>
          <Field
            name={`${filterName}.${i}.key`}
            as="select"
            className="form-control"
            onChange={
              ({ currentTarget }) => handleFilterAttributeChange(currentTarget.value, i)
            }
          >
            {filterOptions(options)}
          </Field>
        </td>
        <td>
          {(filterName === 'filters' || filterName === 'config.filters') && (
            <FilterValueOptionSelector
              value={filter}
              intl={intl}
              filter={`${filterName}.${i}`}
              filterName={filterName}
              fieldIndex={i}
              attributeFilterChoices={attributeFilterChoices}
              onChange={handleFilterChange}
            />
          )}
          {filterName !== 'filters' && key
            && suboptions[key] && suboptions[key].length > 0 && (
              <Field
                name={`${filterName}.${i}.categoryCode`}
                as="select"
                className="form-control"
              >
                {filterOptions(suboptions[key])}
              </Field>
          )}
        </td>
        <td className="text-center">
          <ButtonGroup bsSize="small">
            {
              i !== 0
              && (
              <Button onClick={() => swap(i, i - 1)}>
                <span className="icon fa fa-sort-asc" />
              </Button>
              )
            }
            {
              i !== getIn(form.values, name).length - 1
              && (
              <Button onClick={() => swap(i, i + 1)}>
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
};


FiltersSelectRenderer.propTypes = {
  intl: intlShape.isRequired,
  form: PropTypes.shape({
    initialValues: PropTypes.shape({}),
    values: PropTypes.shape({}),
  }).isRequired,
  push: PropTypes.func.isRequired,
  swap: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
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
