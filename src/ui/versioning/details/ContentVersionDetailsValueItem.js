import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { FormattedMessage } from 'react-intl';
import { FormGroup, ListView, ListViewItem } from 'patternfly-react';

import { getURLAbsolute } from 'state/assets/selectors';

let renderAttributeTypes = () => {};

const renderAttachAttributeValue = (
  attribute,
  defLangCode,
  currentLangCode,
  domain,
  showLabel = true,
) => {
  const { code, values } = attribute;
  const useDefault = values[currentLangCode] == null;
  const target = values[currentLangCode] || values[defLangCode];
  const { name, path, size } = target;
  return (
    <FormGroup>
      {showLabel && <label>{code}</label>}
      <div>
        <a
          title={`Download: ${name}`}
          href={getURLAbsolute(domain, path)}
          className={`btn btn-default ${useDefault && 'disabled'}`}
        ><span
          className="icon fa fa-download"
        /><span className="sr-only">Download</span>
        </a>
        <span
          className={`${useDefault && 'text-muted'}`}
        > {name}
        </span> <code className={`${useDefault && 'text-muted'}`}>{size}</code>
      </div>
    </FormGroup>
  );
};

const renderImageAttributeValue = (
  attribute,
  defLangCode,
  currentLangCode,
  domain,
  showLabel = true.valueOf,
) => {
  const { code, values } = attribute;
  const target = values[currentLangCode] || values[defLangCode];
  const { name, versions } = target;
  return (
    <FormGroup>
      {showLabel && <label>{code}</label>}
      <div>
        <img
          alt={name}
          src={getURLAbsolute(domain, versions[1].path)}
          className="img-thumbnail"
        />
        <span> {name}</span>
      </div>
    </FormGroup>
  );
};

const renderCompositeAttributeValue = (attribute, defaultLangCode, currentLangCode, domain) => {
  const { code, compositeelements } = attribute;
  const renderedCompositeValues = compositeelements.map(attr => (
    <ListViewItem
      key={`${code}-id-${attr.code}`}
      compoundExpand={false}
      compoundExpanded={false}
      description={(
        <FormGroup>
          <span className="label label-default" style={{ marginBottom: '10px', display: 'inline-block' }}>
            {attr.code}
          </span>
          <div>
            {renderAttributeTypes(attr, defaultLangCode, currentLangCode, domain, false)}
          </div>
        </FormGroup>
    )}
      hideCloseIcon={false}
      stacked={false}
    />
  ));
  return (
    <FormGroup>
      <label>{code}</label>
      <ListView>
        {renderedCompositeValues}
      </ListView>
    </FormGroup>
  );
};

const renderPlainAttributeValue = (
  attribute,
  defaultLangCode,
  currentLangCode,
  showLabel = true,
) => {
  const { code, value } = attribute;
  let displayValue = value;
  if (typeof value === 'boolean') {
    displayValue = value ? <FormattedMessage id="cms.label.yes" defaultMessage="Yes" />
      : <FormattedMessage id="cms.label.no" defaultMessage="No" />;
  }
  const target = defaultLangCode === currentLangCode ? displayValue : (
    <FormattedMessage
      id="cms.versioning.attributes.showDefault"
      defaultMessage="The right value is the one defined for the default language."
    />
  );
  return (
    <FormGroup>
      {showLabel && <label>{code}</label>}
      <div>
        {target}
      </div>
    </FormGroup>
  );
};

const renderTextAttributeValue = (attribute, defLangCode, currentLangCode, showLabel = true) => {
  const { code, values } = attribute;
  const dataExists = values[currentLangCode] != null;
  const target = values[currentLangCode];
  return (
    <FormGroup>
      {showLabel && <label>{code}</label>}
      <div>
        {dataExists && target}
      </div>
    </FormGroup>
  );
};


const renderLinkAttributeValue = (attribute, defLangCode, currentLangCode, showLabel = true) => {
  const { code, values, value: { pageDest, urlDest, contentDest } } = attribute;
  const useDefaultText = values[currentLangCode] == null;
  const target = values[currentLangCode] || values[defLangCode];
  let icon = 'globe';
  let linkToText = 'an URL';
  let url = urlDest;
  if (pageDest != null) {
    icon = 'folder';
    linkToText = 'a page';
    url = pageDest;
  } else if (contentDest != null) {
    icon = 'file-text-o';
    linkToText = 'a content';
    url = contentDest;
  }
  return (
    <FormGroup>
      {showLabel && <label>{code}</label>}
      <div>
        <span
          className={`btn btn-default icon fa fa-${icon}`}
          title={`Link to ${linkToText}: ${url}`}
        >
          <span className="sr-only">Link to {linkToText}: {url}</span>
        </span>
        <span className={`${useDefaultText ? 'text-muted' : ''}`}> {target}</span>
      </div>
    </FormGroup>
  );
};

const renderListAttributeValue = (attribute, defaultLangCode, currentLangCode, domain) => {
  const { code, listelements } = attribute;
  const dataExists = listelements[currentLangCode] != null;
  const target = listelements[currentLangCode] || [];
  const renderedCompositeValues = target.map((attr, i) => (
    <FormGroup key={`${code}-${attr.code}-id-${uuidv4()}`} style={{ marginLeft: '10px' }}>
      <span className="label label-default" style={{ marginBottom: '10px', display: 'inline-block' }}>
        {i + 1}
      </span>
      <span>
        {renderAttributeTypes(attr, defaultLangCode, currentLangCode, domain, false)}
      </span>
    </FormGroup>
  ));
  const renderTarget = dataExists ? (
    <div>
      {renderedCompositeValues}
    </div>
  ) : (
    <FormattedMessage
      id="cms.versioning.attributed.emptyList"
      defaultMessage="Empty List"
    />
  );
  return (
    <FormGroup>
      <label>{code}</label>
      <div>
        {renderTarget}
      </div>
    </FormGroup>
  );
};

const renderMonolistAttributeValue = (attribute, defaultLangCode, currentLangCode, domain) => {
  const { code, elements } = attribute;
  const renderedCompositeValues = elements.map((attr, i) => (
    <FormGroup key={`${code}-${attr.code}-id-${uuidv4()}`} style={{ marginLeft: '10px' }}>
      <span className="label label-default" style={{ marginBottom: '10px', display: 'inline-block' }}>
        {i + 1}
      </span>
      <span>
        {renderAttributeTypes(attr, defaultLangCode, currentLangCode, domain, false)}
      </span>
    </FormGroup>
  ));
  return (
    <FormGroup>
      <label>{code}</label>
      <div>
        {renderedCompositeValues}
      </div>
    </FormGroup>
  );
};

const renderEmptyAttributeValue = (attibute, showLabel) => (
  <FormGroup>
    {showLabel && <label>{attibute.code}</label>}
  </FormGroup>
);

renderAttributeTypes = (attribute, defaultLangCode, currentLangCode, domain, showLabel) => {
  const {
    value, values, compositeelements, listelements, elements,
  } = attribute;
  const defLangValueExists = values && values[defaultLangCode];
  const defLangListExists = listelements && listelements[defaultLangCode];
  if (defLangValueExists && values[defaultLangCode].type === 'file') {
    return renderAttachAttributeValue(
      attribute,
      defaultLangCode,
      currentLangCode,
      domain,
      showLabel,
    );
  }
  if (compositeelements && compositeelements.length > 0) {
    return renderCompositeAttributeValue(
      attribute,
      defaultLangCode,
      currentLangCode,
      domain,
    );
  }
  /* Check if type is link */
  if (value && (value.urlDest || value.pageDest || value.contentDest)) {
    return renderLinkAttributeValue(
      attribute,
      defaultLangCode,
      currentLangCode,
      showLabel,
    );
  }
  /* Check if type is either hypertext or longtext or text */
  if (defLangValueExists && typeof values[defaultLangCode] === 'string') {
    return renderTextAttributeValue(
      attribute,
      defaultLangCode,
      currentLangCode,
      showLabel,
    );
  }
  /* Check if type is image */
  if (defLangValueExists && values[defaultLangCode].type === 'image') {
    return renderImageAttributeValue(
      attribute,
      defaultLangCode,
      currentLangCode,
      domain,
      showLabel,
    );
  }
  /* Check if type is list */
  if (defLangListExists) {
    return renderListAttributeValue(
      attribute,
      defaultLangCode,
      currentLangCode,
      domain,
    );
  }
  /* Check if type monolist */
  if (elements && elements.length > 0) {
    return renderMonolistAttributeValue(
      attribute,
      defaultLangCode,
      currentLangCode,
      domain,
    );
  }
  /* Check if attribute has every value empty */
  if (compositeelements.length === 0
    && listelements.length === 0 && elements.length === 0
    && value === null && values === {}) {
    return renderEmptyAttributeValue(attribute, showLabel);
  }
  /* Check if type is boolean, date, enumerator, enummap, monotext, number, threestate, timestamp */
  return renderPlainAttributeValue(attribute, defaultLangCode, currentLangCode, showLabel);
};

const ContentVersionDetailsValueItem = ({
  attribute, defaultLangCode, domain, currentLangCode,
}) => {
  const renderedAttributeValues = renderAttributeTypes(
    attribute,
    defaultLangCode,
    currentLangCode,
    domain,
  );
  return (
    <div>{renderedAttributeValues}</div>
  );
};

ContentVersionDetailsValueItem.propTypes = {
  attribute: PropTypes.shape({}).isRequired,
  defaultLangCode: PropTypes.string.isRequired,
  currentLangCode: PropTypes.string.isRequired,
  domain: PropTypes.string.isRequired,
};

export default ContentVersionDetailsValueItem;
