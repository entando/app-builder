import React from 'react';
import { setEntandoVirtualContextInCookies, getEntandoVirtualContextFromCookies } from 'helpers/cookies';
import { injectIntl, intlShape } from 'react-intl';

const ContextSelect = ({ intl }) => (
  <li className="LanguageSelect">
    <select
      className="LanguageSelect__dropdown LanguageSelect__dropdown-vmenu"
      value={getEntandoVirtualContextFromCookies() || 'ROOT'}
      onChange={(e) => {
        const currentContext = getEntandoVirtualContextFromCookies();
        if (currentContext === e.target.value) return;
        const selectedContext = e.target.value === 'ROOT' ? '' : e.target.value;
        setEntandoVirtualContextInCookies(selectedContext);
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
