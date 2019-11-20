import React, { Component } from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { FormattedMessage, intlShape } from 'react-intl';
import { Button, ButtonGroup } from 'patternfly-react';

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
      fields, filterName,
      options, suboptions, onResetFilterOption,
    } = this.props;

    const handleAddNewFilter = () => fields.push();

    const renderFilters = fields.map((filter, i) => {
      const filterField = fields.get(i) || {};
      const { code } = filterField;
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
          <td>
            <Field
              name={`${filter}.code`}
              component="select"
              className="form-control"
              onChange={() => onResetFilterOption(filterName, i)}
            >
              {this.filterOptions(options)}
            </Field>
          </td>
          <td>
            {
              code && suboptions[code].length > 0 &&
              <Field
                name={`${filter}.option`}
                component="select"
                className="form-control"
              >
                {this.filterOptions(suboptions[code])}
              </Field>
            }
          </td>
          <td className="text-center">
            <ButtonGroup bsSize="small">
              {
                i !== 0 &&
                <Button onClick={() => fields.swap(i, i - 1)}>
                  <span className="icon fa fa-sort-asc" />
                </Button>
              }
              {
                i !== fields.length - 1 &&
                <Button onClick={() => fields.swap(i, i + 1)}>
                  <span className="icon fa fa-sort-desc" />
                </Button>
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
                <FormattedMessage id="widget.form.options" />
              </th>
              <th
                width="5%"
              >
                <FormattedMessage id="widget.form.reoder" />
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
  fields: PropTypes.shape({}).isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  suboptions: PropTypes.shape({}),
  onResetFilterOption: PropTypes.func.isRequired,
  filterName: PropTypes.string.isRequired,
};

FiltersSelectRenderer.defaultProps = {
  suboptions: {},
};

export default FiltersSelectRenderer;
