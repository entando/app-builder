import Cookies from 'js-cookie';

const setCookie = (cookieName, cookieValue) => {
  Cookies.set(cookieName, cookieValue, { path: '/' });
};


const getCookie = cookieName => Cookies.get(cookieName);

const deleteCookie = (cookieName) => {
  Cookies.remove(cookieName);
};
const ENTANDO_VIRTUAL_CONTEXT_KEY = 'entando_virtual_context';

const getEntandoVirtualContextFromCookies = () => getCookie(ENTANDO_VIRTUAL_CONTEXT_KEY);

export {
  setCookie, getCookie, getEntandoVirtualContextFromCookies,
  deleteCookie, ENTANDO_VIRTUAL_CONTEXT_KEY,
};
