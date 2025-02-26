import React from 'react';
// import { setEntandoVirtualContextInCookies } from 'helpers/cookies';
import { injectIntl, intlShape } from 'react-intl';
import getRuntimeEnv from 'helpers/getRuntimeEnv';
import { getContextFromURL } from 'app-init/contextProvider';


const { ENTANDO_VIRTUAL_CONTEXTS } = getRuntimeEnv();

const ContextSelect = ({ intl }) => (
  <li className="LanguageSelect">
    <select
      className="LanguageSelect__dropdown LanguageSelect__dropdown-vmenu"
      value={getContextFromURL(window.location.pathname) || 'ROOT'}
      onChange={(e) => {
        const currentContext = getContextFromURL(window.location.pathname);
        if (currentContext === e.target.value) return;
        const selectedContext = e.target.value === 'ROOT' ? '' : e.target.value;
        // setEntandoVirtualContextInCookies(selectedContext);
        const pathFragments = window.location.pathname.split('/');
        const publicUrlIndex = pathFragments.findIndex(el => el === process.env.PUBLIC_URL.replace('/', ''));
        pathFragments[publicUrlIndex + 1] = selectedContext;
        window.location.pathname = pathFragments.filter(el => el !== '').join('/');
      }}
    >
      {
      ENTANDO_VIRTUAL_CONTEXTS.split(',').map(ctx => (
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
