import { createSelector } from 'reselect';
import { getListWidget } from 'state/widgets/selectors';


const transform = widgetList =>
  widgetList.reduce((acc, widget) => {
    if (acc[widget.root]) {
      acc[widget.root].push(widget);
    } else {
      acc[widget.root] = [widget];
    }
    return acc;
  }, {});

const MOCK_WIDGET_LIST = [
  {
    root: 'User Widget',
    code: 'WTF',
    name: 'My first  Widget',
    used: 0,
    titles: {
      it: 'Mio Widget',
      en: 'My Widget',
    },
  },
  {
    root: 'User Widget',
    code: 'WTF1',
    name: 'My second  Widget',
    used: 0,
    titles: {
      it: 'Mio Widget',
      en: 'My Widget',
    },
  },
  {
    root: 'Custom Widget',
    code: 'WTF3',
    name: 'My third  Widget',
    used: 0,
    titles: {
      it: 'Mio Widget',
      en: 'My Widget',
    },
  },
];


export const getWidgetList = createSelector(
  [getListWidget],
  () => transform(MOCK_WIDGET_LIST),
);

export default getWidgetList;
