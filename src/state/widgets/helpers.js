export const groupWidgets = widgetList => widgetList.reduce((acc, widget) => {
  const groupingCriterion = widget.widgetCategory || widget.pluginDesc || widget.typology;
  if (acc[groupingCriterion]) {
    acc[groupingCriterion].push(widget);
  } else {
    acc[groupingCriterion] = [widget];
  }
  return acc;
}, {});


export const prettyPrintJson = json => (json ? JSON.stringify(json, null, 2) : '');
