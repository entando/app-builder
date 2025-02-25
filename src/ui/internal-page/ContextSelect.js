import React from 'react';
import { ENTANDO_VIRTUAL_CONTEXT_KEY, getCookie, setCookie } from 'helpers/cookies';

const ContextSelect = () => (
  <li className="LanguageSelect">
    <select
      className="LanguageSelect__dropdown LanguageSelect__dropdown-vmenu"
      value={getCookie(ENTANDO_VIRTUAL_CONTEXT_KEY) || '.root'}
      onChange={(e) => {
        const currentContext = getCookie(ENTANDO_VIRTUAL_CONTEXT_KEY);
        if (currentContext === e.target.value) return;
        const selectedContext = e.target.value === '.root' ? '' : e.target.value;
        setCookie(ENTANDO_VIRTUAL_CONTEXT_KEY, selectedContext);
        window.location.pathname = window.location.pathname.replace(`/${currentContext}`, selectedContext === '' ? '' : `/${selectedContext}/`);
      }}
    >
      {
      process.env.ENTANDO_VIRTUAL_CONTEXTS.split(',').map(ctx => (
        <option value={ctx} key={ctx} className="LanguageSelect__option">
          {ctx}
        </option>
      ))
    }
    </select>
    <span className="LanguageSelect__icon caret" />
  </li>
);


export default ContextSelect;
