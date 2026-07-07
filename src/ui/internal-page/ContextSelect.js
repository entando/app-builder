import React from 'react';

import { injectIntl, intlShape } from 'react-intl';
import getRuntimeEnv from 'helpers/getRuntimeEnv';
import { determineBestLandingUrl, getContextFromURL } from 'helpers/contextUtils';

const { AB_ENTANDO_VIRTUAL_CONTEXTS } = getRuntimeEnv();

const ContextSelect = ({ intl }) => (
  <li className="ContextSelect">
    <select
      className="ContextSelect__dropdown ContextSelect__dropdown-vmenu"
      value={getContextFromURL(window.location.pathname) || 'ROOT'}
      onChange={(e) => {
        const url = determineBestLandingUrl(
          getContextFromURL(window.location.pathname),
          e.target.value,
          false,
        );
        window.location = url;
      }}
    >
      {
        AB_ENTANDO_VIRTUAL_CONTEXTS.split(',').map(ctx => (
          ctx === 'ROOT' ?
            <option value={ctx} key={ctx} className="ContextSelect__option">
              {intl.formatMessage({ id: 'contextSelect.ROOT' })}
            </option>
            : <option value={ctx} key={ctx} className="ContextSelect__option">{ctx}</option>
        ))
      }
    </select>
    <span className="ContextSelect__dropdown ContextSelect__dropdown-vmenu select-text-override">{intl.formatMessage({ id: 'contextSelect.GOTO_CONTEXT' })}</span>
    <span className="ContextSelect__icon caret" />
  </li>
);

ContextSelect.propTypes = {
  intl: intlShape.isRequired,
};


export default injectIntl(ContextSelect);
