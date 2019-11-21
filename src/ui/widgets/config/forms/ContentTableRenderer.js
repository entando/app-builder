import React, { Component } from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { FormattedMessage, intlShape } from 'react-intl';
import { Button, ButtonGroup } from 'patternfly-react';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import ContentPickerContainer from 'ui/widgets/config/forms/ContentPickerContainer';

class ContentTableRenderer extends Component {
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
      fields,
    } = this.props;

    const handleAddNewContent = content => fields.push({ ...content, contentModelId: null });

    const renderContentRows = fields.map((field, i) => (
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
          {fields.get(i).id} - {fields.get(i).description}
          <Field
            name={`${field}.id`}
            component={RenderTextInput}
            type="hidden"
            className="form-control"
          />
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
    ));

    return (
      <div className="FiltersSelectRenderer">
        <ContentPickerContainer
          form="contentPicker"
          onPickContent={handleAddNewContent}
        />
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
                <FormattedMessage id="widget.form.content" />
              </th>
              <th
                width="5%"
              >
                <FormattedMessage id="widget.form.reoder" />
              </th>
            </tr>
          </thead>
          <tbody>
            {renderContentRows}
          </tbody>
        </Table>
      </div>
    );
  }
}

ContentTableRenderer.propTypes = {
  intl: intlShape.isRequired,
  fields: PropTypes.shape({}).isRequired,
};

export default ContentTableRenderer;
