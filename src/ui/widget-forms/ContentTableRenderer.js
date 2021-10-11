import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { FormattedMessage, intlShape } from 'react-intl';
import { Button, ButtonGroup } from 'patternfly-react';
import ContentsFilterBrowserContainer from 'ui/widget-forms/contents-filter/ContentsFilterBrowserContainer';

const ContentTableRenderer = ({
  fields, contentTemplates, intl, multipleContentsMode, ownerGroup, joinGroups,
}) => {
  const handlePickContent = content => fields.push({
    ...content, contentId: content.id, modelId: null, contentDescription: content.description,
  });

  const contentRowIds = fields.map((field, i) => {
    const content = fields.get(i);
    return content.id;
  });

  const renderContentRows = fields.map((field, i) => {
    const content = fields.get(i);
    const contentTypeCode = content.typeCode || content.contentId.substr(0, 3);
    const filterByCode = contentTemplate => contentTemplate.contentType === contentTypeCode;
    const contentTemplatesByContentType = [{ id: 'default', descr: intl.formatMessage({ id: 'widget.form.default' }) },
      ...contentTemplates.filter(filterByCode)];
    const contentTemplateOptions = contentTemplatesByContentType
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
          {content.contentId} - {content.contentDescription}
          <Field
            name={`${field}.contentId`}
            component="span"
          />
          <Field
            name={`${field}.contentDescription`}
            component="span"
          />
        </td>
        <td>
          <Field
            component="select"
            name={`${field}.modelId`}
            className="form-control"
          >
            {contentTemplateOptions}
          </Field>
        </td>
        {
          multipleContentsMode && (
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
          )
        }
      </tr>
    );
  });
  return (
    <div className="FiltersSelectRenderer well">
      {multipleContentsMode && (
      <ContentsFilterBrowserContainer
        pickedContents={contentRowIds}
        onContentPicked={handlePickContent}
        compatibility={{
          joinGroups, ownerGroup,
        }}
        fetchOnMount={false}
      />
      )}
      <Table bordered striped className="FiltersSelectRenderer__content-table-selected">
        <thead>
          <tr>
            <th width="5%">
              <FormattedMessage id="widget.form.remove" />
            </th>
            <th width="25%">
              <FormattedMessage id="widget.form.content" />
            </th>
            <th width="25%">
              <FormattedMessage id="widget.form.contentTemplate" />
            </th>
            {
              multipleContentsMode && (
              <th width="5%">
                <FormattedMessage id="widget.form.reorder" />
              </th>
              )
            }
          </tr>
        </thead>
        <tbody>{renderContentRows}</tbody>
      </Table>
    </div>
  );
};

ContentTableRenderer.propTypes = {
  intl: intlShape.isRequired,
  fields: PropTypes.shape({
    push: PropTypes.func,
    get: PropTypes.func,
    remove: PropTypes.func,
    swap: PropTypes.func,
    map: PropTypes.func,
    length: PropTypes.number,
  }).isRequired,
  multipleContentsMode: PropTypes.bool,
  contentTemplates: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  ownerGroup: PropTypes.string.isRequired,
  joinGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
};

ContentTableRenderer.defaultProps = {
  multipleContentsMode: true,
};

export default ContentTableRenderer;
