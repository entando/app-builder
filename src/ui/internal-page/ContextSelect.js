import React from 'react';
import { ENTANDO_VIRTUAL_CONTEXT_KEY, getCookie, setCookie } from 'helpers/cookies';
import { injectIntl, intlShape } from 'react-intl';

const ContextSelect = ({ intl }) => (
  <li className="LanguageSelect">
    <select
      className="LanguageSelect__dropdown LanguageSelect__dropdown-vmenu"
      value={getCookie(ENTANDO_VIRTUAL_CONTEXT_KEY) || 'ROOT'}
      onChange={(e) => {
        const currentContext = getCookie(ENTANDO_VIRTUAL_CONTEXT_KEY);
        if (currentContext === e.target.value) return;
        const selectedContext = e.target.value === 'ROOT' ? '' : e.target.value;
        setCookie(ENTANDO_VIRTUAL_CONTEXT_KEY, selectedContext);
        window.location.pathname = window.location.pathname.replace(`/${currentContext}`, selectedContext === '' ? '' : `/${selectedContext}/`);
      }}
    >
      {
      process.env.ENTANDO_VIRTUAL_CONTEXTS.split(',').map(ctx => (
        ctx === 'ROOT' ?
          <option value={ctx} key={ctx} className="LanguageSelect__option">
            {intl.formatMessage({ id: 'contextSelect.ROOT' })}
          </option>
          : <option value={ctx} key={ctx} className="LanguageSelect__option">{ctx}</option>
      ))
    }
    </select>
    <span className="LanguageSelect__icon caret" />
  </li>
);

ContextSelect.propTypes = {
  intl: intlShape.isRequired,
};


export default injectIntl(ContextSelect);
