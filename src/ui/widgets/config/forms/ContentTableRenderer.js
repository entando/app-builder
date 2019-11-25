import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { Button, ButtonGroup } from 'patternfly-react';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import ContentPickerContainer from 'ui/widgets/config/forms/ContentPickerContainer';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';

const ContentTableRenderer = ({ fields, contentModels }) => {
  const handlePickContent = content =>
    fields.push({ ...content, contentId: content.id, modelId: null });

  const renderContentRows = fields.map((field, i) => {
    const content = fields.get(i);
    const contentTypeCode = content.typeCode || content.contentId.substr(0, 3);
    const filterByCode = contentModel =>
      contentModel.contentType === contentTypeCode;
    const contentModelsByContentType = contentModels.filter(filterByCode);
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
          {content.contentId} - {content.description}
          <Field
            name={`${field}.contentId`}
            component={RenderTextInput}
            type="hidden"
            className="form-control"
          />
        </td>
        <td>
          <Field
            component={RenderSelectInput}
            name={`${field}.modelId`}
            options={contentModelsByContentType}
            optionValue="id"
            optionDisplayName="descr"
          />
        </td>
        <td className="text-center">
          <ButtonGroup bsSize="small">
            {i !== 0 && (
              <Button onClick={() => fields.swap(i, i - 1)}>
                <span className="icon fa fa-sort-asc" />
              </Button>
            )}
            {i !== fields.length - 1 && (
              <Button onClick={() => fields.swap(i, i + 1)}>
                <span className="icon fa fa-sort-desc" />
              </Button>
            )}
          </ButtonGroup>
        </td>
      </tr>
    );
  });

  return (
    <div className="FiltersSelectRenderer">
      <ContentPickerContainer
        form="contentPicker"
        onPickContent={handlePickContent}
      />
      <Table bordered>
        <thead>
          <tr>
            <th width="5%">
              <FormattedMessage id="widget.form.remove" />
            </th>
            <th width="25%">
              <FormattedMessage id="widget.form.content" />
            </th>
            <th width="25%">
              <FormattedMessage id="widget.form.contentModel" />
            </th>
            <th width="5%">
              <FormattedMessage id="widget.form.reorder" />
            </th>
          </tr>
        </thead>
        <tbody>{renderContentRows}</tbody>
      </Table>
    </div>
  );
};

ContentTableRenderer.propTypes = {
  fields: PropTypes.shape({}).isRequired,
  contentModels: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default ContentTableRenderer;
