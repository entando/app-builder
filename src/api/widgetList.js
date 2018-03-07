import { WIDGET_LIST } from 'test/mocks/widgetList';

// eslint-disable-next-line
export const getApiWidgetList = () => (
  new Promise((resolve) => {
    resolve(WIDGET_LIST);
  })
);

export default getApiWidgetList;
