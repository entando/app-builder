import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { FormattedMessage, intlShape } from 'react-intl';
import { Button, ButtonGroup } from 'patternfly-react';
import ContentPickerContainer from 'ui/widgets/config/forms/ContentPickerContainer';

const ContentTableRenderer = ({
  fields, contentModels, intl, multipleContentsMode,
}) => {
  const handlePickContent = content =>
    fields.push({ ...content, contentId: content.id, modelId: null });

  const renderContentRows = fields.map((field, i) => {
    const content = fields.get(i);
    const contentTypeCode = content.typeCode || content.contentId.substr(0, 3);
    const filterByCode = contentModel =>
      contentModel.contentType === contentTypeCode;
    const contentModelsByContentType = [{ id: 'default', descr: intl.formatMessage({ id: 'widget.form.default' }) },
      ...contentModels.filter(filterByCode)];
    const contentModelOptions = contentModelsByContentType
      .map(item => (
        <option key={`opt-${item.id}`} value={item.id}>
          {item.descr}
        </option>
      ));
    return (
      // eslint-disable-next-line react/no-array-index-key
      <tr key={`${content.contentId}-${i}`}>
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
            component="span"
          />
        </td>
        <td>
          <Field
            component="select"
            name={`${field}.modelId`}
            className="form-control"
          >
            {contentModelOptions}
          </Field>
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
    <div className="FiltersSelectRenderer well">
      <ContentPickerContainer
        form="contentPicker"
        onPickContent={handlePickContent}
        multipleContentsMode={multipleContentsMode}
        contentsNumber={fields.length}
      />
      <Table bordered striped>
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
  intl: intlShape.isRequired,
  fields: PropTypes.shape({}).isRequired,
  multipleContentsMode: PropTypes.bool,
  contentModels: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

ContentTableRenderer.defaultProps = {
  multipleContentsMode: true,
};

export default ContentTableRenderer;
